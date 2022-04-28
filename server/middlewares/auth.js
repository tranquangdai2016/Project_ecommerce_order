const admin = require('../firebase')
const User = require('../models/user')
const jwt = require('jsonwebtoken');




exports.authCheck = async (req, res, next) => {
    const token = req.headers('code-token')
    // console.log(req.headers); //token
    try {
        const firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken);

        const codetoken = jwt.verify(token, config.get('jwtSS'))

        let user = await User.findOne({
            _id: codetoken._id,
            'tokens.token': token
        });
        // console.log('FIREBASE USER IN AUTHCHECK',firebaseUser)
        req.user = firebaseUser;
        next();
    }catch (err){
        res.status(401).json({
            err: "Invalid or expired token"
        });
    }
};

exports.adminCheck = async (req, res, next) => {
    const {email} = req.user

    const adminUser = await User.findOne({email}).exec()

    if(adminUser.role !== 'admin'){
        res.status(403).json({
            err: 'Admin resource. Access denied.'
        });
    }else{
        next();
    }
};
