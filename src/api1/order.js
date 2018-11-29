import {get,post} from "./index";
export  function createOrder(data) {
    return post(`/api/order/addOrder
`,data)
}
export function getAddress(uid) {
    return get(`/api/user/getInfo?uid=${uid}`)
}
export function updateAddress(data) {
    return post(`/api/user/update`,data)
}

