const User = require("../models/user.js");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { sendMail } = require("../helps/mail-config");

exports.register = async (req, res) => {
  const { username, email, password, phone } = req.body;
  // Validation
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Bạn cần nhập đầy đủ thông tin",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email đã tồn tại",
      });
    }
    // Mã hóa password
    const hassed_password = await argon2.hash(password);
    const newUser = new User({
      username,
      email,
      password: hassed_password,
      phone,
    });

    newUser.save((err, user) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Đăng kí tài khoản không thành công",
        });
      }
      res.status(200).json({
        success: true,
        message: "Đăng kí tài khoản thành công",
      });
    });

    // send email
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    const content = `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Thông tin mật khẩu mới của bạn </h4>
                <span style="color: black">
                  Mật khẩu mới là 
                </span>
            </div>
        </div>
    `;

    let mainOptions = {
      from: "ESHOP",
      to: email,
      subject: "Thông tin đơn hàng",
      html: content,
    };
    transporter.sendMail(mainOptions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Bạn cần nhập đủ thông tin",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }

    // Check password
    const passwordValidate = await argon2.verify(user.password, password);

    if (!passwordValidate) {
      return res.status(400).json({
        success: false,
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }

    // Create token
    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
    );

    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone,
        isAdmin: user.isAdmin
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

const generatePassword = (length) => {
  const characterss =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characterss.charAt(
      Math.floor(Math.random() * characterss.length)
    );
  }
  return password;
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  User.findOne({ email }, async (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "User with this email does not exists" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY);

    try {
      //update new password for user
      const newPassword = generatePassword(8);
      const hassed_new_password = await argon2.hash(newPassword);
      user.password = hassed_new_password;
      user.resetLink = token;
      await User.updateOne({ _id: user._id }, user);
      const template = `
        <h2>Please click on given link to reset you password </h2>
        <p>Email: ${user.email}</p>
        <p>New password: ${newPassword}</p>
        <a href="http://localhost:3000/auth/login">LOGIN</a>
        `;
      const result = await sendMail(email, template);
      if (result)
        res.status(200).json({
          type: "success",
          message: "Please check your email to get new password !",
        });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  });
};
