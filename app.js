// require packages used in the project
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose') // 載入 mongoose
const Restaurant = require('./models/restaurant')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
const port = 3000

// 引用 body-parser
const bodyParser = require('body-parser')

// setting static files for bootstrap and css
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

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// routes setting
// index page
app.get('/', (req, res) => {
  Restaurant.find() // 取出 Restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurant => res.render('index', { restaurant, style: 'indexStyle.css' })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

//show page
app.get('/restaurants/:restaurant_id/detail', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant, style: 'showStyle.css' }))
    .catch(error => console.log(error))
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

// for add restaurant page
app.get('/restaurants/new', (req, res) => {
  return res.render('new', { style: 'showStyle.css' })
})

// for show/detail page
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('Detail', { restaurant }))
    .catch(error => console.log(error))
})

//edit the page
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      res.render('Edit', { restaurant, style: 'showStyle.css' })
    })
    .catch(error => console.log(error))
})
// for delete function
app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//for add restaurant info
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const rating = req.body.rating
  const location = req.body.location
  const phone = req.body.phone
  const description = req.body.description
  const image = req.body.image
  return Restaurant.create({ name, category, rating, location, phone, description, image }) // save to database
    .then(() => res.redirect('/')) // go back to homepage 
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})