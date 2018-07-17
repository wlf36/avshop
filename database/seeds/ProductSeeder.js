'use strict'

/*
|--------------------------------------------------------------------------
| ProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Product = use('App/Models/Product')

class ProductSeeder {
  async run () {
    const data = [
      {
        title: '西兰花',        
        price: 0.01,        
        category_id: 1,        
        status: 'publish'
      },
      {
        title: '猕猴桃',        
        price: 0.01,        
        category_id: 2,        
        status: 'publish'
      }
    ]

    await Product.createMany(data)
  }
}

module.exports = ProductSeeder
