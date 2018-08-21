'use strict'

class Role {
    async handle({
        auth,
        response
    }, next) {

        const user = await auth.getUser()
        const role = user.toJSON().roles
        console.log(role)
        if (role !== 'admin') {
            console.log('no permission')
            return response.send({
                code: 401,
                message: `no permission`
            })
        }

        await next()
    }
}

module.exports = Role
