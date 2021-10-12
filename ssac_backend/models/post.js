const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema를 정의하는 2가지 방법
const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: Number, default: 0 }, //글 카테고리
  tags: [String], //여러개의 해쉬태그를 입력 - 배열
  publishDate: { type: Date, defualt: new Date() },
  updateDate: { type: Date, default: null },
  writer: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // user table 연결
  comment: [
    {
      commentWriter: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // user table 연결
      commentContent: { type: String, required: true },
      commmetDate: { type: Date, defualt: new Date() },
      commentUpdateDate: { type: Date, default: new Date() },
    },
  ],
});

postSchema.statics.checkAuth = async function (params) {
  const { postId, writerId } = params;
  try {
    const ownResult = await this.findOne({ _id: postId });
    const ownId = ownResult.writer;
    if (ownId.toString() !== writerId.toString()) {
      return -1;
    }
    return 1;
  } catch (error) {
    return -2;
  }
};

postSchema.statics.checkComment = async function (params) {
  const { postId, commentId, writerId } = params;

  try {
    const ownPost = await this.findOne({ _id: postId });
    const ownCommentIndex = ownPost.comment.findindex((i = i._id == commentId));
    const ownId = ownPost.comment[ownCommentIndex].commentWriter;
    if (ownId.toString() !== writerId.toString()) return -1;
    else return ownCommentIndex;
  } catch (error) {
    return -2;
  }
};

module.exports = mongoose.model("post", postSchema);
