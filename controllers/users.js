const user = require("../models/user");

module.exports.renderSignupForm = async (req, res) => {
  try {
    let { username, Email, password } = req.body;
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
  
};
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
  req.flash("success", "welcome to wanderlust");
  // if we r trying to log in to the index page then res.locals will be undefined so this----
  // console.log(res.locals.redirectUrl);
  // if (res.locals.redirectUrl === undefined)
  // {
  //   return  res.redirect("/listings")
    
  // }
  // res.redirect(res.locals.redirectUrl);
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};
  module.exports.logout = (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "you are logged out");
      res.redirect("/listings");
    });
  };