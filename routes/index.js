const express = require("express")
const router = express.Router()
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../data/users")

//index
router.get("/", function (req, res) {
  res.render("home")
})

router.get("/home", function (req, res) {
  res.render("home")
})

// Register
router.get("/register", function (req, res) {
  res.render("register")
})

router.post("/register", function (req, res) {
  const name = req.body.name
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const passwordMatch = req.body.passwordMatch

  req.checkBody("name", "Please type in a name").notEmpty()
  req.checkBody("username", "Please type in a username").notEmpty()
  req.checkBody("email", "Please type in an email").notEmpty()
  req.checkBody("email", "Please provide a valid email").isEmail()
  req.checkBody("password", "Please type in a password").notEmpty()
  req.checkBody("passwordMatch", "Passwords do not match").equals(req.body.password)

  const errorMessages = req.validationErrors()

  if (errorMessages) {
    res.render("register", {
      errors: errorMessages
    })
  } else {
    const newUser = new User({
      name: name,
      email:email,
      username: username,
      password: password
    })

    User.createUser(newUser, function(err, user){
      if(err) throw err
      console.log(user)
    })

    req.flash("success_msg", "You are registered and can now login")

    res.redirect("/login")
  }
})

//Login
router.get("/login", function (req, res) {
  res.render("login")
})

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err
      if(!user){
        return done(null, false, {message: "Unknown User"})
      }

      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err
        if(isMatch){
          return done(null, user)
        } else {
          return done(null, false, {message: "Invalid password"})
        }
      })
    })
  }))

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (error, user) {
    done(error, user)
  })
})

router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/orders",
    failureRedirect:"/login",
    failureFlash: true
  }),
  function (req, res) {
    res.redirect("/orders")
})

router.get("/logout", function (req, res) {
  req.logout()

  req.flash("success_message", "Logged out")

  res.redirect("/login")
})

router.get("/orders", function (req, res) {
  res.render("orders")
})

router.get("/cart", function (req, res) {
  res.render("cart")
})

router.get("/checkout", function (req, res) {
  res.render("checkout")
})

router.get("/thankyou", function (req, res) {
  res.render("thankyou")
})

module.exports = router