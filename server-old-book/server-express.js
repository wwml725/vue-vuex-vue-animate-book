let express  =require("express");
let app = express();
let http = require("http");
let fs = require("fs");
let url = require("url");
let path = require("path");
let sliders = require('./mock/sliders');
//将读取数据封装成一个函数
function read(cb) { //用来读取数据的
  fs.readFile('./mock/book.json','utf8',function (err,data) {
    if(err || data.length === 0){
      cb([]); // 如果有错误 或者文件没长度 就是空数组
    }else{
      //将读取到得数据放入回调函数中
      cb(JSON.parse(data)); // 将读出来的内容转化成对象
    }
  })
}
function write(data,cb) { // 写入内容
  fs.writeFile('./mock/book.json',JSON.stringify(data),cb)
}
let pageSize = 5;//每次获取数据的数目

app.use(function(req,res,next){
  //如果在webpack里配置了代理，那么这些响应头都不要了
  //只允许8080访问
  res.header('Access-Control-Allow-Origin','http://localhost:8081');
  //服务允许客户端发的方法
  res.header('Access-Control-Allow-Methods','GET,POST,DELETE,PUT');
  //服务器允许的请求头
  res.header('Access-Control-Allow-Headers','Content-Type,Accept');
  //允许客户端把cookie发过来
  res.header('Access-Control-Allow-Credentials','true');
  //如果请求的方法是OPTIONS,那么意味着客户端只要响应头，直接结束响应即可
  if(req.method == 'OPTIONS'){
    res.end();
  }else{
    next();
  }
});

app.get("/sliders",function (req,res) {
  res.header("Content-Type","application/json;charset=utf8");
  return res.end(JSON.stringify(sliders)
  )});

app.get("/hots",function (req,res) {
  read(function (books) {
    //参数books就是读取book.json文件获取到的数据
    //最好将数据复制，不要直接操作原来的数据
    let hot = books.reverse().slice(0,6);
    res.header('Content-Type','application/json;charset=utf8');
    res.end(JSON.stringify(hot));//客户端接收JSON.stringify(hot)格式
  });
  return
})

app.get("/page",function (req,res) {
  let query = req.query;
  let offset = parseInt(query.offset) || 0; //查询字符串中的偏移量，offset的值是由前端传递过来的参数
  read(function (books) {
    // 每次偏移量 在偏移的基础上增加五条
    //在book.json中copy出数据
    let result = books.reverse().slice(offset,offset+pageSize);
    let hasMore = true; //默认有更多  这里的hasMore和前端的hasMore有什么关联？
    if(books.length<=offset+pageSize){ // 已经显示的数目 大于了总共条数
      hasMore = false;
      //如果还有不到5张图片呢？
      //问：这里的hasMore=true||false起了什么作用？
      //必须的，需要将这个值返回给客户端
    }
    res.header('Content-Type','application/json;charset=utf8');
    // setTimeout(function () {
    res.end(JSON.stringify({hasMore,books:result}));

    // },10)
  });
  return;
})

app.get(`/book`,function (req,res) {
  let id = parseInt(req.query.id);
  if(!isNaN(id)){ // 如果有id 就查询一本书
    read(function (books) {
      book =  books.find((item)=>(item.bookId===id));
      if(!book) book={};//如果没有找到则是undefined
      res.setHeader('Content-Type','application/json;charset=utf8');
      res.end(JSON.stringify(book))
    })
  }else{ // 获取所有图书
    read(function (books) {
      res.setHeader('Content-Type','application/json;charset=utf8');
      res.end(JSON.stringify(books.reverse()));
    })
  }
});

app.post("/book",function (req,res) {
  let str = '';
  req.on('data',chunk=>{
    str+=chunk
  });
  req.on('end', () => {
    let book = JSON.parse(str);
    read(function (books) { // 添加id
      book.bookId = books.length?books[books.length-1].bookId+1:1;
      books.push(book); //将数据放到books中 ，books在内存中
      write(books,function () {
        res.end(JSON.stringify(book));
      });
    });
  });
});

app.put("/book",function (req,res) {
  let id = parseInt(req.query.id);
  if(id){// 获取了当前要修改的id
    let str = '';
    req.on('data',chunk=>{
      str+=chunk;
    });
    req.on('end',()=>{
      let book = JSON.parse(str);//book要改成什么样子
      read(function (books) {
        books = books.map(item=>{
          if(item.bookId === id){ // 找到id相同的那一本书
            return book
          }
          return item; // 其他书正常返回即可
        });
        write(books,function () { // 将数据写回json中
          res.end(JSON.stringify(book));
        })
      });
    })
  }
});

app.delete("/book",function (req,res) {
  let id = parseInt(req.query.id);
  read(function (books) {
    //将对应id的book删除，留下其他的book
    books = books.filter((item)=>(item.bookId!==id));
    // 这个id实际上是从路径上的路径参数，将过滤后的数据放入数据库中
    write(books,function () {
      res.end(JSON.stringify({}))
      //在此时写res.end()貌似也不影响
    })
  });

});

app.listen(9999,function(){
  console.log(`http://localhost:9999`);
})
