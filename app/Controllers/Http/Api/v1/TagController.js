"use strict";
const Tag = use("App/Models/Tag");
class TagController {
    async getAllTag({
        response
    }) {
        const tag = await Tag.all();
        return response.send({
            code: 200,
            data: tag
        });
    }

    async index({
        request,
        response
    }) {
        const perpage = 10;
        const page = request.input("page");
        const tags = await Tag.query()
            .orderBy("id", "desc")
            .paginate(page, perpage);
        return response.send({
            code: 200,
            data: tags
        });
    }

    async store({
        request,
        response
    }) {
        const {
            name,
            description
        } = request.all()
        console.log(name, description)
        const tag = await Tag.create({
            name,
            description
        })
        return response.send({
            code: 200,
            data: tag
        })
    }

    async show({
        params,
        response
    }) {
        const id = params.id
        const tag = await Tag.query().where('id', id).fetch()
        console.log(tag.toJSON())
        return response.send({
            code: 200,
            data: tag
        })
    }

    async update({
        params,
        request,
        response
    }) {
        const id = params.id        
        const {
            name,
            description
        } = request.all()
        console.log(name,description)
        await Tag.query().where('id', id).update({
            name,
            description
        })
        return response.send({
            code: 200,
            message: 'update seccess'
        })
    }

    async destroy({
        params,
        response
    }) {
        const tag = await Tag.find(params.id);
        await tag.delete();
        return response.send({
            code: 200,
            message: "delete success"
        });
    }
}

module.exports = TagController;
