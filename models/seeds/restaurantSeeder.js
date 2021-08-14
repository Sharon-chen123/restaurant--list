const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const RestaurantList = require('../../restaurant.json') // JSON file
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  RestaurantList.results.forEach(restaurant => {
    Restaurant.create({
      name: restaurant.name,
      category: restaurant.category,
      rating: restaurant.rating,
      location: restaurant.location,
      phone: restaurant.phone,
      description: restaurant.description,
      image: restaurant.image,
    })
  })
})