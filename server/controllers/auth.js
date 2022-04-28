const User = require('../models/user')
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

exports.createOrUpdateUser = async (req, res) => {
   const {name, picture, email} = req.user;

   const user = await User.findOneAndUpdate(
       {email},
        {name: email.split('@')[0], picture},
         {new: true}
         );

   if(user) {
       console.log('USER UPDATE', user);
       res.json(user)
   }else{
       const newUser = await new User({
           email,
           name: email.split('@')[0],
           picture,
       }).save();
       console.log('USER UPDATE', newUser);
       res.json(newUser);
   }
};
exports.currentUser = async (req, res) => {
    User.findOne({email: req.user.email}).exec((err, user) => {
        if(err) throw new Error(err);
        res.json(user);
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "You need to enter enough information",
      });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Incorrect account or password",
        });
      }
  
      // Check password
      const passwordValidate = await argon2.verify(user.password, password);
  
      if (!passwordValidate) {
        return res.status(400).json({
          success: false,
          message: "Incorrect account or password",
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
        process.env.ACCESS_TOKEN_SECRET
      );
  
      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "error server",
      });
    }
  };

