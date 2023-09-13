require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const  clothesRoutes = require('./routes/clothesRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express(); // Creates an express application instance

app.use(cors()); // Allows for sharing resources between different servers
app.use(express.json()); // Allows for the use of json data

app.use('/clothes', clothesRoutes);
app.use('/user', loginRoutes);

mongoose.connect(process.env.MONGO_URI) // Connect to MongoDB and upon success start listening for the port
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`);
            console.log('Connected to MongoDB');
        })
    })
    .catch((error) => {
        console.log(error);
    })
