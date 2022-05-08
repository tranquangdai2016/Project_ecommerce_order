const nodemailer = require("nodemailer");
module.exports.sendMail = async (email, template) => {
  return new Promise((resolve, reject) => {
    if (!email) {
      console.log("error");
      reject("error email");
    } else {
      const transporter = nodemailer.createTransport({
        // config mail server
        service: "Gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const mainOptions = {
        // thiết lập đối tượng, nội dung gửi mail
        from: "Dung Ha",
        to: `${email}`,
        subject: "Test Nodemailer",
        text: "You recieved message from admin",
        html: template,
      };
      transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("Message sent: " + info.response);
          resolve(info);
        }
      });
    }
  });

  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: "Thanh Batmon",
    to: "tomail@gmail.com",
    subject: "Test Nodemailer",
    text: "You recieved message from " + req.body.email,
    html:
      "<p>You have got a new message</b><ul><li>Username:" +
      req.body.name +
      "</li><li>Email:" +
      req.body.email +
      "</li><li>Username:" +
      req.body.message +
      "</li></ul>",
  };
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      console.log("Message sent: " + info.response);
      res.redirect("/");
    }
  });
};
