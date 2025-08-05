const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const isAunthenticated = require("../middleware/auth");

router.get("/", userControllers.getIndex);


router.post("/" ,userControllers.postIndex);


module.exports = router;
