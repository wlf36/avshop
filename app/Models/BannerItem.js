'use strict'

const Model = use('Model')

class BannerItem extends Model {
    static get hidden() {
        return ['created_at', 'updated_at']
    }
    
    image() {
        return this.belongsTo('App/Models/Image', 'image_id', 'id')
    }
}

module.exports = BannerItem
