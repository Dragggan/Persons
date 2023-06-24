const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);

// router.post("/current", (req, res) => {
//   res.json({ message: "Current user" });
// });

module.exports = router;
