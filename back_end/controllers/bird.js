const { db } = require('../db_config/config');

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

module.exports = {
    getAllBirds,
    getBirdById,
    createBird,
    updateBirdById,
    deleteBirdById,
};
