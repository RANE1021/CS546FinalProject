const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const handlebar = require("express-handlebars")
const validator = require("express-validator")
const flash = require("connect-flash")
const session = require("express-session")
const passport = require("passport")
const routes = require("./routes")
const public = express.static("public")
const db = require("mongodb")
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/eccomerce", {useMongoClient: true})

const app = express()
app.set("views", path.join(__dirname, "views"))
app.engine("handlebars", handlebar({defaultLayout:"main"}))
app.set("view engine", "handlebars")

app.use("/static", public)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express(path.join(__dirname, "public")))

app.use(session({
  secret: "electronics",
  saveUninitialized: true,
  resave: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(validator({
  errorFormatter: function (parameter, message, value) {
    var namespace = parameter.split("."),
      root = namespace.shift(),
      formParameter = root

    while(namespace.length) {
      formParameter += "[" + namespace.shift() + "]"
    }
    return {
      parameter: formParameter,
      message: message,
      value: value
    }
  }
}))

app.use(flash())

app.use(function (req, res, next) {
  res.locals.success_message = req.flash("success_message")
  res.locals.error_message = req.flash("error_message")
  res.locals.error = req.flash("error")
  res.locals.user = req.user || null
  next()
})

app.use("/", routes)

app.listen(3000, () => {
  console.log("We've now got a server!")
  console.log("listening on: http://localhost:3000")
})


