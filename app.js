const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const cookieParser = require("cookie-parser");
const listings = require("./routes/listing.js")

const reviews=require("./routes/review.js")

// express session 
const session = require("express-session");
// require flash 
const flash = require("connect-flash");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// MongoDB Connection
main()
  .then(() => {
    console.log("✅ MongoDB connection successful");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
//  express session --
// app.get("/test", (req, res) => {
//   res.send("test succesfull");
//   if (req.cookies.count)
//   {
//     count++; res.send(count);
//   }
//   else {
//     req.cookies.count = 1;
//   }
// });

// // EJS setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));


// // using cookie parser
// app.use(cookieParser("secretcode"));

// Root Route
app.get("/", (req, res) => {
  // console.dir(req.cookies);
  res.send("Hi, I am root");
});
// app.get("/greet", (req, res) => {
//   let { name = "anonymous" } = req.cookies;
//   res.send(`hi ${name} `)
// });
// app.get("/getsignedcookies", (req, res) => {
//   res.cookie("made-in", "India", { signed: true });

//   res.send("signed cookie sent ");
// });

// //varify
// app.get("/varify", (req, res) => {
//   console.log(req.signedCookies);
//   res.send(varified);
// });


// // sending cookies using res.cookies
// app.get("/getcookies", (req, res) => {
//   res.cookie("greet", "Namaste");
//   res.cookie("origin", "india");
//   res.send("sent you some cookies");
// });
// session options 
const sessionOptions = {
  secret: "mySuperSecretCodeString",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    // day->hour->min->sec->miliseconds
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly:true
  },
};
app.use(session(sessionOptions));
app.use(flash());



// midlleware to store the messages
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  next();
});


app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);




// Catch-all Route for 404
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  console.error("Stack trace:", err.stack);
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("listings/error.ejs", { err });
});

// Server
app.listen(8080, () => {
  console.log("🚀 Server is listening on port 8080");
});



// Privacy Policy Page
// app.get("/privacy", (req, res) => {
//   res.render("static/privacy.ejs");
// });

// // Terms & Conditions Page
// app.get("/terms", (req, res) => {
//   res.render("static/terms.ejs");
// });
