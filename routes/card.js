const { Router } = require('express')
const Course = require('../models/course')
const Card = require('../models/card')
const { route } = require('./home')
const router = Router()

router.post('/add', async (req, res) => {
  const course = await Course.getById(req.body.id)
  await Card.add(course)

  res.redirect('/card')
})

router.delete('/remove/:id', async (req, res) => {
  const card = await Card.remove(req.params.id)
  res.status(200).json(card)
})

router.get('/', async (req, res) => {
  const card = await Card.getAll()

  res.render('card', {
    title: 'Корзина',
    isCard: true,
    courses: card.courses,
    total: card.total
  })
})

module.exports = router