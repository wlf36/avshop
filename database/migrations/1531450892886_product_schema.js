'use strict'

const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('title', 50).unique()
      table.string('description')
      table.text('body', 'longtext')
      table.float('price', 2)
      table.integer('stock', 11).unsigned()
      table.integer('category_id', 11).unsigned()
      table.integer('image_id', 11).unsigned() 
      table.string('status', 20)
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
