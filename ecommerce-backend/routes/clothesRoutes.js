const express = require('express');
const {
    deleteClothes,
    updateClothes,
    getClothes,
    createClothes,
    getClothingItem
} = require('../controllers/clothesControllers');

const router = express.Router();

router.post('/', createClothes);
router.put('/:id', updateClothes);
router.delete('/:id', deleteClothes);
router.get('/', getClothes);
router.get('/:id', getClothingItem);

module.exports = router;