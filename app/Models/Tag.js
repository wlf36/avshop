'use strict'

const Model = use('Model')

class Tag extends Model {
    static get hidden() {
        return ['created_at', 'updated_at']
    }
    
    product() {
        return this.belongsToMany('App/Models/Product')
            .pivotTable('product_tags')
    }
}

module.exports = Tag
