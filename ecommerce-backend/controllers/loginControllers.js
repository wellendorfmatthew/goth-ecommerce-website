const Login = require("../models/Login");
const bcrypt = require("bcrypt"); // Will be used to encrypt password
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "7d" }); // First argument is id, secret string, and how many days the user can stay logged in before token expires
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email && !password) {
      throw new Error("All fields must be filled");
    }

    if (!email) {
      throw new Error("Email must be provided");
    }

    if (!password) {
      throw new Error("Password must be provided");
    }

    const user = await Login.findOne({ email });

    if (!user) {
      throw new Error("Incorrect email");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Incorrect password");
    }

    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All fields must be filled");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Not a valid email");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Not a valid password");
    }

    const exists = await Login.findOne({ email }); // This refers to the schema

    if (exists) {
      throw new Error("Email already exists");
    }
    // SALT is used to add extra characters to a password for extra security and if 2 users have the same password then chances are they'll have different characters at the end
    const salt = await bcrypt.genSalt(10); // Use await since it takes time to generate the characters
    const hash = await bcrypt.hash(password, salt);

    const user = await Login.create({ email, password: hash });

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
