//index
router.get("/", function (req, res) {
  res.render("index")
})

// Register
router.get("/register", function (req, res) {
  res.render("register")
})
// router.post("/register")

//Login
router.get("/login", function (req, res) {
  res.render("login")
})



// router.get("/:userId")
// End Users