import axios from "axios";
axios.defaults.baseURL = "http://localhost:9999";
// 在这里统一拦截结果 把通过路径获取的数据处理成res.data
axios.interceptors.response.use((res)=>{
  return res.data;
});

//1、获取某一类列表信息
export function getOneKindList(kindId=1,limit=5,offset=1) {
  return get(`/api/books/getOneKindList?kindId=${kindId}&limit=${limit}&offset=${offset}`)
}

//2、获取某个种类的轮播图片
export function getOneKindSlider(kindId=1) {
  return get(`/api/books/getOneKindSlider?kindId=${kindId}`)
}

//3、获取某一个商品
export function getOneBook(kindId=1) {
  return get(`/api/books/getOneBook?kindId=2&bookId=1`)
}


