const Clothes = require('../models/Clothes');
const mongoose = require('mongoose');

// Creates clothes that will be added to the MongoDB database
const createClothes = async (req, res) => {
    const { image, name, price, description, stock, clothing_type } = req.body; // Get the properties from the request body

    try { // Attempt to add the new clothes to the database otherwise display an error message
        const addClothes = await Clothes.create({ image, name, price, description, stock, clothing_type });
        res.status(200).json(addClothes);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
// Deletes clothes from the MongoDB database that correspond to a certain id
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

// Updates a clothing item of a specific id
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

// Retrieve all clothes from the database 
const getClothes = async (req, res) => {
    const clothes = await Clothes.find({}).sort({createdAt: -1}); // Search for clothes sorted by oldest to newest
    res.status(200).json(clothes);
}

// Retrieve a clothing item that 
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

// Retrieve all clothes from the database that are of the clothing type tops
const getTops = async (req, res) => {
    //const { tops } = req.query.clothing_type;

    try {
        const Tops = await Clothes.find({clothing_type: "tops"}); // Searches for all clothes that are tops
        res.status(200).json(Tops);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

// Retrieve all clothes from the database that are of the clothing type bottoms
const getBottoms = async (req, res) => {
    //const { bottoms } = req.query.clothing_type;

    try {
        const Tops = await Clothes.find({clothing_type: "bottoms"}); // Searches for all clothes that are bottoms
        res.status(200).json(Tops);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

// Retrieve all clothes from the databse that are of the clothing type accessories
const getAccessories = async (req, res) => {
    //const { accessories } = req.query.clothing_type;

    try {
        const Tops = await Clothes.find({clothing_type: "accessories"}); // Searches for all clothes that are accessories
        res.status(200).json(Tops);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

// Retrieve items from the database based on whether they're in stock or out of stock
const getFilterStock = async (req, res) => {
    const { inStock, outOfStock } = req.query;

    try {
        let filter = {};

        if (inStock === 'true' && outOfStock === 'true') { // Retrieve all items that are in and out of stock
            filter.stock = { $gte: 0 };
        }

        else if (inStock === 'true' && outOfStock === 'false') { // Retrieve only items that are in stock
            filter.stock = { $gt: 0 };
        }

        else if (inStock === 'false' && outOfStock === 'true') { // Retrieve only items that are out of stock
            filter.stock = { $eq: 0 };
        }

        const filteredStock = await Clothes.find(filter);
        res.status(200).json(filteredStock);
    } catch (error) {
        res.status(200).json({ error: error.message });
    }
}

// Retrieve clothes based on if a user selects tops, bottoms, or accessories(or all or a combination)
const getFilterClothes = async (req, res) => {
    const { tops, bottoms, accessories } = req.query;

    try {
        let filter = {};

        if (tops === 'true' && bottoms === 'false' && accessories === 'false') { // Only retrieve the tops
            filter = { clothing_type : 'tops' };
        }

        else if (tops === 'false' && bottoms === 'true' && accessories === 'false') { // Only retrieve bottoms
            filter = { clothing_type : 'bottoms' };
        }

        else if (tops === 'false' && bottoms === 'false' && accessories === 'true') { // Only retrieve accessories
            filter = { clothing_type : 'accessories' };
        }

        else if (tops === 'true' && bottoms === 'true' && accessories === 'false') { // Retrieve tops and bottoms
            filter = { $or: [
                        { clothing_type : 'tops'},
                        { clothing_type : 'bottoms' }
                        ]};
        }

        else if (tops === 'true' && bottoms === 'false' && accessories === 'true') { // Retrieve tops and accessories
            filter = { $or: [
                        { clothing_type : 'tops'},
                        { clothing_type : 'accessories' }
                        ]};
        }

        else if (tops === 'false' && bottoms === 'true' && accessories === 'true') { // Retrieve bottoms and accessories
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

// Deprecated 
const getInStock = async (req, res) => {
    try {
        const clothes = await Clothes.find({stock : { $gt: 0 }});
        res.status(200).json(clothes);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

// Deprecated
const getOutOfStock = async (req, res) => {
    try {
        const clothes = await Clothes.find({stock : { $eq: 0 }});
        res.status(200).json(clothes);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

// Retrieves a minimum and maximum price based on a price filter
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

// Retrieves a minimum and maximum price based on a price filter
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