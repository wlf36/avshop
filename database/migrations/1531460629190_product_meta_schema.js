'use strict'

const Schema = use('Schema')

class ProductMetaSchema extends Schema {
  up () {
    this.create('product_metas', (table) => {
      table.increments()
      table.string('meta_key', 50)
      table.string('meta_value')
      table.integer('product_id', 11).unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('product_metas')
  }
}

module.exports = ProductMetaSchema
