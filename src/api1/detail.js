import {get} from './index';

export function getDetail(id) {
   return get(`/api/goods/getOneGoods?kid=1&gid=${id}`)
}