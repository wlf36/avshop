'use strict'

const Schema = use('Schema')

class BannerSchema extends Schema {
  up () {
    this.create('banners', (table) => {
      table.increments()
      table.string('name', 50).unique()
      table.string('description', 255)
      table.string('status', 20) 
      table.timestamps()
    })
  }

  down () {
    this.drop('banners')
  }
}

module.exports = BannerSchema
