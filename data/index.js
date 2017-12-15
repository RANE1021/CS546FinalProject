const bcrypt = require("bcryptjs")
const id = require("uuid/v4")
const db = require("../mongo/collections")
const userDB = db.users
const productsData = require("./products");

const exportedMethods = {
  products: productsData,

  async createNewUser(username, name, password, email) {
    const userCollection = await userDB()

    const hashedPassword = await hashPassword(password)

    const newUser = {
      username: username,
      id: id(),
      name: name,
      password: hashedPassword,
      email: email,
      orders: []
    }

    return await userCollection.insertOne(newUser)
  },

  async getAllUsers() {
    const userCollection = await userDB()

    return await userCollection.find({}, {id: 1, username: 1}).toArray()
  },

  async getUserId(username) {
    const userCollection = await userDB()

    const user = await userCollection.findOne({username: username})

    return await user.id()
  },

  async getUserById(id) {
    const userCollection = await userDB()

    return user = await userCollection.findById(id)
  },

  async getUserByUsername(username) {
    const userCollection = await userDB()

    const user = await userCollection.findOne({username: username})

    return user
  },

  async passwordMatch(typedPassword, hash, callback) {
    let compare = false

    try {
      compare = bcrypt.compare(typedPassword, hash, function (error, match) {
        if (error) throw error
        callback(null, match)
      })
    } catch (e) {

    }

  }
}

async function hashPassword(password) {
  const typedPassword = password

  return hashed = await bcrypt.hash(typedPassword, 14)
}

module.exports = exportedMethods