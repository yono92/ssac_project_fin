const post = require("../../models/post");

const postController = {
  createPost: function (req, res) {
    const userInfo = req.userInfo;
    const { title, content, tags, category } = req.body;

    const boardModel = new post({
      title,
      content,
      category,
      tags,
      publishDate: new Date(),
      writer: userInfo._id,
    });

    boardModel
      .save()
      .then((savedPost) => {
        console.log(savedPost);
        res.status(200).json({
          message: "게시물 생성 성공",
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "DB 서버 에러",
        });
      });
  },
};

module.exports = postController;
