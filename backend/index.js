const express = require("express");
const app = express();

const rateLimit = require("express-rate-limit");

const path = require("path");

const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const dotenv = require("dotenv");
dotenv.config({ path: "./db.env" });

app.use((req, res, next) => {
  // console.log(req.headers);
  next();
});

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});

app.use("/account", limiter);

// Database connection
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://natours:${process.env.PASSWORD}@cluster0.kylf9c1.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  )
  .then((con) => {
    console.log("database connected successfully");
  });

const userRoute = require("./routes/userRoute");
app.use("/", userRoute);
// app.get("/", (req, res) => {
//   res.status(200).json({ status: process.env.PASSWORD });
// });
// app.post("/find", (req, res) => {
//   console.log(req.body);
//   //   res.status(200).json({ accept: true });
//   res.status(200).json(req.body);
// });

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server connected to port${PORT}`);
  } else {
    console.log(err);
  }
});
