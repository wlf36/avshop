'use strict'

const Model = use('Model')

class Banner extends Model {
    static get hidden() {
        return ['created_at', 'updated_at']
    }
    
    item() {
        return this.hasMany('App/Models/BannerItem', 'id', 'banner_id')
    }
}

module.exports = Banner
