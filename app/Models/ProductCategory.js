'use strict'

const Model = use('Model')

class ProductCategory extends Model {
  category () {
    return this.belongsTo('App/Models/Category')
  }
}

module.exports = ProductCategory
