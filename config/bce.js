'use strict'

const Env = use('Env')

module.exports = {    
    ak: Env.get('BCE_AK'),
    sk: Env.get('BCE_SK')
}