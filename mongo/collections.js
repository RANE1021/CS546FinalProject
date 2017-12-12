const dbConnection = require("./connections")

let getCollectionFn = (collection) => {
  let _col = undefined

  return () => {
    if (!_col) {
      _col = dbConnection().then(db => {
        return db.collection(collection)
      })
    }

    return _col
  }
}

module.exports = {
  users: getCollectionFn("users"),
  orders: getCollectionFn("orders"),
  products: getCollectionFn("products")
}

