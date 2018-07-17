'use strict'
const Category = use('App/Models/Category')

class CategoryController {
  async index ({ response }) {
    const category = await Category.all()
    return response.send({
      code: 200,
      data: category
    })
  }

  async create () {
  }

  async store () {
  }

  async show () {
  }

  async edit () {
  }

  async update () {
  }

  async destroy () {
  }
}

module.exports = CategoryController
