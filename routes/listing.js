const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");
const { isOwner } = require("../middleware.js");






// schema middleware
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, error)
  }
  else {
    next();
  }
}; 

// Index Route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

// New Listing Form
router.get("/new",isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate("reviews")
      .populate("owner");
    if (!listing) {
      req.flash("error", "listing you requested does not exist");
      res.redirect("/listings");
    }
    
    res.render("listings/show.ejs", { listing });
  })
);

// Create Route
router.post(
  "/", validateListing,isLoggedIn,
  wrapAsync(async (req, res) => {
    const newListings = new Listing(req.body.listing);
     newListings.owner = req.user._id;
    // when new listings created by default their owner be our current user 
    await newListings.save();
   
    req.flash("success", "new listings added");
    res.redirect("/listings");
  })
);



// Edit Form Route
router.get(
  "/:id/edit",isLoggedIn,isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
     if (!listing) {
      req.flash("error", "listing you requested does not exist");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  })
);

// Update Route
router.put(
  "/:id",isLoggedIn,isOwner, validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
     req.flash("success", "listing updated");
    res.redirect(`/listings/${id}`);
  })
);

// Delete Route
router.delete(
  "/:id", isLoggedIn,isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
      await Listing.findByIdAndDelete(id);

    req.flash("success", "listing deleted");
    return res.redirect("/listings");
  })
);

module.exports = router;