const { v4 } = require('uuid')
const fs = require('fs')
const path = require('path')

const pathFile = path.join(__dirname, '../', 'data', 'courses.json')

class Course {
  constructor(title, price, url) {
    this.title = title
    this.price = price
    this.url = url
    this.id = v4()
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      url: this.url,
      id: this.id
    }
  }

  async save() {
    const courses = await Course.getAll()
    courses.push(this.toJSON())

    return new Promise((resolve, reject) => {
      fs.writeFile(pathFile, JSON.stringify(courses), (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })

    })

  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(pathFile, 'utf-8', (err, content) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(content))
        }
      }
      )

    }

    )
  }

  static async getById(id) {
    const courses = await Course.getAll()
    return courses.find(course => course.id === id)
  }
}


module.exports = Course