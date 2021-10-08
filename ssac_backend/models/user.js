const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  nickName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: {
    type: String,
    default: null,
    enum: ["모더나", "화이자", "AZ", "얀센", null],
  },
  age: { type: Number, default: null },
  gender: { type: Number, enum: [0, 1, 2], default: 1 },
  inoDate: { type: Date, default: null },
  degree: { type: Number, default: null },
  verified: { type: Boolean, default: false },
  profileimage: { type: String, default: null },
});

module.exports = mongoose.model("user", userSchema);
