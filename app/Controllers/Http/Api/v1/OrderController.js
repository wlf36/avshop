'use strict'
const OrderModel = use('App/Models/Order')
const OrderService = use('App/Services/Order')


class OrderController {
    async getOrderByUser({ auth, response }) {
        const uid = auth.user.id
        const orders = await OrderModel.query().where('user_id', uid).fetch()
        return response.send({
            code: 200,
            data: orders
        })
    }

    async index({
        request,
        response
    }) {
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

    async create() {}

    async store({
        request,
        response,
        auth
    }) {
        const {
            products,
        } = request.all()

        const user = await auth.getUser()
        const uid = user.id

        const order = await OrderService.place(uid, products)
        return response.send({
            code: 200,
            data: order
        })
    }

    async show({ params, response }) {
        const order_id = params.id
        const order = await OrderModel.query().where('id', order_id).fetch()
        return response.send({
            code: 200,
            data: order
        })

    }

    async updateOrderStatus({ auth, params, response }) {
        const uid = auth.user.id
        const id = params.id
        const _order = await OrderModel.query().where('id', id).fetch()
        const order = _order.toJSON()
        console.log(order)
        const _uid = order[0].user_id
        
        if(uid == _uid){            
            await OrderModel.query()
                .where('id', id)
                .update({
                    status: 2
                })
        }
        
    }
    

    
    

    
}

module.exports = OrderController
