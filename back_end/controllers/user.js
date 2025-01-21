const { db } = require('../db_config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

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
      res.status(200).json({ id: userDoc.id, ...userDoc.data() });
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

    userData.password = await bcrypt.hash(userData.password,10);
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

    const user = {
      username:req.body.username,
      password:req.body.password,
    }

    const userSnap = await db.collection('users').where('username', '==', user.username).get();
    // console.log(userSnap);
    if (userSnap.empty) {
      return res.status(401).send('Invalid credentials');
    }

    //console.log(userSnap.docs)

    const userData = userSnap.docs[0].data();
    const userId = userSnap.docs[0].id;

    const match = await bcrypt.compare(user.password,userData.password);
    if (match) {
      const token = jwt.sign({ userId: userId, username: userData.username },process.env.JWT_SECRET,{ expiresIn: '1h' });
      //console.log(token);
      res.cookie('jwt-token', token, {
        httpOnly: true,
        maxAge: 3600000,
      });
      res.status(200).json({ message: `Login successful, welcome ${userData.username}! - ${userId}`});
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Internal server error');
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const userRef = db.collection('users').doc(id);

    console.log('aaaaaaaaaaaaa')
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
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};