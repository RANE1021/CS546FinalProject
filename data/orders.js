var mongoose = require('mongoose')

var OrderSchema = mongoose.Schema({
  price: {
    type: Number
  },
  date: {
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