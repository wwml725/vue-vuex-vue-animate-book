//通过get方法获取数据
const HOST="http://localhost:9000";

export function get(url) {
    return fetch(HOST+url,{//返回的是promise 实例，有.then 方法

        method:"GET",
        credentials:"include",
        headers:{
            "Accept":"application/json",

        }

    }).then(res=>res.json())//把响应体转化成json
}
//post
export function post(url, data) {
    return fetch(HOST+url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
        },
        credentials:"include",
        body:JSON.stringify(data)//请求体格式
    }).then(res=>res.json());
}

