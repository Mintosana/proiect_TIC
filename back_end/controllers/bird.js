const { db } = require('../db_config/config');
const { faker } = require('@faker-js/faker');

const getAllBirds = async (req, res) => {
    try {
        const snapshot = await db.collection('birds').get();
        const birds = [];
        snapshot.forEach(doc => birds.push({ id: doc.id, ...doc.data() }));
        res.status(200).json(birds);
    } catch (error) {
        console.error('Error fetching birds:', error);
        res.status(500).send('Internal server error');
    }
};

const getBirdById = async (req, res) => {
    const { id } = req.params;
    try {
        const birdDoc = await db.collection('birds').doc(id).get();
        if (birdDoc.exists) {
            res.status(200).json({ id: birdDoc.id, ...birdDoc.data() });
        } else {
            res.status(404).send('Bird not found');
        }
    } catch (error) {
        console.error('Error fetching bird:', error);
        res.status(500).send('Internal server error');
    }
};

const createBird = async (req, res) => {
    try {
        const birdData = req.body;

        const missingFields = [];
        if (!birdData.name) missingFields.push("name");
        if (!birdData.species) missingFields.push("species");
        if (!birdData.age) missingFields.push("age");
        if (!birdData.description) missingFields.push("description");
        if (!birdData.ownerId) missingFields.push("ownerId");

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: "Missing required fields",
                missingFields
            });
        }
        if (birdData.name.length < 2) {
            return res.status(400).json({ error: "Bird name must be at least 2 characters long." });
        }
        birdData.age = Number(birdData.age);
        if (isNaN(birdData.age) || birdData.age <= 0) {
            return res.status(400).json({ error: "Bird age must be a positive number." });
        }
        const ownerDoc = await db.collection('users').doc(birdData.ownerId).get();
        if (!ownerDoc.exists) {
            return res.status(400).json({ error: "Invalid ownerId. The specified user does not exist." });
        }

        birdData.status = birdData.status || "available";
        birdData.createdAt = new Date().toISOString();

        const newBirdRef = await db.collection('birds').add(birdData);
        res.status(201).json({ id: newBirdRef.id, ...birdData });
    } catch (error) {
        console.error('Error registering bird:', error);
        res.status(500).send('Internal server error');
    }
};

const updateBirdById = async (req, res) => {
    console.log("test");
    const { id } = req.params;
    const updatedData = req.body;
    try {

        if (!updatedData || Object.keys(updatedData).length === 0) {
            return res.status(400).json({ error: "No data provided for update." });
        }
        const birdRef = db.collection('birds').doc(id);
        const birdDoc = await birdRef.get();
        if (!birdDoc.exists) {
            return res.status(404).send('Bird not found');
        }
        await birdRef.update(updatedData);
        res.status(200).json({ id, ...updatedData });
    } catch (error) {
        console.error('Error updating bird:', error);
        res.status(500).send('Internal server error');
    }
};

const deleteBirdById = async (req, res) => {
    const { id } = req.params;
    try {
        const birdRef = db.collection('birds').doc(id);
        const birdDoc = await birdRef.get();
        if (!birdDoc.exists) {
            return res.status(404).send('Bird not found');
        }
        await birdRef.delete();
        res.status(200).send('Bird removed successfully');
    } catch (error) {
        console.error('Error deleting bird:', error);
        res.status(500).send('Internal server error');
    }
};

const deleteAllBirds = async (req, res) => {
    try {
        const snapshot = await db.collection('birds').get();
        if (snapshot.empty) {
            return res.status(200).send('No birds to delete.');
        }
        const batch = db.batch();
        snapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        res.status(200).send('All birds have been removed successfully!');
    } catch (error) {
        console.error('Error deleting all birds:', error);
        res.status(500).send('Internal server error');
    }
};

const generateDummyBirds = async (req, res) => {

    try {
        const birds = [];
        const birdImages = [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Cockatielmale.jpg/300px-Cockatielmale.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Cacatua_galerita_Tas_2.jpg/300px-Cacatua_galerita_Tas_2.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Trinidad_and_Tobago_hummingbirds_composite.jpg/300px-Trinidad_and_Tobago_hummingbirds_composite.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Geotrygon_montana_-_Ruddy_Quail-Dove%2C_Trememb%C3%A9%2C_S%C3%A3o_Paulo%2C_Brazil.jpg/300px-Geotrygon_montana_-_Ruddy_Quail-Dove%2C_Trememb%C3%A9%2C_S%C3%A3o_Paulo%2C_Brazil.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Corvus_corone_-near_Canford_Cliffs%2C_Poole%2C_England-8.jpg/300px-Corvus_corone_-near_Canford_Cliffs%2C_Poole%2C_England-8.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Male_and_female_chicken_sitting_together.jpg/300px-Male_and_female_chicken_sitting_together.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Poecile_hudsonicus_7.jpg/300px-Poecile_hudsonicus_7.jpg',
          ];
        for (let i = 0; i < 8; i++) {
            birds.push({
                name: faker.person.firstName(),
                photo: faker.helpers.arrayElement(birdImages),
                species: faker.animal.bird(),
                age: faker.number.int({ min: 1, max: 10 }),
                price: faker.commerce.price(20, 500, 0),
                description: faker.commerce.productDescription(),
            });
        }
        // console.log(birds)
        for(let i=0; i<birds.length;i++){
            await db.collection("birds").add(birds[i]);
        }
        
        res.status(201).send("Birds have flown into our center!")
    }
    catch(err) {
        res.status(500).send(`Server error occured : ${err}`)
    }

    
}



module.exports = {
    getAllBirds,
    getBirdById,
    createBird,
    updateBirdById,
    deleteBirdById,
    deleteAllBirds,
    generateDummyBirds,

};
