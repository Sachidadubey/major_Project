if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { storage } = require("./cloudConfig");
const multer = require("multer");
const upload = multer({ storage });

const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/expressError");
const Listing = require("./models/listing");
const User = require("./models/user");

const listingsRouter = require("./routes/listing");
const userRouter = require("./routes/user");
const reviewsRouter = require("./routes/review");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;

// ---------------- MongoDB Connection ----------------
main()
  .then(() => console.log("✅ MongoDB connection successful"))
  .catch(err => console.error("❌ MongoDB connection error", err));

async function main() {
  await mongoose.connect(dbUrl);
   dbName: "test"
  }

// ---------------- EJS Setup ----------------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ---------------- Middleware ----------------
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// ---------------- Session & Flash ----------------
const store = mongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret:  process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log(error ,"error is here ");
})
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true, maxAge: 7*24*60*60*1000 } // 7 days
};




app.use(session(sessionOptions));
app.use(flash());

// ---------------- Passport ----------------
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ---------------- Flash messages middleware ----------------
app.use((req, res, next) => {
  res.locals.currUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ---------------- Routes ----------------
app.use("/", userRouter);
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);

// Example: test multer + Cloudinary route
// app.post("/test-upload", upload.single("listing[image]"), wrapAsync(async (req, res) => {
//   console.log("Uploaded file:", req.file);
//   res.send(req.file); // must send response
// }));

// ---------------- Catch-all 404 ----------------
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// ---------------- Error Handler ----------------
app.use((err, req, res, next) => {
  // console.error("Error occurred:", err);
  // console.error("Stack trace:", err.stack);
  const { statusCode = 500 } = err;
  res.status(statusCode).render("listings/error.ejs", { err });
});

// ---------------- Server ----------------
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
