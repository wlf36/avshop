"use strict";
const Product = use("App/Models/Product");
const ProductCategory = use("App/Models/ProductCategory");
const ProductTag = use("App/Models/ProductTag");
const ProductMeta = use("App/Models/ProductMeta");
const Category = use("App/Models/Category");
const Tag = use("App/Models/Tag");

class ProductController {
    async index({
        request,
        response
    }) {
        const perpage = 10;
        const page = request.input("page");
        const products = await Product.query()
            .with("category")
            .with("tag")
            .orderBy("id", "desc")
            .paginate(page, perpage);
        return response.send({
            code: 200,
            data: products
        });
    }

    async create() {}

    async store({
        request,
        response
    }) {
        const {
            title,
            description,
            body,
            image_id,
            price,
            stock,
            status,
            category,
            tag,
            meta
        } = request.all();
        // console.log(title, meta)

        //product
        const product = await Product.create({
            title,
            description,
            body,
            image_id,
            price,
            stock,
            status
        });
        const product_id = product.toJSON().id;
        // console.log(product_id)

        //category
        let category_data = [];
        category.map(item => {
            category_data.push({
                product_id: product_id,
                category_id: item //item为字符串
            });
        });
        await ProductCategory.createMany(category_data);

        //tag
        let tag_data = [];
        tag.map(item => {
            tag_data.push({
                product_id: product_id,
                tag_id: item //item为字符串
            });
        });
        await ProductTag.createMany(tag_data);

        //meta
        let p_meta = [];
        meta.map(item => {
            p_meta.push({
                ...item,
                product_id: product_id
            });
        });
        await ProductMeta.createMany(p_meta);

        return response.send({
            code: 200,
            message: "product create success"
        });
    }

    async show({
        params,
        response
    }) {
        const id = params.id;
        const product = await Product.getProduct(id);
        // console.log(product.toJSON())
        return response.send({
            code: 200,
            data: product
        });
    }

    async edit() {}

    async update({
        params,
        request,
        response
    }) {
        const product_id = params.id;
        const {
            title,
            description,
            body,
            image_id,
            price,
            stock,
            status,
            category,
            tag,
            meta
        } = request.all();

        //product
        await Product.query()
            .where("id", product_id)
            .update({
                title,
                description,
                body,
                image_id,
                price,
                stock,
                status
            });

        //category
        const category_data = [];
        category.map(item => {
            if (typeof item !== "string") {
                category_data.push({
                    product_id: product_id,
                    category_id: item
                });
            }
        });
        console.log(category_data, "category_data");
        await ProductCategory.createMany(category_data);

        //tag
        let tag_data = [];
        tag.map(item => {
            tag_data.push({
                product_id: product_id,
                tag_id: item //item为字符串
            });
        });
        console.log(tag_data, "tag_data");
        await ProductTag.createMany(tag_data);

        //meta
        await ProductMeta.query()
            .where("product_id", product_id)
            .delete();
        let p_meta = [];
        meta.map(item => {
            p_meta.push({
                ...item,
                product_id: product_id
            });
        });
        await ProductMeta.createMany(p_meta);

        return response.send({
            code: 200,
            message: "update seccess"
        });
    }

    async destroy({
        params,
        response
    }) {
        const product = await Product.find(params.id);
        await product.delete();
        return response.send({
            code: 200,
            message: "delete success"
        });
    }

    async removeCat({
        params,
        request,
        response
    }) {
        const {
            category
        } = request.all();
        const product_id = params.id;
        const _category = await Category.query()
            .where("name", category)
            .fetch();
        const category_id = _category.toJSON()[0].id;
        await ProductCategory.query()
            .where("category_id", category_id)
            .where("product_id", product_id)
            .delete();
        return response.send({
            code: 200,
            message: "category delete success"
        });
    }

    async removeTag({
        params,
        request,
        response
    }) {
        const {
            tag
        } = request.all();
        const product_id = params.id;
        const _tag = await Tag.query()
            .where("name", tag)
            .fetch();
        const tag_id = _tag.toJSON()[0].id;
        await ProductTag.query()
            .where("tag_id", tag_id)
            .where("product_id", product_id)
            .delete();
        return response.send({
            code: 200,
            message: "tag delete success"
        });
    }
}

module.exports = ProductController;
