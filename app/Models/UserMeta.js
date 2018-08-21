'use strict'

const Model = use('Model')

class UserMeta extends Model {
    static get visible() {
        return ['meta_key', 'meta_value']
    }

}

module.exports = UserMeta
