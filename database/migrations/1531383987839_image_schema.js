'use strict'

const Schema = use('Schema')

class ImageSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.increments() 
      table.string('url', 255)
      table.string('title', 50)
      table.string('alt', 50)
      table.timestamps()
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImageSchema
