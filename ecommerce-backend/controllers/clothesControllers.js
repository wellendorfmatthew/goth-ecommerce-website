const Clothes = require('../models/Clothes');
const mongoose = require('mongoose');

const createClothes = async (req, res) => {
    const { image, name, price, description, stock, clothing_type } = req.body; // Get the properties from the request body

    try { // Attempt to add the new clothes to the database otherwise display an error message
        const addClothes = await Clothes.create({ image, name, price, description, stock, clothing_type });
        res.status(200).json(addClothes);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const deleteClothes = async (req, res) => {
    const { id } = req.params; // Get the id from the the url

    if (!mongoose.Types.ObjectId.isValid(id)) { // Check if id is valid
        return res.status(404).json({error: 'Post does not exist'});
    }
    const clothes = await Clothes.findByIdAndDelete(id); // If id is valid find the clothing item in the database then delete it

    if (!clothes) {
        return res.status(404).json({error: 'Post does not exist'});
    }

    res.status(200).json(clothes);
}

const updateClothes = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) { // Check if id is valid
        return res.status(404).json({error: 'Post does not exist'});
    }
    const clothes = await Clothes.findByIdAndUpdate(id, {...req.body}); // If id is valid look for the clothing item in the database then update it's properties

    if (!clothes) {
        return res.status(404).json({error: 'Post does not exist'});
    }

    res.status(200).json(clothes);
}

const getClothes = async (req, res) => {
    const clothes = await Clothes.find({}).sort({createdAt: -1}); // Search for clothes sorted by oldest to newest
    res.status(200).json(clothes);
}

const getClothingItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) { // Check if id is valid
        return res.status(404).json({error: 'Post does not exist'});
    }
    const clothes = await Clothes.findById(id); // Retrieve clothing item that matches the id

    if (!clothes) {
        return res.status(404).json({error: 'Post does not exist'});
    }

    res.status(200).json(clothes);
}

const getTops = async (req, res) => {
    const { tops } = req.query.clothing_type;

    try {
        const Tops = await Clothes.find({clothing_type: "tops"});
        res.status(200).json(Tops);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

const getBottoms = async (req, res) => {
    const { bottoms } = req.query.clothing_type;

    try {
        const Tops = await Clothes.find({clothing_type: "bottoms"});
        res.status(200).json(Tops);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

const getAccessories = async (req, res) => {
    const { accessories } = req.query.clothing_type;

    try {
        const Tops = await Clothes.find({clothing_type: "accessories"});
        res.status(200).json(Tops);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

module.exports = {
    createClothes,
    deleteClothes,
    updateClothes,
    getClothes,
    getClothingItem,
    getTops,
    getBottoms,
    getAccessories
}