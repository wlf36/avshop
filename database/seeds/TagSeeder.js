'use strict'

/*
|--------------------------------------------------------------------------
| TagSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Tag = use('App/Models/Tag')

class TagSeeder {
  async run () {
    const data = [
      {
        name: 'hot',
        description: '热卖'
      },
      {
        name: 'recommend',
        description: '推荐'
      },
      {
        name: 'new',
        description: '新品'
      },
    ]

    await Tag.createMany(data)
  }
}

module.exports = TagSeeder
