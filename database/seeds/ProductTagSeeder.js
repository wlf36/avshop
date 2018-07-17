'use strict'

/*
|--------------------------------------------------------------------------
| ProductTagSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const ProductTag = use('App/Models/ProductTag')

class ProductTagSeeder {
  async run () {
    const data = [
      {
        product_id: 1,
        tag_id: 1,
      },
      {
        product_id: 1,
        tag_id: 2,
      },
      {
        product_id: 2,
        tag_id: 1,
      },
      {
        product_id: 2,
        tag_id: 2,
      }
    ]

    await ProductTag.createMany(data)
  }
}

module.exports = ProductTagSeeder
