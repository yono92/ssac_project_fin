const user = require("../../models/user");
const jwtModule = require("../../modules/jwtModule");
const sc = require("../../modules/statusCode"); // status 모듈화

const authController = {
  signup: async (req, res) => {
    const { email, nickName, password } = req.body;

    try {
      const checkemail = await user.findOne({ email }); // 이메일 체크
      const checknickName = await user.findOne({ nickName }); // 이메일 체크

      if (!checkemail && !checknickName) {
        const userModel = new user({ email, password, nickName });
        await userModel.save();
        res.status(200).json({
          // res.staus(sc.ok).json
          message: "회원 가입성공",
        });
      } else if (checkemail) {
        res.status(409).json({
          message: "중복된 이메일이 존재합니다.",
        });
      } else if (checknickName) {
        res.status(409).json({
          message: "중복된 닉네임이 존재합니다.",
        });
      } else {
        res.status(500).json({
          message: "서버에러",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  signin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await user.findOne({ email: email });

      if (!result) {
        return res.status(409).json({
          message: "해당 email이 존재하지 않습니다.",
        });
      } else {
        if (password !== result.password) {
          return res.status(409).json({
            message: "비밀번호가 일치하지 않습니다.",
          });
        } else {
          const payload = {
            nickName: result.nickName,
            verified: result.verified,
          };
          const token = jwtModule.create(payload);
          console.log(token);
          if ((vrified = true)) {
            res.status(200).json({
              message: "로그인 성공",
              accessToken: token,
            });
          } else {
          }
        }
      }
    } catch (error) {
      res.status(500).json({
        message: "서버 에러",
        error: error,
      });
    }
  },
};

module.exports = authController;
