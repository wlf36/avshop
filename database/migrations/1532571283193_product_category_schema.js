'use strict'

const Schema = use('Schema')

class ProductCategorySchema extends Schema {
  up () {
    this.create('product_category', (table) => {
      table.increments()
      table.integer('product_id', 11).unsigned()
      table.integer('category_id', 11).unsigned() 
      table.timestamps()
    })
  }

  down () {
    this.drop('product_category')
  }
}

module.exports = ProductCategorySchema
