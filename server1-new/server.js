const express = require("express");
const fs = require("fs");
const app = express();


app.use(function (req, res, next) {
  //如果客户端要向服务器发送cookie的话，绝不对写*
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "Content-Type");
  res.header('Access-Control-Allow-Methods', "GET,POST,PUT,DELETE,OPTIONS");
  //允许跨域传cookie
  res.header('Access-Control-Allow-Credentials', "true");
  if (req.method === 'OPTIONS') {
    res.end('');
  } else {
    next();
  }
});

//引入路由模块
const booksRoutes = require('./routes/books');
//使用路由模块
app.use('/api/books', booksRoutes);
app.listen(9999, () => {
  console.log(`http://localhost:9999`);
});

