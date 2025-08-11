const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/expressError.js");

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

// EJS setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));




// Root Route
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// Index Route
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

// New Listing Form
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  })
);

// Create Route
app.post(
  "/listings",
  wrapAsync(async (req, res) => {
    const newListings = new Listing(req.body.listing);
    await newListings.save();
    res.redirect("/listings");
  })
);

// Edit Form Route
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

// Update Route
app.put(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  })
);

// Delete Route
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);
// Privacy Policy Page
app.get("/privacy", (req, res) => {
  res.render("static/privacy.ejs");
});

// Terms & Conditions Page
app.get("/terms", (req, res) => {
  res.render("static/terms.ejs");
});



// Catch-all Route for 404
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).send(message);
});

// Server
app.listen(8080, () => {
  console.log("🚀 Server is listening on port 8080");
});
