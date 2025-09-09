const Listing = require("../models/listing");
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}
  
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author"
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "listing you requested does not exist");
    res.redirect("/listings");
  }
    
  res.render("listings/show.ejs", { listing });
};
module.exports.createListing = async (req, res) => {
  const newListings = new Listing(req.body.listing);
  newListings.owner = req.user._id;
  let url = req.file.path;
  let filename = req.file.filename;
  newListings.image = { url, filename };
  console.log(url,"...",filename);
  await newListings.save();
   // when new listings created by default their owner be our current user 
   
  req.flash("success", "new listings added");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "listing you requested does not exist");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listings = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;
    listings.image = { url, filename };
    await listings.save();
  }
  req.flash("success", "listing updated");
  res.redirect(`/listings/${id}`);
};
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);

  req.flash("success", "listing deleted");
  return res.redirect("/listings");
};