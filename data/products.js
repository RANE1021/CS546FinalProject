var mongoose = require('mongoose');

var inventory = require("../data/inventory.json")

var ProductSchema = mongoose.Schema({
    image: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    colors: [
        {type: String}
    ],
    specifications: {
        dimensions: {type: String},
        weight: {type: String},
        power: {type: String},
        inputVoltage: {type: String}
    },
    reviews: [
        {
            id: {type: String},
            userName: {type: String},
            review: {type: String}
        }
    ]
});

var Product = module.exports = mongoose.model("Product", ProductSchema, "products");

module.exports.initInventory = function(callback){   
    Product.remove( function() {
        Product.insertMany(inventory, function(err,result) {
            if (err) {
                //console.log("\nFailed to initialize products collection! \n", err)
            } else {
                //console.log("\nInventory spawned!:\n")
            }
        });
    }) 
}

module.exports.searchProductByTitle = function(title, callback){
    var query = {title: title};
    Product.findOne(query, callback);
}
  
module.exports.getProductById = function(id, callback){
    var query = {_id: id}
    console.log("\nInside getProductById. Searching for id: ", id);
    Product.findOne(query, callback);
}

module.exports.getAllProducts = function(callback){
    Product.find(callback);
}