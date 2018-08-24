'use strict'
// const KeywordService = use('App/Services/Keyword')
const axios = use('axios')

class KeywordController {
    async getKeyword({ request, response }) {

        // const { eqid } = request.all()

        const now = new Date()
        const utc_time_str = now.toISOString().replace(/\.\d+Z$/, 'Z')
        const method = "GET"
        const url = `http://referer.bj.baidubce.com/v1/eqid/${eqid}`

        const auth = KeywordService.generateAuthorization(url, method, utc_time_str)        
        
        const header = {
                'accept-encoding':'gzip, deflate',
                'host':'referer.bj.baidubce.com',
                'content-type':'application/json',
                'x-bce-date': utc_time_str,
                'authorization': auth,
                'accept':'*/*'
            }

        await axios.get(url, { headers: header })
            .then((res) => {
                console.log(res)
            })

        return response.send({
            code: 200,
            data: "keyword"
        })
    }
}

module.exports = KeywordController
