import {get,post} from "./index";
export function getInfo() {
    return get("/api/user/getInfo?uid=1")
}