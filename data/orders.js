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

module.exports.getOrderByUserId = function(id, callback){
  const query = {userid: id}
  Order.findOne(query, callback)
}

module.exports.getAllOrders = function()
{
  Order.find({}, function (error, orders) {
    res.json(orders)
  })
}


