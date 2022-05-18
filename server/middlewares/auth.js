const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.header("x-auth-token");

  if (!authHeader) {
    return res.status(403).json({
      success: false,
      message: "Không tìm thấy token",
    });
  }
  const token = authHeader;
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: "Token không hợp lệ",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Bạn không có quyền",
    });
  }

  next();
};
