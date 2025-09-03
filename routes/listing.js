const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn,validateListing } = require("../middleware.js");
const { isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");





 


// Index Route
router.get("/", wrapAsync(listingController.index));
// wrapAsync--- asyncronous error handling 

// New Listing Form
router.get("/new",isLoggedIn,listingController.renderNewForm );

// Show Route
router.get(
  "/:id",
  wrapAsync(listingController.showListing)
);

// Create Route
router.post(
  "/", validateListing,isLoggedIn,
  wrapAsync(listingController.createListing)
);



// Edit Form Route
router.get(
  "/:id/edit",isLoggedIn,isOwner,
  wrapAsync(listingController.renderEditForm)
);

// Update Route
router.put(
  "/:id",isLoggedIn,isOwner, validateListing,
  wrapAsync(listingController.updateListing)
);

// Delete Route
router.delete(
  "/:id", isLoggedIn,isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;