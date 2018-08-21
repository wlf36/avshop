'use strict'

const Model = use('Model')

class BannerItem extends Model {
    image() {
        return this.belongsTo('App/Models/Image', 'image_id', 'id')
    }
}

module.exports = BannerItem
