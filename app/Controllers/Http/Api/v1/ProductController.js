'use strict'
const Product = use('App/Models/Product')

class ProductController {
  async index () {
  }

  async create () {
  }

  async store ({ request, response }) {
    const { title, description, body, price, stock, category_id, image_id, status } = request.all()
    const product = await Product.create({
      title, description, body, price, stock, category_id, image_id, status
    })
    return response.send({
      code: 200,
      data: product
    })
  }

  async show ({ params, response }) {    
    const id = params.id     
    const product = await Product.getProduct(id)
    return response.send({
      code: 200,
      data: product
    })
    
  }

  async edit () {
  }

  async update () {
  }

  async destroy () {
  }
}

module.exports = ProductController
