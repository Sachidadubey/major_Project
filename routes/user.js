const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup", (req, res) => {
  res.render("./users/signup.ejs")
});
router.post("/signup", wrapAsync(async(req, res) => {
  try{let { username, Email, password } = req.body;
  const newUser = new user({ Email, username });
  const registeredUser = await user.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "welcome to wanderlust page");
      res.redirect("/listings");
    });
  
  } catch (err) {
    req.flash("error", err.message)
    res.redirect("/signup");
    
  }
  
}));
router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});


router.post("/login",saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }),
  async (req, res) => {
    req.flash("success", "welcome to wanderlust");
    //if we r trying to log in to the index page then res.locals will be undefined so this----
    // if (res.locals.redirectUrl === undefined)
    // {
    // return  res.redirect("/listings")
    // }
    // res.redirect(res.locals.redirectUrl);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
     return  next(err);
    }
    req.flash("success", "you are logged out");
    res.redirect("/listings");
  });
});
module.exports = router;