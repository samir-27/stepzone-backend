const express = require("express")
const router = express.Router()
const { createUser, loginUser, getAllUsers, updateUser } = require("../controller/userController")

router.post("/register",createUser)
router.post("/login",loginUser)
router.get("/users",getAllUsers)
router.put("/users/:id", updateUser);

module.exports = router;