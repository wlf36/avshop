'use strict'
const Product = use('App/Models/Product')
const UserMeta = use('App/Models/UserMeta')
const Order = use('App/Models/Order')
const OrderProduct = use('App/Models/OrderProduct')
const uniqid = use('uniqid')

class OrderService {
    constructor() {
        this.oProducts = null
        this.products = null
        this.uid = null
    }

    async place(uid, oProducts) {
        // oProducts和products 作对比
        // products从数据库中查询出来
        this.oProducts = oProducts
        this.products = await this.getProductsByOrder(oProducts)
        this.uid = uid

        const status = this.getOrderStatus()
        // return status
        if (!status['pass']) {
            status['order_id'] = -1
            return status
        }

        //开始创建订单
        const orderSnap = await this.snapOrder(status)
        let order = await this.createOrder(orderSnap)
        order.pass = true
        return order
    }

    // 根据订单信息查找真实的商品信息
    async getProductsByOrder(oProducts) {
        let oPIDs = []
        oProducts.map((item) => {
            oPIDs.push(item.product_id)
        })
        const products = await Product.query()
            .whereIn('id', oPIDs)
            .with('image')
            .setVisible(['id', 'title', 'price', 'stock', 'image'])
            .fetch()
        return products.toJSON()
    }

    getOrderStatus() {
        let status = {
            'pass': true,
            'orderPrice': 0,
            'totalCount': 0,
            'pStatusArray': []
        };

        this.oProducts.map((item) => {
            const pStatus = this.getProductStatus(item.product_id, item.count, this.products)

            if (!pStatus.haveStock) {
                status.pass = false
            }
            status.orderPrice += pStatus.totalPrice
            status.totalCount += pStatus.counts
            status.pStatusArray.push(pStatus)
        })

        return status;
    }

    getProductStatus(oPID, oCount, products) {
        let pIndex = -1;
        let pStatus = {
            'id': null,
            'haveStock': false,
            'counts': 0,
            'price': 0,
            'title': '',
            'totalPrice': 0,
            'main_img_url': null
        }

        for (let i = 0; i < products.length; i++) {
            if (oPID == products[i].id) {
                pIndex = i;
            }
        }

        if (pIndex == -1) {
            // 客户端传递的product_id有可能根本不存在 抛出异常

        } else {
            const product = products[pIndex]

            pStatus.id = product.id
            pStatus.title = product.title
            pStatus.counts = oCount
            pStatus.price = product.price
            // pStatus.main_img_url = product.main_img_url
            pStatus.totalPrice = product.price * oCount

            if (product.stock - oCount >= 0) {
                pStatus.haveStock = true
            }
        }
        // console.log(pStatus)
        return pStatus
    }

    // 生成订单快照
    async snapOrder(status) {
        const snap = {
            'orderPrice': 0,
            'totalCount': 0,
            'pStatus': [],
            'snapAddress': null,
            'snapName': '',
            'snapImg': ''
        }

        snap.orderPrice = status.orderPrice
        snap.totalCount = status.totalCount
        snap.pStatus = status.pStatusArray
        snap.snapAddress = await this.getUserAddress()
        snap.snapName = this.products[0].title
        snap.snapImg = this.products[0].main_img_url

        if (this.products.length > 1) {
            snap.snapName += '等'
        }

        return snap
    }

    async getUserAddress() {
        const _userMeta = await UserMeta.query().where('user_id', this.uid).fetch()
        const userMeta = _userMeta.toJSON()
        let address = {}
        userMeta.map((item) => {
            address[item.meta_key] = item.meta_value
        })
        return address
    }

    async createOrder(snap) {
        const orderNo = this.makeOrderNo()

        const data = {
            user_id: this.uid,
            order_no: orderNo,
            total_price: snap.orderPrice,
            total_count: snap.totalCount,
            snap_img: snap.snapImg,
            snap_name: snap.snapName,
            snap_address: JSON.stringify(snap.snapAddress),
            snap_items: JSON.stringify(snap.pStatus)
        }

        const order = await Order.create(data)

        const orderID = order.id
        const create_time = order.created_at

        let orderProduct = []
        // console.log(snap.pStatus)
        snap.pStatus.map((item) => {
            orderProduct.push({
                order_id: orderID,
                product_id: item.id,
                count: item.counts
            })
        })
        await OrderProduct.createMany(orderProduct)

        return {
            // 'order_no': orderNo,
            'order_id': orderID,
            'create_time': create_time
        }

    }

    makeOrderNo() {
        return uniqid.time('no')
    }

}

module.exports = new OrderService()
