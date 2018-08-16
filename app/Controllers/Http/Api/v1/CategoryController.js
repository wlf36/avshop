'use strict'
const Category = use('App/Models/Category')

class CategoryController {  

  async getAllCategory ({ response }) {
    const category = await Category.all()    
    return response.send({
      code: 200,
      data: category
    })
  }

  async index ({ request, response }) {    
    const perpage = 10
    const page = request.input('page')  
    const category = await Category.query()            
      .orderBy('id', 'desc')
      .paginate(page, perpage)
    return response.send({
        code: 200,
        data: category
    })
  }  

  async create () {
  }

  async store ({ request, response }) {
    const { vocabulary_id, name, description, parent } = request.all()
    console.log(vocabulary_id,parent)
    const category = await Category.create({ vocabulary_id, name, description, parent }) 
    return response.send({
      code: 200,
      data: category
    })
  }

  async show ({ params, response }) {
    const id = params.id
    const category = await Category.query().where('id', id).fetch()
    return response.send({
      code: 200,
      data: category
    })
  }

  async edit () {
  }

  async update({ params, request, response }) {
    const id = params.id    
    let { name, description } = request.all() 
    await Category.query().where('id', params.id).update({ name, description })        
    return response.send({
    code: 200,
    message: 'update seccess'
    })
  }

  async destroy ({ params, response }) {
    const category = await Category.find(params.id) 
      await category.delete()    
      return response.send({
        code: 200,
        message: "delete success"
      })
  }
}

module.exports = CategoryController
