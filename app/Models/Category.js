'use strict'

const Model = use('Model')

class Category extends Model {

    static get hidden() {
        return ['created_at', 'updated_at']
    }

    image() {
        return this.belongsTo('App/Models/Image', 'image_id', 'id')
    }
    
    product() {
        return this.belongsToMany('App/Models/Product')
            .pivotTable('product_categories')
    }
}

module.exports = Category
