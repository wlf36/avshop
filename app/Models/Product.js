'use strict'

const Model = use('Model')

class Product extends Model {
    image () {
        return this.belongsTo('App/Models/Image', 'image_id', 'id')
    }
    meta () {
        return this.hasMany('App/Models/ProductMeta', 'id', 'product_id')
    }  
    
    static async getProduct (id) {
      return await Product.query()
        .where('id', id)
        .where('status', 'publish')
        .with('image')
        .with('meta')
        .fetch()
    }

}

module.exports = Product
