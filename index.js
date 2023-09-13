const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')

const testRoutes = require('./routes/test')

const server = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

server.engine('hbs', hbs.engine)
server.set('view engine', 'hbs')
server.set('views', 'views')

server.use(express.static(path.join(__dirname, 'public')))
server.use(express.urlencoded({ extended: true }))

server.use('/', homeRoutes)
server.use('/courses', coursesRoutes)
server.use('/card', cardRoutes)
server.use('/add', addRoutes)

server.use('/test', testRoutes)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

async function start() {
  try {
    const url = 'mongodb://localhost:27017/shop'
    await mongoose.connect(url, { useNewUrlParser: true })
  }
  catch (e) {
    console.log(e)
  }
}

start()
// mongodb+srv://qwertykqwertov:aE71FOMIdI8d8z0V@cluster0.a2wawyn.mongodb.net/?retryWrites=true&w=majority
