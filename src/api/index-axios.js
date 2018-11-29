import axios from 'axios';
//设置默认的基本路径
axios.defaults.baseURL = "http://localhost:9999";
// 在这里统一拦截结果 把通过路径获取的数据处理成res.data
axios.interceptors.response.use((res)=>{
  return res.data;
});

//1、获取轮播图数据
//创建一个函数，执行函数调用路径接口
export let getSliders = () => {
  return axios.get('/sliders')
};
//2、获取热门图书
export let getHotBooks = () => {
  //通过这个路径获取热门图书
  return axios.get('/hots')
};

//8、获取首页的全部（将两个promise放在一起）
export let getAll = ()=>{
  return axios.all([getSliders(),getHotBooks()])
};

//3、获取所有图书
// export let getBooks=()=>{
//   return axios.get('/book')
// };
//9、分页(根据偏移量返回对应的数据) 分页获取数据
export let pagination = (offset)=>{
  return axios.get(`/page?offset=${offset}`)
}


//4、删除图书 实际上是写一个删除路径
//将这个路径引入list中传入一个id，然后在后台对应的请求方式delete中将对应id的数据进行过滤删除
export let removeBook=(id)=>{
  //这个id是从图书列表传过来的
  return axios.delete(`/book?id=${id}`)
};

//5、获取某一本书
export let findOneBook = (id)=>{
  return axios.get(`/book?id=${id}`)
};

// 6、修改图书
/**
 * @param id 编号
 * @param data 数据 请求体发送
 * @returns {AxiosPromise<T>}
 */
export let updateBook = (id,data) =>{
  return axios.put(`/book?id=${id}`,data);
};

//7、添加图书
export let addBook = (data)=>{
  return axios.post('/book',data);
};




