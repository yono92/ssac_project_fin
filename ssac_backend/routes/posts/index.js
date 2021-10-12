var express = require("express");
var router = express.Router();

const PostController = require("../../controllers/post/PostController");
const authModule = require("../../modules/authModule");

//verified :true
router.post("/", authModule.checkVerified, PostController.createPost);
router.put("/:id", authModule.checkVerified, PostController.updatePost);
router.delete("/:id", authModule.checkVerified, PostController.deletePost);

// 아무나 가능
router.get("/", PostController.readAllpost);

// loggedIn: true
router.get("/:id", authModule.loggedIn, PostController.readDetailPost);
router.post("/:id/comments", authModule.loggedIn, PostController.createComment);
router.delete(
  "/:id/comments/:commentid",
  authModule.loggedIn,
  PostController.deleteComment
);

module.exports = router;
