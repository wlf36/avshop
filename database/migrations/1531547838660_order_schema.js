'use strict'

const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.string('order_no', 20).unique()
      table.integer('user_id', 11).unsigned()
      table.float('total_price')
      table.integer('status', 4) 
      table.string('snap_img')
      table.string('snap_name', 50)  
      table.integer('total_count', 11)  
      table.text('snap_items') 
      table.string('snap_address')
      table.string('prepay_id', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
