'use strict'

const Model = use('Model')

class Product extends Model {
    image() {
        return this.belongsTo('App/Models/Image', 'image_id', 'id')
    }
    meta() {
        return this.hasMany('App/Models/ProductMeta', 'id', 'product_id')
    }

    category() {
        return this.belongsToMany('App/Models/Category')
            .pivotTable('product_categories')
    }

    tag() {
        return this.belongsToMany('App/Models/Tag')
            .pivotTable('product_tags')
    }

    static async getProduct(id) {
        return await Product.query()
            .where('id', id)
            .with('image')
            .with('meta')
            .with('category')
            .with('tag')
            .fetch()
    }

}

module.exports = Product
