'use strict'

/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Category = use('App/Models/Category')

class CategorySeeder {
  async run () {
    const data = [
      {
        name: '蔬菜',        
        parent: 0
      },
      {
        name: '水果',        
        parent: 0
      }
    ]

    await Category.createMany(data)
  }
}

module.exports = CategorySeeder
