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

    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        email,
      },
      secret,
      {
        expiresIn: 60 * 60 * 24 * 1000,
      }
    );

    console.log(token);

    res.setHeader(
      "Set-Cookie",
      `auth=${token}; HttpOnly; Max-Age=${
        60 * 60 * 24 * 1000
      }; Path=/; SameSite=None; Secure`
    );

    res.status(200).json({ message: "Successfully logged in" });
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

    const secret = process.env.SECRET;

    const user = await Login.create({
      email,
      password: hash,
      profilePicture: "",
    });

    console.log(user);

    // const token = createToken(user._id);
    const token = jwt.sign(
      {
        email,
      },
      secret,
      {
        expiresIn: 60 * 60 * 24 * 1000,
      }
    );

    console.log(token);

    // res.cookie("auth", token, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    res.setHeader(
      "Set-Cookie",
      `auth=${token}; HttpOnly; Max-Age=${
        60 * 60 * 24 * 1000
      }; Path=/; SameSite=None; Secure`
    );
    // res.status(200).cookie("auth", token, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    //   path: "/"
    // })
    res.status(200).json({ message: "Successfully signed up" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSession = async (req, res) => {
  try {
    const cookie = req.headers.cookie;
    console.log("cookie ", cookie);
    const parsedCookie = cookie.split("=")[1];
    console.log("parsedCookie ", parsedCookie);

    if (!cookie) {
      throw new Error("Unable to retrieve session");
    }

    const secret = process.env.SECRET;
    const decodedCookie = jwt.verify(parsedCookie, secret);
    console.log("decodedCooie ", decodedCookie);

    res.status(200).json({ session: decodedCookie });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const signOut = async (req, res) => {
  try {
    res.setHeader(
      "Set-Cookie",
      `auth=""; HttpOnly; Max-Age=0; Path=/; SameSite=None; Secure`
    );
    res.status(200).json({ message: "Successfully signed out" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserEmail = async (req, res) => {
  const { newEmail } = req.body;
  try {
    const cookie = req.headers.cookie;
    console.log("cookie ", cookie);
    const parsedCookie = cookie.split("=")[1];
    console.log("parsedCookie ", parsedCookie);

    if (!cookie) {
      throw new Error("Unable to retrieve session");
    }

    const secret = process.env.SECRET;
    const decodedCookie = jwt.verify(parsedCookie, secret);
    console.log("decodedCooie ", decodedCookie);
    let email = decodedCookie.email;
    if (email === newEmail) {
      throw new Error("Email is same");
    }

    const exists = await Login.findOne({ email });
    console.log(exists);
    if (exists) {
      exists.email = newEmail;
      console.log(exists.email);
      await exists.save();
      console.log(exists);
      if (exists) {
        email = newEmail;
        console.log("reassigned email ", email);
        const secret = process.env.SECRET;
        const token = jwt.sign(
          {
            email,
          },
          secret,
          {
            expiresIn: 60 * 60 * 24 * 1000,
          }
        );

        console.log(token);

        res.setHeader(
          "Set-Cookie",
          `auth=${token}; HttpOnly; Max-Age=${
            60 * 60 * 24 * 1000
          }; Path=/; SameSite=None; Secure`
        );
        res.status(200).json(exists);
        console.log("Successfully updated email!");
      } else {
        throw new Error("Unable to update email");
      }
    } else {
      throw new Error("Unable to find an account associated with that email");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    const cookie = req.headers.cookie;
    console.log("cookie ", cookie);
    const parsedCookie = cookie.split("=")[1];
    console.log("parsedCookie ", parsedCookie);

    if (!cookie) {
      throw new Error("Unable to retrieve session");
    }

    const secret = process.env.SECRET;
    const decodedCookie = jwt.verify(parsedCookie, secret);
    console.log("decodedCookie ", decodedCookie);
    const email = decodedCookie.email;
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("New password is not a valid password");
    }

    if (!validator.isStrongPassword(confirmPassword)) {
      throw new Error("Confirm password is not a valid password");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("New and confirm password don't match");
    }

    if (
      currentPassword.length === 0 ||
      newPassword.length === 0 ||
      confirmPassword.length === 0
    ) {
      throw new Error("All password fields must be provided");
    }

    const user = await Login.findOne({ email: email });

    if (user) {
      const matchPasswords = await bcrypt.compare(
        // Compare the current password with the hashed already stored password to determine if they're the same or not
        currentPassword,
        user.password
      );
      if (matchPasswords) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        const newUser = await Login.findByIdAndUpdate(user._id, {
          password: hash,
        });
        if (newUser) {
          const token = jwt.sign(
            {
              email,
            },
            secret,
            {
              expiresIn: 60 * 60 * 24 * 1000,
            }
          );

          console.log(token);

          res.setHeader(
            "Set-Cookie",
            `auth=${token}; HttpOnly; Max-Age=${
              60 * 60 * 24 * 1000
            }; Path=/; SameSite=None; Secure`
          );
          res.status(200).json(user);
        } else {
          throw new Error("Unable to update password please try again");
        }
      } else {
        throw new Error(
          "Current and stored password don't match please try again"
        );
      }
    } else {
      throw new Error(
        "Unable to find an account associated with that password"
      );
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addToWishList = async (req, res) => {
  const { item } = req.body;

  try {
    const cookie = req.headers.cookie;
    console.log("cookie ", cookie);
    const parsedCookie = cookie.split("=")[1];
    console.log("parsedCookie ", parsedCookie);

    if (!cookie) {
      throw new Error("Unable to retrieve session");
    }

    const secret = process.env.SECRET;
    const decodedCookie = jwt.verify(parsedCookie, secret);
    console.log("decodedCookie ", decodedCookie);
    const email = decodedCookie.email;
    const exists = await Login.findOne({ email });
    if (exists) {
      const wishListItem = { item: item };
      exists.wishList.push(wishListItem);
      console.log(exists.wishList);
      console.log(exists);
      await exists.save();
      res.status(200).json({ message: "Updated wishlist" });
    } else {
      throw new Error("Unable to find an account associated with that email");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFromWishList = async (req, res) => {
  const { id } = req.params;

  try {
    const cookie = req.headers.cookie;
    console.log("cookie ", cookie);
    const parsedCookie = cookie.split("=")[1];
    console.log("parsedCookie ", parsedCookie);

    if (!cookie) {
      throw new Error("Unable to retrieve session");
    }

    const secret = process.env.SECRET;
    const decodedCookie = jwt.verify(parsedCookie, secret);
    console.log("decodedCookie ", decodedCookie);
    const email = decodedCookie.email;
    const exists = await Login.findOne({ email });
    if (exists) {
      exists.wishList = exists.wishList.filter((item) => {
        return item._id.toString() !== id;
      });
      // const index = exists.wishList.indexOf({ item: item, id: id });
      // const deletedWishList = exists.wishList.splice(index, 1);
      await exists.save();
      res.status(200).json({ message: "Item removed from wishlist" });
    } else {
      throw new Error("Unable to find an account associated with that email");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWishList = async (req, res) => {
  try {
    const cookie = req.headers.cookie;
    console.log("cookie ", cookie);
    const parsedCookie = cookie.split("=")[1];
    console.log("parsedCookie ", parsedCookie);

    if (!cookie) {
      throw new Error("Unable to retrieve session");
    }

    const secret = process.env.SECRET;
    const decodedCookie = jwt.verify(parsedCookie, secret);
    console.log("decodedCookie ", decodedCookie);
    const email = decodedCookie.email;
    const exists = await Login.findOne({ email });
    if (exists) {
      res.status(200).json(exists.wishList);
    } else {
      throw new Error("Unable to find an account associated with that email");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const exists = await Login.findOne({ email });
    if (exists) {
      res.status(200).json(exists.orders);
    } else {
      throw new Error("Unable to find an account associated with that email");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Might need to implement ability to add orders based on whether someone has signed up or not(unsure if needed possibly not)
const addOrders = async (req, res) => {
  const { order } = req.body;
  console.log("backend order ", order);
  try {
    const cookie = req.headers.cookie;
    console.log("cookie ", cookie);
    const parsedCookie = cookie.split("=")[1];
    console.log("parsedCookie ", parsedCookie);

    if (!cookie) {
      throw new Error("Unable to retrieve session");
    }

    const secret = process.env.SECRET;
    const decodedCookie = jwt.verify(parsedCookie, secret);
    console.log("decodedCookie ", decodedCookie);
    const email = decodedCookie.email;
    const exists = await Login.findOne({ email });
    if (exists) {
      const totalPrice = order.reduce((acc, item) => acc + item.price, 0);
      const newOrder = { order: order, totalPrice: totalPrice };
      exists.orders.push(newOrder);
      await exists.save();
      res.status(200).json(newOrder);
    } else {
      throw new Error("Unable to find an account associated with that email");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProfilePicture = async (req, res) => {
  const { profilePicture } = req.body;

  try {
    const cookie = req.headers.cookie;
    console.log("cookie ", cookie);
    const parsedCookie = cookie.split("=")[1];
    console.log("parsedCookie ", parsedCookie);

    if (!cookie) {
      throw new Error("Unable to retrieve session");
    }

    const secret = process.env.SECRET;
    const decodedCookie = jwt.verify(parsedCookie, secret);
    console.log("decodedCookie ", decodedCookie);
    console.log("email ", decodedCookie.email);

    const email = decodedCookie.email;
    const exists = await Login.findOne({ email });
    if (exists) {
      exists.profilePicture = profilePicture;
      await exists.save();
      res.status(200).json({ picture: profilePicture });
    } else {
      throw new Error("Unable to find an account associated with that email");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProfilePicture = async (req, res) => {
  // Probably don't need anymore
  const { email } = req.query;

  try {
    const exists = await Login.findOne({ email });
    if (exists) {
      const profilePicture = exists.profilePicture;
      exists.profilePicture = "";
      await exists.save();
      res.status(200).json(profilePicture);
    } else {
      throw new Error("Unable to find an account associated with that email");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const cookie = req.headers.cookie;
    console.log("cookie ", cookie);
    const parsedCookie = cookie.split("=")[1];
    console.log("parsedCookie ", parsedCookie);

    if (!cookie) {
      throw new Error("Unable to retrieve session");
    }

    const secret = process.env.SECRET;
    const decodedCookie = jwt.verify(parsedCookie, secret);
    console.log("decodedCookie ", decodedCookie);
    console.log("email ", decodedCookie.email);

    const email = decodedCookie.email;
    const exists = await Login.findOne({ email });
    if (exists) {
      res.status(200).json(exists);
    } else {
      throw new Error("Unable to find an account associated with that email");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  updateUserEmail,
  updatePassword,
  addToWishList,
  deleteFromWishList,
  getWishList,
  getOrders,
  addOrders,
  updateProfilePicture,
  deleteProfilePicture,
  getUserInfo,
  getSession,
  signOut,
};
