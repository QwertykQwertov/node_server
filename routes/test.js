const {Router} = require('express')
const Course = require('../models/course')

const router = Router()

router.get('/', async (req, res) => {
  const coursesFromDb = await Course.find({})
  res.json(coursesFromDb[0].id)
})

module.exports = router