"use strict";
const Helpers = use("Helpers");
const Image = use("App/Models/Image");
const uniqid = use("uniqid");

class ImageController {
    async index() {}

    async create() {}

    async store({ request, response }) {
        const file = request.file("file", {
            types: ["image"],
            size: "2mb"
        });

        const fileName = uniqid("img_") + "." + file.subtype;

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const path = `uploads/${year}/${month}`;
        const url = `/uploads/${year}/${month}/${fileName}`;

        await file.move(Helpers.publicPath(path), {
            name: fileName
        });

        if (!file.moved()) {
            return response.send({
                code: 500,
                error: "image upload error"
            });
        }

        const image = await Image.create({
            url
        });

        return response.send({
            code: 200,
            message: "image upload success",
            data: {
                id: image.id
            }
        });
    }

    async show() {}

    async edit() {}

    async update() {}

    async destroy({ params, response }) {
        const image = await Image.find(params.id);
        console.log(params.id);
        await image.delete();
        return response.send({
            data: 200,
            message: "image delete success"
        });
    }
}

module.exports = ImageController;
