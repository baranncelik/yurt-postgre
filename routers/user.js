const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const isAunthenticated = require("../middleware/auth");

router.get("/", isAunthenticated ,userControllers.getIndex);


router.post("/", isAunthenticated ,userControllers.postIndex);


module.exports = router;