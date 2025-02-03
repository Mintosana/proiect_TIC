const { db } = require('../db_config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = [];
    snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal server error');
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userDoc = await db.collection('users').doc(id).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      delete userData.password;
      // console.log(userData);
      res.status(200).json({ id: userDoc.id, ...userData });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Internal server error');
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData, "  ", "caca");
    const missingFields = [];
    if (!userData.username) missingFields.push("username");
    if (!userData.email) missingFields.push("email");
    if (!userData.phoneNumber) missingFields.push("phoneNumber");
    if (!userData.password) missingFields.push("password");

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        missingFields
      });
    }
    if (userData.username.length < 3) {
      return res.status(400).json({ error: "Username must be at least 3 characters!" });
    }
    if (userData.username.length > 20) {
      return res.status(400).json({ error: "Username must be 20 characters or shorter!" });
    }
    // https://regex101.com/library/SOgUIV
    if (!userData.email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim)) {
      return res.status(400).json({ error: "Invalid email!" });
    }
    const existingEmail = await db.collection('users').where('email', '==', userData.email).get();
    if (!existingEmail.empty) {
      return res.status(400).json({ error: "Email is already in use" });
    }
    if (userData.phoneNumber) {
      if (
        userData.phoneNumber.length !== 10) {
        return res.status(400).json({ error: "Phone number must have exactly 10 characters (07...)" });
      } else if (!userData.phoneNumber.match(/^[0-9+()]+$/)) {
        return res.status(400).json({ error: "Phone number should contain only digits!" });
      }
    }
    // if (userData.password.length < 8) {
    //   return res.status(400).json({ error: "Password must be atleast 8 characters" });
    // }

    userData.isAdmin = 0;
    userData.createdAt = new Date().toISOString();
    userData.password = await bcrypt.hash(userData.password, 10);
    console.log(userData);

    const newUserRef = await db.collection('users').add(userData);
    res.status(201).json({ id: newUserRef.id, ...userData });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal server error');
  }
};

const loginUser = async (req, res) => {
  try {
    const user = req.body;
    if (!user.email || !user.password) {
      return res.status(401).send('No data has been sent, please fill in the login form');
    }
    const userSnap = await db.collection('users').where('email', '==', user.email).get();
    // console.log(userSnap);
    if (userSnap.empty) {
      return res.status(401).send('Invalid credentials');
    }

    //console.log(userSnap.docs)

    const userData = userSnap.docs[0].data();
    const userId = userSnap.docs[0].id;
    const isAdmin = userSnap.docs[0].data().isAdmin;

    const match = await bcrypt.compare(user.password, userData.password);
    if (match) {
      const token = jwt.sign({ username: userData.username, email: userData.email, phoneNumber: userData.phoneNumber, isAdmin: userData.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
      //console.log(token);
      res.cookie('jwt-token', token, {
        httpOnly: true,
        maxAge: 3600000,
      });
      res.status(200).json({
        message: `Login successful, welcome ${userData.username}! - ${userId}`,
        userId,
        token,
        isAdmin,
      });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Internal server error');
  }
};

const logoutUser = (req, res) => {
  try {
    res.cookie('jwt-token', '', {
      httpOnly: true,
      maxAge: 0,
    });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).send('Internal server error');
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const userRef = db.collection('users').doc(id);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).send('User not found');
    }
    await userRef.update(updatedData);
    res.status(200).json({ id, ...updatedData });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal server error');
  }
};

const addBirdToFavourites = async (req, res) => {
  const { userId, birdId } = req.body;

  if (!userId || !birdId) {
    return res.status(400).json({ error: "User ID and Bird ID are required." });
  }

  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found." });
    }

    let favouriteBirds = userDoc.data().FavouriteBirds || [];

    if (favouriteBirds.includes(birdId)) {
      favouriteBirds = favouriteBirds.filter(id => id !== birdId);
      await userRef.update({ FavouriteBirds: favouriteBirds });
      return res.status(200).json({
        message: "Bird removed from favourites.",
        favouriteBirds,
      });
    } else {
      favouriteBirds.push(birdId);
      await userRef.update({ FavouriteBirds: favouriteBirds });
      return res.status(200).json({
        message: "Bird added to favourites.",
        favouriteBirds,
      });
    }
  } catch (error) {
    console.error("Error updating favourites:", error);
    res.status(500).send("Error updating favourites:", error);
  }
};

const verifyBirdIsFavourite = async (req, res) => {
  const { userId, birdId } = req.body;

  if (!userId || !birdId) {
    return res.status(400).json({ error: "User ID and Bird ID are required." });
  }

  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found." });
    }

    const favouriteBirds = userDoc.data().FavouriteBirds || [];

    const isFavourite = favouriteBirds.includes(birdId);
    res.status(200).json({ isFavourite });
  } catch (error) {
    console.error("Error verifying bird favourite status:", error);
    res.status(500).send("Error verifying bird favourite status:", error);
  }
};

const getFavouriteBirds = async (req, res) => {
  const userId = req.params.id;
  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).send({ message: "user with this id could not be found" })
    }
    const birdIdArray = userDoc.data().FavouriteBirds;
    const favouriteBirds = [];
    for (const bird of birdIdArray) {
      const birdRef = db.collection("birds").doc(bird);
      const birdDoc = await birdRef.get();

      if (birdDoc.exists) {
        favouriteBirds.push({ id: bird, ...birdDoc.data() });
      }
    }

      res.status(200).send({
        message: "Favourite bird list has been succesfully returned!",
        favouriteBirds: favouriteBirds,
      }
      )
    }catch (error) {
      res.status(500).send({ message: `Following server has occured : ${error}` })
    }
  };
  const reserveBirdForUser = async (req, res) => {
    const { userId, birdId } = req.body;

    if (!userId || !birdId) {
      return res.status(400).json({ error: "User ID and Bird ID are required." });
    }

    try {
      const userRef = db.collection('users').doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        return res.status(404).json({ error: "User not found." });
      }

      const userData = userDoc.data();
      const pendingBirds = userData.PendingBirds || [];

      if (pendingBirds.includes(birdId)) {
        return res.status(400).json({ error: "Bird is already reserved by this user." });
      }

      pendingBirds.push(birdId);
      await userRef.update({ PendingBirds: pendingBirds });

      res.status(200).json({ message: "Bird reserved successfully.", PendingBirds: pendingBirds });
    } catch (error) {
      console.error("Error reserving bird:", error);
      res.status(500).send("Internal server error");
    }
  };

  const boughtBirdForUser = async (req, res) => {
    const { userId, birdId } = req.body;

    if (!userId || !birdId) {
      return res.status(400).json({ error: "User ID and Bird ID are required." });
    }

    try {
      const userRef = db.collection("users").doc(userId);
      const birdRef = db.collection("birds").doc(birdId);

      const userDoc = await userRef.get();
      const birdDoc = await birdRef.get();

      if (!userDoc.exists) {
        return res.status(404).json({ error: "User not found." });
      }
      if (!birdDoc.exists) {
        return res.status(404).json({ error: "Bird not found." });
      }

      const userData = userDoc.data();
      const pendingBirds = userData.PendingBirds || [];
      const boughtBirds = userData.BoughtBirds || [];
      const favouriteBirds = userData.favouriteBirds || [];
      if (boughtBirds.includes(birdId)) {
        return res.status(400).json({ error: "Bird is already bought by this user." });
      }
      const updatedFavouriteBirds = favouriteBirds.filter((id) => id !== birdId); 
      const updatedPendingBirds = pendingBirds.filter((id) => id !== birdId);
      boughtBirds.push(birdId);

      await userRef.update({
        PendingBirds: updatedPendingBirds,
        BoughtBirds: boughtBirds,
        FavouriteBirds : updatedFavouriteBirds,
      });

      await birdRef.update({
        buyState: "bought",
      });

      res.status(200).json({ message: "Bird bought successfully." });

    } catch (error) {
      console.error("Error buying bird:", error);
      res.status(500).send("Internal server error");
    }
  };

  const rejectBirdForUser = async (req, res) => {
    try {
      const { userId, birdId } = req.body;
      if (!userId || !birdId) {
        return res.status(404).json({ message: "User or bird ID has not been provided" });
      }
      const userRef = db.collection('users').doc(userId);
      const birdRef = db.collection('birds').doc(birdId);

      const userDoc = await userRef.get();
      const birdDoc = await birdRef.get();
      if (!userDoc.exists || !birdDoc.exists) {
        return res.status(404).json({ message: "User or bird with such ID has not been found in the database" });
      }

      if (birdDoc.data().buyState === "pending") {
        await birdRef.update({
          buyState: "available",
          buyer: null,
        });
        console.log(userDoc.data().PendingBirds)
        newPendingBirdsList = userDoc.data().PendingBirds.filter((id) => id !== birdId)
        await userRef.update({
          PendingBirds: newPendingBirdsList,
        });
        return res.status(200).json({ message: "Bird request has been succesfully rejected" });
      }
      else {
        return res.status(400).json({ message: "Bird is not in pending state!!" });
      }


    } catch (error) {
      res.status(500).json({ message: `An error has occured: ${error}` });
    }
  }


  const checkAdminStatus = async (req, res) => {
    const { id } = req.params;
    try {
      const userRef = db.collection('users').doc(id);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        return res.status(404).send('User not found');
      }
      const isAdmin = userDoc.data().isAdmin;
      console.log(isAdmin);
      res.status(200).json(isAdmin);
    } catch (error) {
      console.error('Error for getting admin status:', error);
      res.status(500).send('Internal server error');
    }

  }

  const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const userRef = db.collection('users').doc(id);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        return res.status(404).send('User not found');
      }
      await userRef.delete();
      res.status(200).send('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Internal server error');
    }
  };

  module.exports = {
    getAllUsers,
    getUserById,
    addBirdToFavourites,
    verifyBirdIsFavourite,
    getFavouriteBirds,
    createUser,
    loginUser,
    logoutUser,
    updateUserById,
    reserveBirdForUser,
    boughtBirdForUser,
    rejectBirdForUser,
    checkAdminStatus,
    deleteUser,

  };