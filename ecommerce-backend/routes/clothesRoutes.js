const express = require('express');
const {
    deleteClothes,
    updateClothes,
    getClothes,
    createClothes,
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
} = require('../controllers/clothesControllers');

const router = express.Router();

router.post('/', createClothes);
router.get('/', getClothes);
router.get('/getTops', getTops);
router.get('/getBottoms', getBottoms);
router.get('/getAccessories', getAccessories);
router.get('/getFilterStock', getFilterStock);
router.get('/getFilterClothes', getFilterClothes);
router.get('/getPrices', getPrices)
router.get('/getInStock', getInStock);
router.get('/getOutOfStock', getOutOfStock);
router.get('/:minPrice/:maxPrice', getPriceRange)
router.put('/:id', updateClothes);
router.delete('/:id', deleteClothes);
router.get('/:id', getClothingItem);

module.exports = router;