require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`);
            console.log('Connected to MongoDB');
        })
    })
    .catch((error) => {
        console.log(error);
    })