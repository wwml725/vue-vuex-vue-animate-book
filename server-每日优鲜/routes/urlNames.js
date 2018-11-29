const urlNames = {
    goodsUrlName:{
        //获取每一类商品列表
        getKindListRoute: '/getKindList',
        //获取一个商品
        getOneGoodsRoute: '/getOneGoods',
        //获取列表轮播图
        getKindSliderRoute: '/getKindSlider',
        //获取所有分类ICON
        getAllKindsIconListRoute: '/getAllKindsIconList'
    },
    orderUrlName:{
        //获取用户订单列表
        getUserOrdersRoute: '/getUserOrders',
        //获取指定日期订单列表
        getUserDateOrdersRoute: '/getUserDateOrders',
        //根据状态获取订单列表
        getUserStateOrdersRoute: '/getUserStateOrders',
        //获取订单信息
        getOrderRoute: '/getOrder',
        //更改订单状态
        changeStateRoute: '/changeState',
        //创建新订单
        addOrderRoute: '/addOrder'

    },
    userUrlName:{
        //注册新用户
        regRoute: '/reg',
        //登录
        loginRoute: '/login',
        //获取用户信息
        getInfoRoute: '/getInfo',
        //修改地址
        updateAddressRoute: '/updateAddress',
        //更新用户信息
        updateRoute: '/update',
        //验证用户是否登录
        validateRoute: '/validate',
        //退出登录
        logoutRoute: '/logout'
    }
};

module.exports = urlNames;