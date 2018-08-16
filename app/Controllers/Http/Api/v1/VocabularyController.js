'use strict'
const Vocabulary = use('App/Models/Vocabulary')
const VocabularyService = use('App/Services/Vocabulary')

class VocabularyController {
  async index ({ request, response }) {    
    const perpage = 10
    const page = request.input('page')  
    const vocabulary = await Vocabulary.query()            
      .orderBy('id', 'desc')
      .paginate(page, perpage)
    return response.send({
        code: 200,
        data: vocabulary
    })
  }

  async create () {
  }

  async store ({ request, response }) {
    const { name, description } = request.all()
    const vocabulary = await Vocabulary.create({ name, description })
    return response.send({
      code: 200,
      data: vocabulary
    })
  }

  async show ({ params, response }) {
    const id = params.id
    const _vocabulary = await Vocabulary.query()
      .where('id', id)
      .with('category')
      .fetch()

    let vocabulary = _vocabulary.toJSON()[0]       
    vocabulary.category = VocabularyService.getCategory(vocabulary.category)
    console.log(vocabulary.category)
    return response.send({
      code: 200,
      data: vocabulary
    })

  }

  async edit () {
  }

  async update({ params, request, response }) {
    const id = params.id    
    let { name, description } = request.all() 
    await Vocabulary.query().where('id', params.id).update({ name, description })        
    return response.send({
    code: 200,
    message: 'update seccess'
    })
  }

  async destroy ({ params, response }) {
      
      const vocabulary = await Vocabulary.find(params.id) 
      await vocabulary.delete()    
      return response.send({
        code: 200,
        message: "delete success"
      })
      
  }

}

module.exports = VocabularyController
