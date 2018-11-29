import {get,post} from "./index";

//获取订单列表
export function getOrderList() {
    return get(`/api/order/getUserOrders?uid=1&limit=10&offset=1`)
}

//获取状态订单
export function getStateOrderList(state) {
    return get(`/api/order/getUserStateOrders?uid=1&limit=10&offset=1&state=${state}`)
}

