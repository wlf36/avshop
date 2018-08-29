"use strict";

const Route = use("Route");

Route.on("/").render("welcome");

Route.get("api/v1/getkeyword", "Api/v1/KeywordController.getKeyword")

Route.group(() => {
        Route.post("getopenid", "WxPayController.getOpenid");
        Route.post("user/login", "UserController.getToken");
        Route.get("getallcategory", "CategoryController.getAllCategory");
        Route.get("getalltag", "TagController.getAllTag");
        Route.post("wxpay/pay", "WxPayController.pay");
        Route.post("wxpay/notify", "WxPayController.wxPayNotify");
        Route.post("wxpay/query", "WxPayController.query");
        Route.post("getproductbytag", "ProductController.getProductByTag")
        Route.post("getproductbycat", "ProductController.getProductByCat")        
    })
    .prefix("api/v1")
    .namespace("Api/v1");

Route.group(() => {
        Route.get("user/info", "UserController.getUserInfo");
        Route.post("user/logout", "UserController.logout");
        Route.put("user/password", "UserController.updatePassword");
        Route.get("address", "UserController.getAddress");
        Route.post("address", "UserController.createAddress");
        Route.get("getuserorder", "OrderController.getOrderByUser");
        Route.get("updateorderstatus/:id", "OrderController.updateOrderStatus");
        Route.put("updateuserinfo", "UserController.updateUserInfo")
    })
    .prefix("api/v1")
    .namespace("Api/v1")
    .middleware("auth:jwt");

Route.group(() => {
        Route.get("user", "UserController.getUser");
        Route.delete("product/:id/removecat", "ProductController.removeCat");
        Route.delete("product/:id/removetag", "ProductController.removeTag");
        Route.get("getbanneritems/:id", "BannerController.fetchBannerItems");
        Route.post("banneritem", "BannerController.addBannerItem");
        Route.get("banneritem/:id", "BannerController.fetchBannerItem");
        Route.put("banneritem/:id", "BannerController.updateBannerItem");
        Route.delete("banneritem/:id", "BannerController.removeBannerItem");

    })
    .prefix("api/v1")
    .namespace("Api/v1")
    .middleware("auth:jwt")
    .middleware("role:admin");

Route.group(() => {
        Route.resource("banner", "BannerController").middleware(
            new Map([
                [
                    ["store", "update", "destroy"],
                    ["auth:jwt", "role:admin"]
                ]
            ])
        )
        Route.resource("image", "ImageController").middleware(
            new Map([
                [
                    ["store", "update", "destroy"],
                    ["auth:jwt", "role:admin"]
                ]
            ])
        )
        Route.resource("vocabulary", "VocabularyController").middleware(
            new Map([
                [
                    ["store", "update", "destroy"],
                    ["auth:jwt", "role:admin"]
                ]
            ])
        )
        Route.resource("category", "CategoryController").middleware(
            new Map([
                [
                    ["store", "update", "destroy"],
                    ["auth:jwt", "role:admin"]
                ]
            ])
        )
        Route.resource("tag", "TagController").middleware(
            new Map([
                [
                    ["store", "update", "destroy"],
                    ["auth:jwt", "role:admin"]
                ]
            ])
        )
        Route.resource("product", "ProductController").middleware(
            new Map([
                [
                    ["store", "update", "destroy"],
                    ["auth:jwt", "role:admin"]
                ]
            ])
        )
        Route.resource("order", "OrderController").middleware(
            new Map([
                [
                    ["index", "store"],
                    ["auth:jwt"]
                ],
                [
                    ["update", "destroy"],
                    ["auth:jwt", "role:admin"]
                ]
            ])
        )
    })
    .prefix("api/v1")
    .namespace("Api/v1");
