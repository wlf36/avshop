'use strict'

const Schema = use('Schema')

class UserAddColumnSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.string('roles')
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn('roles')
    })
  }
}

module.exports = UserAddColumnSchema
