'use strict'

/*
|--------------------------------------------------------------------------
| BannerItemSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const BannerItem = use('App/Models/BannerItem')

class BannerItemSeeder {
  async run () {
    const data = [
      {
        image_id: 1,
        banner_id: 1,
        title: 'banner01',
        url: '',
        status: 'publish'
      },
      {
        image_id: 2,
        banner_id: 1,
        title: 'banner02',
        url: '',
        status: 'publish'
      },
      {
        image_id: 3,
        banner_id: 1,
        title: 'banner03',
        url: '',
        status: 'publish'
      }
    ]

    await BannerItem.createMany(data)
  }
}

module.exports = BannerItemSeeder
