'use strict'

const Schema = use('Schema')

class BannerItemSchema extends Schema {
  up () {
    this.create('banner_items', (table) => {
      table.increments()
      table.integer('image_id', 11).unsigned()      
      table.integer('banner_id', 11).unsigned()
      table.string('title', 50)
      table.string('url', 255).notNullable()  
      table.string('status', 20)  
      table.timestamps()
    })
  }

  down () {
    this.drop('banner_items')
  }
}

module.exports = BannerItemSchema
