const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')

const testRoutes = require('./routes/test')

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'  
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/add', addRoutes)

app.use('/test', testRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})

async function start() {
  try {
    const url = `mongodb+srv://qwertykqwertov:ghjcnjnfr3@cluster0.a2wawyn.mongodb.net/shop?retryWrites=true&w=majority`
    // const url = `mongodb+srv://vladilen:0I5GEL9uLUcR38GC@cluster0-3rrau.mongodb.net/shop`
    await mongoose.connect(url, { useNewUrlParser: true })
  }
  catch (e) {
    console.log(e)
  }
}

start()
