'use strict'

/*
|--------------------------------------------------------------------------
| BannerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Banner = use('App/Models/Banner')

class BannerSeeder {
  async run () {
    const data = [
      {
        name: 'home',
        description: '首页轮播图',
        status: 'publish'
      }
    ]

    await Banner.createMany(data)
  }
}

module.exports = BannerSeeder
