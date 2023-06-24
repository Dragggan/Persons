const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("User name,email, password can't be empty");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  // create has pass
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User created ${user.username} , with email ${user.email}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
  res.json(200);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide valid username and password");
  }
  const user = await User.findOne({
    email,
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accsessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCSESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.status(200).json({ accsessToken });
  } else {
    res.status(401);
    throw new Error("Email or password are not valid");
  }
});

// const updateContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   console.log(contact);
//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }
//   const updatedContact = await Contact.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     {
//       new: true,
//     }
//   );

//   res.status(201).json(updatedContact);
// });
// const deleteContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }
//   await Contact.deleteOne({ _id: req.params.id });
//   res.status(200).json(contact);
// });

// const getContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }
//   res.status(200).json(contact);
// });

module.exports = {
  registerUser,
  loginUser,
  // updateContact,
  // deleteContact,
  // getContact,
};
