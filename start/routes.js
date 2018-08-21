"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use("Route");

Route.on("/").render("welcome");

Route.group(() => {
        Route.post("getopenid", "WxPayController.getOpenid");
        Route.post("user/login", "UserController.getToken");
        Route.get("getallcategory", "CategoryController.getAllCategory");
        Route.get("getalltag", "TagController.getAllTag");
    })
    .prefix("api/v1")
    .namespace("Api/v1");

Route.group(() => {
        Route.get("user/info", "UserController.getUserInfo");
        Route.post("user/logout", "UserController.logout");
        Route.put("user/password", "UserController.updatePassword");
        Route.get("user/getaddress", "UserController.getAddress");
        Route.post("user/address", "UserController.createAddress");
        Route.get("order/user/:id", "OrderController.getOrderByUser");
        Route.post("wxpay/pay", "WxPayController.pay");
        Route.post("wxpay/notify", "WxPayController.wxPayNotify");
        Route.post("wxpay/query", "WxPayController.query");
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
                    ["index", "store", "update", "destroy"],
                    ["auth:jwt", "role:admin"]
                ]
            ])
        )
    })
    .prefix("api/v1")
    .namespace("Api/v1");
