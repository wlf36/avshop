'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).unique()
      table.string('nickname', 80)
      table.string('email', 190).unique()
      table.string('openid', 190).unique()
      table.string('password', 60)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
