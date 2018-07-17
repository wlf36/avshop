'use strict'
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const Hash = use('Hash')

class UserController {    

    async getToken ({ request, auth, response }) {

        const { username, password } = request.all()        
        const token = await auth.withRefreshToken().attempt(username, password) 
        console.log(token)        
        return {
            code: 200, 
            data: token
        }         
    }

    async getUserInfo ({ auth }) {        
        //通过token得到用户
        const _user = await auth.getUser()
        let user = _user.toJSON()        
        user.roles = user.roles.split(",")
        return {
            code: 200,
            data: user
        }                 
    }

    async logout ({ auth, response }) {        
        const refreshToken = await auth.listTokens()
        console.log(refreshToken)
        await auth
        .authenticator('jwt')
        .revokeTokens([refreshToken], true)
        return {
            code: 200
        }
    }

    async updatePassword ({request, response,auth }) {        
        const { oldPassword, newPassword, newPasswordConfirm } = request.all()               
               
        if(newPassword !== newPasswordConfirm || oldPassword == newPassword){
            return response.send({
                code: 200,
                message: 'newPassword is wrong',
                type: 'error'
            })
        }

        const isSame = await Hash.verify(oldPassword, auth.user.password) 
        if(!isSame){        
            return response.send({
                code: 200,
                message: 'oldPassword is wrong',
                type: 'error'
            })
        }

        const password = await Hash.make(newPassword)
        console.log(password, auth.user.id)
        await User.query().where('id', auth.user.id).update({'password': password})
        return response.send({
            code: 200,
            message: 'password updated success',
            type: 'success'
        })
    }
}

module.exports = UserController

