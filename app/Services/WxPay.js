'use strict'
const queryString  = use('querystring')
const crypto       = use('crypto')
const convert      = use('xml-js')

/**
 * 结账控制器。
 */
class WxPayService {
  
  /**
   * xml 数据转换为 object。
   *
   * @param  {Object} xmlData 要转换的数据。
   * @return {Object} 返回转换之后的数据。
   */
  xmlToJS (xmlData) {
    /**
     * 转换 xml 数据。
     */
    const _data = convert.xml2js(xmlData, {
      compact: true,
      cdataKey: 'value',
      textKey: 'value'
    }).xml

    /** 去掉数据中的 value 属性 */
    const data = Object.keys(_data).reduce((accumulator, key) => {
      accumulator[key] = _data[key].value
      return accumulator
    }, {})

    /**
     * 返回转换之后的结果。
     */
    return data
  }

  /**
   * object 转换为 xml 格式的数据。
   *
   * @param  {Object} order 要转换成 xml 格式的对象。
   * @param  {string} sign  按微信规定算出来的签名。
   * @return 转换成 xml 格式的数据。
   */
  orderToXML (order, sign) {
    /**
     * 构建需要转换的 object
     */
    order = {
      xml: {
        ...order,
        sign
      }
    }

    /**
     * 将 object 转换成 xml
     */
    const xmlOrder = convert.js2xml(order, {
      compact: true
    })

    /**
     * 返回转换成 xml 格式的数据
     */
    return xmlOrder
  }

  /**
   * 签名。
   *
   * @param  {Object} data 参与签名的数据。
   * @param  {string} key 密钥。
   * @return {string} 返回签名。
   */
  wxPaySign (data, key) {    
    /** 1. 排序。 */
    const sortedOrder = Object.keys(data).sort().reduce((accumulator, key) => {
      accumulator[key] = data[key]
      // console.log(accumulator)
      return accumulator
    }, {})

    /** 2. 转换成地址查询符。 */
    const stringOrder = queryString.stringify(sortedOrder, null, null, {
      encodeURIComponent: queryString.unescape
    })

    /** 3. 结尾加上密钥。 */
    const stringOrderWithKey = `${ stringOrder }&key=${ key }`

    /** 4. md5 后全部大写。 */
    const sign = crypto.createHash('md5').update(stringOrderWithKey).digest('hex').toUpperCase()

    /**
     * 返回签名数据。
     */
    return sign
  }
    
}

module.exports = new WxPayService()
