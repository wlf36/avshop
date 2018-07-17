'use strict'

/*
|--------------------------------------------------------------------------
| ProductMetaSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const ProductMeta = use('App/Models/ProductMeta')

class ProductMetaSeeder {
  async run () {
    const data = [
      {
        meta_key: '商品名称',
        meta_value: '西兰花',
        product_id: 1
      },
      {
        meta_key: '商品编号',
        meta_value: '3685163',
        product_id: 1
      },
      {
        meta_key: '商品毛重',
        meta_value: '300.00g',
        product_id: 1
      },
      {
        meta_key: '商品产地',
        meta_value: '北京',
        product_id: 1
      },
      {
        meta_key: '重量',
        meta_value: '500g以下',
        product_id: 1
      }
    ]

    await ProductMeta.createMany(data)
  }
}

module.exports = ProductMetaSeeder
