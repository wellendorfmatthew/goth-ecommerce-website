const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  wishList: [
    {
      item: {
        name: String,
        id: Number,
        image: String,
        price: Number,
      },
      id: Number,
    },
  ],
  orders: [
    {
      id: Number,
      date: {
        type: Date,
        default: Date.now,
      },
      image: String,
      name: String,
      price: Number,
    },
  ],
  profilePicture: {
    type: String,
  },
});

const Login = mongoose.model("Login", loginSchema);
module.exports = Login;
