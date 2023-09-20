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

const getFilterStock = async (req, res) => {
    const { inStock, outOfStock } = req.query;

    try {
        let filter = {};

        if (inStock === 'true' && outOfStock === 'true') {
            filter.stock = { $gte: 0 };
        }

        else if (inStock === 'true' && outOfStock === 'false') {
            filter.stock = { $gt: 0 };
        }

        else if (inStock === 'false' && outOfStock === 'true') {
            filter.stock = { $eq: 0 };
        }

        const filteredStock = await Clothes.find(filter);
        res.status(200).json(filteredStock);
    } catch (error) {
        res.status(200).json({ error: error.message });
    }
}

const getFilterClothes = async (req, res) => {
    const { tops, bottoms, accessories } = req.query;

    try {
        let filter = {};

        if (tops === 'true' && bottoms === 'false' && accessories === 'false') {
            filter = { clothing_type : 'tops' };
        }

        else if (tops === 'false' && bottoms === 'true' && accessories === 'false') {
            filter = { clothing_type : 'bottoms' };
        }

        else if (tops === 'false' && bottoms === 'false' && accessories === 'true') {
            filter = { clothing_type : 'accessories' };
        }

        else if (tops === 'true' && bottoms === 'true' && accessories === 'false') {
            filter = { $or: [
                        { clothing_type : 'tops'},
                        { clothing_type : 'bottoms' }
                        ]};
        }

        else if (tops === 'true' && bottoms === 'false' && accessories === 'true') {
            filter = { $or: [
                        { clothing_type : 'tops'},
                        { clothing_type : 'accessories' }
                        ]};
        }

        else if (tops === 'false' && bottoms === 'true' && accessories === 'true') {
            filter = { $or: [
                        { clothing_type : 'bottoms'},
                        { clothing_type : 'accessories' }
                        ]};
        }

        const filteredClothes = await Clothes.find(filter);
        res.status(200).json(filteredClothes);
    } catch (error) {
        res.status(200).json({ error: error.message });
    }
}

const getInStock = async (req, res) => {
    try {
        const clothes = await Clothes.find({stock : { $gt: 0 }});
        res.status(200).json(clothes);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

const getOutOfStock = async (req, res) => {
    try {
        const clothes = await Clothes.find({stock : { $eq: 0 }});
        res.status(200).json(clothes);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

const getPriceRange = async (req, res) => {
    const { minPrice, maxPrice } = req.params;

    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    try {
        const clothes = await Clothes.find({price : { $gte: min, $lte: max }});
        res.status(200).json(clothes);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

const getPrices = async (req, res) => {
    const { from, to } = req.query;

    const min = parseFloat(from);
    const max = parseFloat(to);
    try {
        const prices = await Clothes.find({ price: { $gte: min, $lte: max } });
        res.status(200).json(prices);
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
    getAccessories,
    getInStock,
    getOutOfStock,
    getPriceRange,
    getFilterStock,
    getFilterClothes,
    getPrices
}