'use strict'

const Schema = use('Schema')

class UserMetaSchema extends Schema {
  up () {
    this.create('user_metas', (table) => {
      table.increments()
      table.string('meta_key', 50)
      table.string('meta_value')
      table.integer('user_id', 11).unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_metas')
  }
}

module.exports = UserMetaSchema
