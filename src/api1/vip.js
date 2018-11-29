import {get} from './index';

export function getHotList() {
    return get('/api/goods/getKindList?kid=1&limit=10&offset=1')
}
