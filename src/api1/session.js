import {get,post} from "./index";
//注册
export function reg(user) {
    return post("/api/user/reg",user);
}
//登录
export function login(user) {
    return post("/api/user/login",user);
}
//退出
export function logout(){
    return get('/api/user/logout?uid=1');
}
//验证
export function validate() {
    return get('/api/user/validate?uid=1')
}

