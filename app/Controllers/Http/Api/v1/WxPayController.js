'use strict'
const Config = use('Config')
const moment = use('moment')
const randomString = use('randomstring')
const queryString = use('querystring')
const convert = use('xml-js')
const axios = use('axios')
const WxPayService = use('App/Services/WxPay')
const User = use('App/Models/User')
const Order = use('App/Models/Order')


class WxPayController {
    /**
     * 获取用户openid  
     */
    async getOpenid({
        auth,
        request,
        response
    }) {
        /** 小程序 ID */
        const appid = Config.get('wxpay.appid')
        /** 小程序密钥 */
        const secret = Config.get('wxpay.secret')
        /** 授权类型 */
        const grant_type = 'authorization_code'
        /** 登录凭证 */
        const js_code = request.input('js_code')

        /**
         * 请求得到微信用户会话。
         */
        const jsCodeToSessionParams = {
            appid,
            secret,
            js_code,
            grant_type
        }
        const jsCodeToSessionString = queryString.stringify(jsCodeToSessionParams)
        const jsCodeToSessionApi = Config.get('wxpay.api.jsCodeToSession')
        const jsCodeToSessionUrl = `${ jsCodeToSessionApi }?${ jsCodeToSessionString }`

        const wxResponse = await axios.post(jsCodeToSessionUrl)
        const wxSession = wxResponse.data

        const openid = wxSession.openid
        const _u = await User.findBy('openid', openid)

        let uid = 0
        if (_u !== null) {
            const u = _u.toJSON()
            uid = u.id
        } else {
            const userData = {
                openid
            }
            const _user = await User.create(userData)
            const user = _user.toJSON()
            uid = user.id
        }

        const user = await User.find(uid)
        const token = await auth.withRefreshToken().generate(user)

        return response.send({
            openid,
            uid,
            token
        })
    }

    /**
     * 支付。   
     */
    async pay({
        request
    }) {

        /** 小程序 ID */
        const appid = Config.get('wxpay.appid')

        /** 商户号 */
        const mch_id = Config.get('wxpay.mch_id')

        /** 密钥 */
        const key = Config.get('wxpay.key')

        //获取微信用户 openid     
        const openid = request.input('openid')

        /** 商户订单号 */
        const out_trade_no = request.input('out_trade_no')

        /** 商品价格 */
        const total_fee = request.input('total_fee')

        /** 商品描述 */
        const body = request.input('body')

        /** 支付类型 */
        const trade_type = 'JSAPI'

        /** 用户 IP */
        const spbill_create_ip = request.ip()

        /** 通知地址 */
        const notify_url = Config.get('wxpay.notify_url')

        /** 随机字符 */
        const nonce_str = randomString.generate(32)

        /** 统一下单接口 */
        const unifiedOrderApi = Config.get('wxpay.api.unifiedorder')

        /**
         * 准备支付数据。
         */
        let order = {
            appid,
            mch_id,
            out_trade_no,
            body,
            total_fee,
            trade_type,
            notify_url,
            nonce_str,
            spbill_create_ip,
            openid
        }
        // console.log(order)

        const sign = WxPayService.wxPaySign(order, key)
        const xmlOrder = WxPayService.orderToXML(order, sign)


        /**
         * 调用微信支付统一下单接口。
         */
        const wxPayResponse = await axios.post(unifiedOrderApi, xmlOrder)
        const data = WxPayService.xmlToJS(wxPayResponse.data)
        console.log(data)

        /**
         * JSAPI 参数
         */
        const timeStamp = moment().local().unix()
        const prepay_id = data.prepay_id

        //更新order prepay_id
        // await Order.query().where('id', orderId).update({'prepay_id': prepay_id})

        let wxJSApiParams = {
            appId: appid,
            timeStamp: `${ timeStamp }`,
            nonceStr: nonce_str,
            package: `prepay_id=${ prepay_id }`,
            signType: 'MD5'
        }

        const paySign = WxPayService.wxPaySign(wxJSApiParams, key)

        wxJSApiParams = {
            ...wxJSApiParams,
            paySign
        }

        /**
         * 为前端返回 JSAPI 参数，
         * 根据这些参数，调用微信支付功能。
         */
        return wxJSApiParams
    }


    /**
     * 处理支付结果通知，
     * 支付成功以后，微信会发送支付结果给我们。   
     */
    async wxPayNotify({
        request
    }) {

        /**
         * 获取并处理通知里的支付结果，
         * 结果数据是 xml 格式，所以需要把它转换成 object。
         */        
        const _payment = convert.xml2js(request._raw, {
            compact: true,
            cdataKey: 'value',
            textKey: 'value'
        }).xml

        const payment = Object.keys(_payment).reduce((accumulator, key) => {
            accumulator[key] = _payment[key].value
            return accumulator
        }, {})

        console.log('支付结果：', payment)

        /**
         * 验证支付结果，
         * 可以验证支付金额与签名，
         * 这里我只验证了签名。
         */
        const paymentSign = payment.sign
        console.log('结果签名：', paymentSign)

        delete payment['sign']
        const key = Config.get('wxpay.key')
        const selfSign = WxPayService.wxPaySign(payment, key)
        console.log('自制签名：', selfSign)

        /**
         * 构建回复数据，
         * 验证之后，要把验证的结果告诉微信支付系统。
         */
        const return_code = paymentSign === selfSign ? 'SUCCESS' : 'FAIL'
        console.log('回复代码：', return_code)

        if (return_code == 'SUCCESS') {
            console.log('执行业务逻辑')
            //更新订单付款状态
            await Order.query().where('id', payment.out_trade_no).update({
                status: 2
            })
        }

        const reply = {
            xml: {
                return_code
            }
        }

        /**
         * 响应微信支付系统，验证的结果。
         */
        return convert.js2xml(reply, {
            compact: true
        })
    }


    /**
     * 订单状态查询，
     * 调用微信支付订单查询接口。   
     */
    async query({
        request
    }) {

        /** 公众账号 ID */
        // const appid = Config.get('wxpay.appid')

        /** 小程序 ID */
        const appid = Config.get('wxpay.appid')

        /** 商户号 */
        const mch_id = Config.get('wxpay.mch_id')

        /** 密钥 */
        const key = Config.get('wxpay.key')

        /** 商户订单号 */
        const out_trade_no = request.input('out_trade_no')

        /** 随机字符 */
        const nonce_str = randomString.generate(32)

        /** 查询订单接口 */
        const orderQueryApi = Config.get('wxpay.api.orderquery')

        /**
         * 准备订单查询数据。
         */
        const order = {
            appid,
            mch_id,
            out_trade_no,
            nonce_str
        }
        const sign = this.wxPaySign(order, key)
        const xmlOrder = this.orderToXML(order, sign)

        /**
         * 调用微信支付订单查询接口。
         */
        const wxPayQueryResponse = await axios.post(orderQueryApi, xmlOrder)
        const result = this.xmlToJS(wxPayQueryResponse.data)
        console.log(result)

        /**
         * 返回订单查询结果。
         */
        return result
    }

}

module.exports = WxPayController
