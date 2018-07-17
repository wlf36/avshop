'use strict'

const Schema = use('Schema')

class ProductTagSchema extends Schema {
  up () {
    this.create('product_tags', (table) => { 
      table.integer('product_id', 11).unsigned()
      table.integer('tag_id', 11).unsigned() 
      table.timestamps()     
    })
  }

  down () {
    this.drop('product_tags')
  }
}

module.exports = ProductTagSchema
