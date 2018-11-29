import {get,post} from "./index";

//获取首页头部分类信息
export function getLocation() {
    return get("/api/getLocation");
}

//获取每一类列表信息
export function getKindSlidersImgs(kid=1) {
    return get(`/api/goods/getKindSlider?kid=${kid}`)
}

/*获取分类小图标*/
export function getAllKindsIcons() {
    return get("/api/goods/getAllKindsIconList");
}

//获取主页信息
export function getHomeGoods(kind=1,limit,offset=1) {
    return get(`/api/goods/getKindList?kid=${kind}&limit=${limit}&offset=${offset}`);
}

