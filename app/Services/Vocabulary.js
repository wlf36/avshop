'use strict'

class VocabularyService { 

  getCategory (data, parent=0) {
    let category = []
    for(let i=0; i<data.length; i++) {
      if(data[i].parent == parent) { 
        category.push(data[i])
      }   
    }    
    this.demo(category, data)
    return category
  }

  demo (category, data) {
    for(let i=0; i<category.length; i++) {
      category[i].children = []
      for(let j=0; j<data.length; j++) {
        if(data[j].parent == category[i].id ) {
          category[i].children.push(data[j]) 
        }
      }
      this.demo(category[i].children, data)      
    }
  }

}

module.exports = new VocabularyService()