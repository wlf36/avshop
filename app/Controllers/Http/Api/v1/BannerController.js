"use strict";
const Banner = use("App/Models/Banner");
const BannerItem = use("App/Models/BannerItem");

class BannerController {
    async index({
        response
    }) {
        const banner = await Banner.all();
        return response.send({
            code: 200,
            data: banner
        });
    }

    async store({
        request,
        response
    }) {
        const {
            name,
            description,
            status
        } = request.all();
        const banner = await Banner.create({
            name,
            description,
            status
        });
        return response.send({
            code: 200,
            data: banner
        });
    }

    //show banner items and image by banner id 
    async show({
        params,
        response
    }) {
        const id = params.id;
        const banner = await Banner.query()
            .where("id", id)
            .where("status", "publish")
            .with("item", builder => {
                builder.where("status", "publish").with("image");
            })
            .fetch();

        return response.send({
            code: 200,
            data: banner
        });
    }

    async update({
        params,
        request,
        response
    }) {
        const id = params.id
        let {
            name,
            description
        } = request.all()
        await Banner.query().where('id', id).update({
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
        const banner = await Banner.find(params.id)
        await banner.delete()
        return response.send({
            code: 200,
            message: "delete success"
        })
    }

    async addBannerItem({
        request,
        response
    }) {
        const {
            image_id,
            banner_id,
            title,
            description,
            url_id,
            url_type,
            status
        } = request.all()
        const bannerItem = await BannerItem.create({
            image_id,
            banner_id,
            title,
            description,
            url_id,
            url_type,
            status
        })
        return response.send({
            code: 200,
            data: bannerItem
        })
    }

    async fetchBannerItems({
        params,
        response
    }) {
        const id = params.id
        const bannerItems = await BannerItem.query().where('banner_id', id).fetch()
        return response.send({
            code: 200,
            data: bannerItems
        })
    }

    async fetchBannerItem({
        params,
        response
    }) {
        const id = params.id
        const bannerItem = await BannerItem.query().where('id', id).with('image').fetch()
        return response.send({
            code: 200,
            data: bannerItem
        })
    }

    async updateBannerItem({
        params,
        request,
        response
    }) {        
        const id = params.id        
        let {
            image_id,
            banner_id,
            title,
            description,
            url_id,
            url_type,
            status
        } = request.all()
        console.log('image_id:', image_id)
        await BannerItem.query().where('id', id).update({
            image_id,
            banner_id,
            title,
            description,
            url_id,
            url_type,
            status
        })
        return response.send({
            code: 200,
            message: 'update seccess'
        })
    }

    async removeBannerItem({
        params,
        response
    }) {
        const bannerItem = await BannerItem.find(params.id)
        await bannerItem.delete()
        return response.send({
            code: 200,
            message: "delete success"
        })
    }



}

module.exports = BannerController;
