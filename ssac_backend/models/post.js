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
    },
  ],
});

module.exports = mongoose.model("post", postSchema);
