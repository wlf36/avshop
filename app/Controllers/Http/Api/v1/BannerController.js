'use strict'
const Banner = use('App/Models/Banner')
const BannerItem = use('App/Models/BannerItem')
const Image = use('App/Models/Image')

class BannerController {
  async index () {
  }

  async create () {
  }

  async store () {
  }

  async show ({ params, response }) {
    const id = params.id
    const banner = await Banner.query()
      .where('id', id)
      .where('status', 'publish')      
      .with('item', (builder) => {
        builder.where('status', 'publish').with('image')
      }) 
      .fetch()

    return response.send({
      code: 200,
      data: banner
    })
  }

  async edit () {
  }

  async update () {
  }

  async destroy () {
  }
}

module.exports = BannerController