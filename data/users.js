const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Order = require("../data/orders")

const UserSchema = mongoose.Schema({
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

const User = module.exports = mongoose.model("User", UserSchema, "users")

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(14, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash
      newUser.save(callback)
    })
  })
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback)
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback)
}

module.exports.getUserId = function (username, callback) {
  const query = {username: username}
  const user = User.findOne(query, callback)
  return user._id
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

module.exports.getOrders = function (username, callback) {
  const allOrders = Order.getAllOrders()
  const userID = User.getUserId(username, callback)
  const orderMap = {}

  allOrders.forEach(function (error, order) {
    if (order.userid.equals(userID)) {
      orderMap[order] = order
    }
    callback(orderMap)
  })
}