const express = require("express");
const router = express.Router();
const { createUser, loginUser, getAllUsers, updateUser, deleteUser, getUser } = require("../controller/userController");
const upload = require("../middleware/upload");
const authenticateAdmin = require("../middleware/auth");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/users", authenticateAdmin, getAllUsers);
router.get("/getuser/:id", getUser);

router.put("/users/:id", upload.fields([{ name: "profile_img", maxCount: 1 }]), updateUser);
router.delete("/users/:id", authenticateAdmin, deleteUser);

module.exports = router;
