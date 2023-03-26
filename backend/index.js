const express = require("express");
const app = express();

const rateLimit = require("express-rate-limit");

const helmet = require("helmet");

const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const path = require("path");

const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Data sanitization against NOSql Query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(hpp());

app.use(express.static(path.join(__dirname, "public")));

const dotenv = require("dotenv");
dotenv.config({ path: "./db.env" });

// Security HTTP header
app.use(helmet());

app.use((req, res, next) => {
  // console.log(req.headers);
  next();
});

// Limit request by user in a hour
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
