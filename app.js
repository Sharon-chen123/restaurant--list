// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose') // 載入 mongoose
const Restaurant = require('./models/restaurant')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB


// require handlebars in the project
// setting static files for bootstrap and css
const exphbs = require('express-handlebars')
app.use(express.static('public'))

// get restaurant list in json file
const restaurantList = require('./restaurant.json')

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes setting
// index page
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results, style: 'indexStyle.css' })
})

//show page
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(item => Number(req.params.restaurant_id) === item.id)
  res.render('show', { restaurant, style: 'showStyle.css' })
})

// search function in index page
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  // filter by name and category
  const restaurant = restaurantList.results.filter(
    item => item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.toLowerCase().includes(keyword.toLocaleLowerCase())
  )
  res.render('index', { restaurant, style: 'indexStyle.css', keyword })
})



// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})