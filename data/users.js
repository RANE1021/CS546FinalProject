var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index:true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  name: {
    type: String
  }
})

var User = module.exports = mongoose.model("User", UserSchema, "users")

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(14, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash
      newUser.save(callback)
    })
  })
}

module.exports.getUserByUsername = function(username, callback){
  var query = {username: username}
  User.findOne(query, callback)
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback)
}

module.exports.getUserId = function (username, callback) {
  const query = {username: username}
  const user = User.findOne(query)
  callback(user._id)
}

module.exports.getUserAddress = function (username, callback) {
  const query = {username: username}
  const user = User.findOne(query)
  callback(user.address)
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err
    callback(null, isMatch)
  })
}