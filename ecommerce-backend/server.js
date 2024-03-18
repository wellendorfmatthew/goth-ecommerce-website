require("dotenv").config(); // Require dotenv to hide the port number, mongo uri, and strip secret test key
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const clothesRoutes = require("./routes/clothesRoutes");
const loginRoutes = require("./routes/loginRoutes");
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY); // Require stripe for payment processing

const app = express(); // Creates an express application instance

app.use(
  cors({
    origin: [
      "https://goth-ecommerce-website-backend.onrender.com/",
      process.env.PRODUCTION_FRONTEND,
      `${process.env.PRODUCTION_FRONTEND}/clothes`,
      `${process.env.PRODUCTION_FRONTEND}/user`,
      `${process.env.PRODUCTION_FRONTEND}/user/session`,
      process.env.LOCAL_FRONTEND,
      `${process.env.LOCAL_FRONTEND}/clothes`,
      `${process.env.LOCAL_FRONTEND}/user/`,
      `${process.env.LOCAL_FRONTEND}/user/session`,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: "Set-Cookie",
  })
); // Allows for sharing resources between different servers
app.use(express.json()); // Allows for the use of json data

app.use("/clothes", clothesRoutes);
app.use("/user", loginRoutes);

app.post("/checkout", async (req, res) => {
  // Set up a post method to take items on checkout and perform payment processing through the stripe api
  const { checkoutList } = req.body;
  console.log(checkoutList);

  const session = await stripe.checkout.sessions.create({
    line_items: checkoutList,
    mode: "payment",
    success_url: `${
      process.env.PRODUCTION_FRONTEND || process.env.LOCAL_FRONTEND
    }/confirmation`,
    cancel_url: `${
      process.env.PRODUCTION_FRONTEND || process.env.LOCAL_FRONTEND
    }/cancel`,
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

mongoose
  .connect(process.env.MONGO_URI) // Connect to MongoDB and upon success start listening for the port
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
      console.log("Connected to MongoDB");
    });
  })
  .catch((error) => {
    console.log(error);
  });
