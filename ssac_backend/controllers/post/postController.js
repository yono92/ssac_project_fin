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

  //미들웨어 여부 합의 해야함 게시판 이용자만 조회 가능하게 할지
  readAllpost: async (req, res) => {
    try {
      const result = await post.find().populate("writer", "nickName");
      if (!result)
        return res.status(400).json({
          message: "조회할 데이터가 없습니다.",
        });

      res.status(200).json({
        message: "조회 성공",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: "DB 서버 에러",
      });
    }
  },
  readDetailPost: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await post.findByID(id).populate("writer", "nickName");
      if (!result)
        return res.status(400).json({
          message: "데이터가 없습니다.",
        });

      res.status(200).json({
        message: "조회 성공",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: "DB 서버 에러",
      });
    }
  },

  updatePost: async function (req, res) {
    const { id } = req.params;
    const { content, title, tags, category } = req.body;

    try {
      const updated = await post.findByIdAndUpdate(
        id,
        {
          title,
          content,
          tags,
          category,
          updateDate: new Date(),
        },
        { new: true }
      );
      res.status(200).json({
        message: "게시글 수정 완료",
        date: updated,
      });
    } catch (error) {
      res.status(500).json({
        message: "게시물 수정 실패",
      });
      console.log(error);
    }
  },

  deletePost: async (req, res) => {
    const userInfo = req.userInfo;
    const { id } = req.params;

    const check = await post.checkWriter({
      postId: id,
      writerId: userInfo._id,
    });
    if (check === -1) {
      return res.status(409).json({ message: "권한이 없습니다." });
    } else if (check === -2) {
      return res.status(500).json({ message: "DB 서버에러" });
    } else {
      try {
        await post.findByIdAndDelete(id);
        res.status(200).json({
          message: "게시물 저장 성공",
        });
      } catch (error) {
        res.status(500).json({
          message: "DB 서버 에러",
        });
      }
    }
  },

  createComment: async (req, res) => {
    const userInfo = req.userInfo;
    const { content } = req.body;
    const { id } = req.params;

    const newComment = {
      commentWriter: userInfo._id,
      commentContent: content,
      commnetDate: new Date(),
    };
    try {
      const updated = await post.findByIdAndUpdate(
        id,
        { $push: { comments: newComment } },
        { new: true }
      );
      res.status(200).json({
        message: "댓글 추가 완료",
        data: updated,
      });
    } catch (error) {
      res.status(500).json({
        message: "DB 서버 에러",
      });
    }
  },

  deleteComment: async (req, res) => {
    const userInfo = req.userInfo;
    const { content } = req.body;
    const { id } = req.params;

    const newComment = {
      commentWriter: userInfo._id,
      commentContent: content,
      commnetDate: new Date(),
    };
    try {
      const updated = await post.findByIdAndUpdate(
        id,
        { $push: { commnet: new comment() } },
        { new: true }
      );
    } catch (error) {}
  },
};

module.exports = postController;
