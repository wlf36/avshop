'use strict'

const Model = use('Model')

class Order extends Model {
    product() {
        return this.belongsToMany('App/Models/Product')
            .pivotTable('order_products')
    }
}

module.exports = Order
