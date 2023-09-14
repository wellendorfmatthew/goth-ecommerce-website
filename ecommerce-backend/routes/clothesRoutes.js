const express = require('express');
const {
    deleteClothes,
    updateClothes,
    getClothes,
    createClothes,
    getClothingItem,
    getTops,
    getBottoms,
    getAccessories
} = require('../controllers/clothesControllers');

const router = express.Router();

router.post('/', createClothes);
router.get('/', getClothes);
router.get('/getTops', getTops);
router.get('/getBottoms', getBottoms);
router.get('/getAccessories', getAccessories);
router.put('/:id', updateClothes);
router.delete('/:id', deleteClothes);
router.get('/:id', getClothingItem);

module.exports = router;