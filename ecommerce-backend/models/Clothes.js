const mongoose = require('mongoose');

const ClothesSchema = new mongoose.Schema({ // Creates a schema that will be used create clothes products
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    clothing_type: {
        type: String,
        required: true
    }
})

const Clothes = mongoose.model('Clothes', ClothesSchema);

module.exports = Clothes;