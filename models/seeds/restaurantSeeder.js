const mongoose = require('mongoose')
const Restaurant = require('../todo') 
const RestaurantList = require('../../restaurant.json') // JSON file
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})