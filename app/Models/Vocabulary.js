'use strict'

const Model = use('Model')

class Vocabulary extends Model {
    static get hidden() {
        return ['created_at', 'updated_at']
    }
    
    category() {
        return this.hasMany('App/Models/Category')
    }

}

module.exports = Vocabulary
