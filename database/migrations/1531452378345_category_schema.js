'use strict'

const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments()
      table.string('name', 50).unique()
      table.string('description')
      table.integer('parent', 11).unsigned()
      table.integer('image_id', 11).unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
