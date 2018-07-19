'use strict'

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

const Route = use('Route')

Route.on('/').render('welcome')

//api
Route.post('api/v1/user/login', 'Api/v1/UserController.getToken')
Route
    .group(() => {        
        // Route.get('user/info', 'UserController.getUserInfo')
        // Route.post('user/logout', 'UserController.logout')
        // Route.put('user/password', 'UserController.updatePassword')        
        Route.resource('image', 'ImageController')
        Route.resource('banner', 'BannerController')
        Route.resource('category', 'CategoryController')
        Route.resource('product', 'ProductController')
        Route.resource('order', 'OrderController')        
        Route.get('order/user/:id', 'Order.getOrderByUser')
        Route.post('getopenid', 'WxPayController.getOpenid')
        Route.post('wxpay/pay', 'WxPayController.pay')
        Route.post('wxpay/notify', 'WxPayController.wxPayNotify')
        Route.post('wxpay/query', 'WxPayController.query')
    })
    .prefix('api/v1')
    .namespace('Api/v1')
    // .middleware('auth:jwt')
