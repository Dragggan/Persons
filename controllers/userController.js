const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  console.log('%c  "TEST"==> ', "color:red;font-size:12px;", "TEST");
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
  const user = User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
  res.json(200);
});

// const createContact = asyncHandler(async (req, res) => {
//   const { name, email, phone } = req.body;
//   if (!name || !email || !phone) {
//     res.status(400);
//     throw new Error("All fields are mandatory!");
//   }
//   const contact = await Contact.create({
//     name,
//     email,
//     phone,
//   });
//   res.status(201).json(contact);
// });

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
  // createContact,
  // updateContact,
  // deleteContact,
  // getContact,
};
