const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

//app
const app = express();

//db
mongoose
.connect(process.env.DATABASE, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB CONNECT"))
.catch((err) => console.log("DB CONNECT ERR", err))

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({limit:"2mb"}));
app.use(cors());

//route
app.get("/api", (req, res) => {
    res.json({
        data: "hey you hit node API",
    });
});

//port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));