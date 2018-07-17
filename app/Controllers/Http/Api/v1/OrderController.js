'use strict'
const OrderModel = use('App/Models/Order')
const OrderService = use('App/Services/Order')


class OrderController {
  async getOrderByUser () {

  }

  async index ({ response }) {    
   
  }

  async create () {
  }

  async store ({ request, response, auth }) {
    const { oProducts } = request.all()
    const user = await auth.getUser()    
    const uid = user.id        
    const status = await OrderService.place(uid, oProducts)
    return response.send({
      code: 200,
      data: status
    })
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

module.exports = OrderController
