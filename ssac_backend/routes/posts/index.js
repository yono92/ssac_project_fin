var express = require("express");
const postController = require("../../controllers/post/postController");
var router = express.Router();
const authModule = require("../../modules/authModule");

router.post("/", authModule.loggedIn, postController.createPost);

module.exports = router;
