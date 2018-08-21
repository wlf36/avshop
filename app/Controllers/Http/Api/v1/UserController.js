'use strict'
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const Hash = use('Hash')
const UserMeta = use('App/Models/UserMeta')

class UserController {

    async createAddress({
        request,
        auth
    }) {
        const user = await auth.getUser()
        const uid = user.id
        const {
            userName,
            postalCode,
            provinceName,
            cityName,
            countyName,
            detailInfo,
            telNumber
        } = request.all()
        const data = [{
                user_id: uid,
                meta_key: "userName",
                meta_value: userName
            },
            {
                user_id: uid,
                meta_key: "postalCode",
                meta_value: postalCode
            },
            {
                user_id: uid,
                meta_key: "provinceName",
                meta_value: provinceName
            },
            {
                user_id: uid,
                meta_key: "cityName",
                meta_value: cityName
            },
            {
                user_id: uid,
                meta_key: "countyName",
                meta_value: countyName
            },
            {
                user_id: uid,
                meta_key: "detailInfo",
                meta_value: detailInfo
            },
            {
                user_id: uid,
                meta_key: "telNumber",
                meta_value: telNumber
            }
        ]
        await UserMeta.createMany(data)
    }

    async getAddress({
        auth
    }) {
        const user = await auth.getUser()
        const uid = user.id
        const _userMeta = await UserMeta.query().where('user_id', uid).fetch()
        const userMeta = _userMeta.toJSON()
        let address = {}
        userMeta.map((item) => {
            address[item.meta_key] = item.meta_value
        })
        return address
    }

    async getToken({
        request,
        auth,
        response
    }) {

        const {
            username,
            password
        } = request.all()
        const token = await auth.withRefreshToken().attempt(username, password)
        // console.log(token)        
        return {
            code: 200,
            data: token
        }
    }

    async getUserInfo({
        auth
    }) {
        const _user = await auth.getUser()
        let user = _user.toJSON()
        user.roles = user.roles.split(",")
        return {
            code: 200,
            data: user
        }
    }

    async logout({
        auth,
        response
    }) {
        const refreshToken = await auth.listTokens()
        console.log(refreshToken)
        await auth
            .authenticator('jwt')
            .revokeTokens([refreshToken], true)
        return {
            code: 200
        }
    }

    async updatePassword({
        request,
        response,
        auth
    }) {
        const {
            oldPassword,
            newPassword,
            newPasswordConfirm
        } = request.all()

        if (newPassword !== newPasswordConfirm || oldPassword == newPassword) {
            return response.send({
                code: 200,
                message: 'newPassword is wrong',
                type: 'error'
            })
        }

        const isSame = await Hash.verify(oldPassword, auth.user.password)
        if (!isSame) {
            return response.send({
                code: 200,
                message: 'oldPassword is wrong',
                type: 'error'
            })
        }

        const password = await Hash.make(newPassword)
        console.log(password, auth.user.id)
        await User.query().where('id', auth.user.id).update({
            'password': password
        })
        return response.send({
            code: 200,
            message: 'password updated success',
            type: 'success'
        })
    }

    async getUser({
        request,
        response
    }) {
        const perpage = 10
        const page = request.input('page')
        const users = await User.query()
            .orderBy('id', 'desc')
            .paginate(page, perpage)

        return response.send({
            code: 200,
            data: users
        })
    }

}

module.exports = UserController
