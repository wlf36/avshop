'use strict'

const Model = use('Model')

class Category extends Model {
    image() {
        return this.belongsTo('App/Models/Image', 'image_id', 'id')
    }
}

module.exports = Category
