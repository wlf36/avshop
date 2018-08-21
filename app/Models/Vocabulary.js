'use strict'

const Model = use('Model')

class Vocabulary extends Model {
    category() {
        return this.hasMany('App/Models/Category')
    }

}

module.exports = Vocabulary
