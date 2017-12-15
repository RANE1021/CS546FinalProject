const express = require("express")
const router = express.Router()
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const customer = require("../data")

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

  req.checkBody('name', "Please type in a name").notEmpty()
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
    const registerUser = {
      username: username,
      name: name,
      email: email,
      password: password
    }

    customer.createNewUser(registerUser, function (error, newUser) {
      if (error) throw error
      console.log(newUser)
    })

    req.flash("success_message", "YAY")

    res.redirect("/login")
  }
})

//Login
router.get("/login", function (req, res) {
  res.render("login")
})

passport.use(new LocalStrategy(
  function (username, password, done) {
    customer.getUserByUsername(username, function (error, user) {
      if (error) throw error
      if (!user)
        return done(null, false, {message: "User Not Found"})

      customer.passwordMatch(password, customer.password, function (error, match) {
        if (error) throw error
        if (match)
          return done(null, user)
        else
          return done(null, false, {message: "Invalid password"})
      })
    })
  }
))

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  customer.getUserById(id, function (error, user) {
    done(error, user)
  })
})

router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect:"/login",
    failureFlash: true
  }),
  function (req, res) {
    res.redirect("/")
})

router.get("/orders", function (req, res) {
  res.render("orders")
})



// router.get("/:userId")
  // End Users


module.exports = router