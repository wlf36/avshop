'use strict'

const Schema = use('Schema')

class VocabularySchema extends Schema {
  up () {
    this.create('vocabularies', (table) => {
      table.increments()
      table.string('name', 50).unique()
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('vocabularies')
  }
}

module.exports = VocabularySchema
