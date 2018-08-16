'use strict'

const Schema = use('Schema')

class CategoryAddColumnSchema extends Schema {
  up () {
    this.table('categories', (table) => {
      // alter table
      table.integer('vocabulary_id', 11).unsigned()
    })
  }

  down () {
    this.table('categories', (table) => {
      // reverse alternations
      table.dropColumn('vocabulary_id')
    })
  }
}

module.exports = CategoryAddColumnSchema
