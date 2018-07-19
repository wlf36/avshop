'use strict'

const Env = use('Env')

module.exports = {
  //小程序id
  appid: Env.get('WXA_APP_ID'),

  //小程序密匙
  secret: Env.get('WXA_SECRET'),

  // 商户号
  mch_id: Env.get('WXPAY_MCH_ID'),

  // 密钥
  key: Env.get('WXPAY_KEY'),

  // 通知地址
  notify_url: Env.get('WXPAY_NOTIFY_URL'),

  // 接口地址
  api: {
    //微信登录接口
    jsCodeToSession: 'https://api.weixin.qq.com/sns/jscode2session',
    //统一下单接口
    unifiedorder: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
    //订单查询接口
    orderquery: 'https://api.mch.weixin.qq.com/pay/orderquery'    
  }
}
