'use strict'

const Model = use('Model')

class Banner extends Model {
    item() {
        return this.hasMany('App/Models/BannerItem', 'id', 'banner_id')
    }
}

module.exports = Banner
