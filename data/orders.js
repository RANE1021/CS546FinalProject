const mongoose = require('mongoose')

var OrderSchema = mongoose.Schema({
  price: {
    type: Number
  },
  userid: {
    type: String
  },
  paymentType: {
    type: String
  },
  product: {
    type: String
  },
  quantity: {
    type: String
  }
})

var Order = module.exports = mongoose.model("Order", OrderSchema, "orders")

module.exports.createOrder = function(newOrder, callback){
      newOrder.save(callback)
}

