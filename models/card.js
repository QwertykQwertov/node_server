const path = require('path')
const fs = require('fs')

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'card.json')

class Card {
  static async add(course) {
    const card = await Card.getAll()
    const index = card.courses.findIndex(c => c.id === course.id)
    const candidate = card.courses[index]

    if (candidate) {
      candidate.count++
      card.courses[index] = candidate
    } else {
      course.count = 1
      card.courses.push(course)
    }

    card.total += +course.price

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), err => {
        if (err) {
          reject()
        } else {
          resolve(card)
        }
      })
    })

  }

  static async remove(id) {
    const card = await Card.getAll()
    const index = card.courses.findIndex(course => course.id === id)
    const course = card.courses[index]

    if (course.count !== 1) {
      // Удалить
      card.courses[index].count--
    } else {
      // Изменить количество
      card.courses = card.courses.filter(course => course.id !== id)
    }
    card.total -= course.price

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), err => {
        if (err) {
          reject()
        } else {
          resolve(card)
        }
      })
    })
  }

  static async getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, 'utf-8', (err, content) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(content))
        }
      })
    })
  }
}

module.exports = Card