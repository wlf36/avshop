'use strict'
const OrderModel = use('App/Models/Order')
const OrderService = use('App/Services/Order')


class OrderController {
  async getOrderByUser () {

  }

  async index ({ request, response }) {  
    const perpage = 10
    const page = request.input('page')  
    const orders = await OrderModel.query()  
      .with('product')          
      .orderBy('id', 'desc')
      .paginate(page, perpage)
    return response.send({
        code: 200,
        data: orders
    })
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
