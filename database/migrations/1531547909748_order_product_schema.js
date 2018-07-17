'use strict'

const Schema = use('Schema')

class OrderProductSchema extends Schema {
  up () {
    this.create('order_products', (table) => {
      table.integer('order_id', 11).unsigned()
      table.integer('product_id', 11).unsigned()
      table.integer('count', 11).unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('order_products')
  }
}

module.exports = OrderProductSchema
