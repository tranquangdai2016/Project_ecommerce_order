require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { readdirSync } = require("fs");
const path = require('path');

//import routes
const authRoutes = require("./routes/auth");

//app
const app = express();
global.__basedir = __dirname;
//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECT"))
  .catch((err) => console.log("DB CONNECT ERR", err));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//routes middlewares
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));


// app.use("/api/auth", authRoutes);
//router api
app.use("/api/auth", require('./routes/auth'))
app.use("/api/product", require('./routes/product'));
app.use("/api/category", require('./routes/category'));
app.use("/api/admin", require('./routes/admin'));
app.use("/api/cloudinary", require('./routes/cloudinary'));
app.use("/api/coupon", require('./routes/coupon'));
app.use("/api/stripe", require('./routes/stripe'));
app.use("/api/sub", require('./routes/sub'));
app.use("/api/user", require('./routes/user'));

app.get('/media/image/:filename', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'media', 'image', req.params.filename));
});

//port
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Server is running on port ${port}`));
