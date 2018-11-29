const express = require('express');
const fs = require('fs');
const goodsRoutes = express.Router();
const urls = {
    //获取每一类商品列表
  getOneKindList: '/getOneKindList',
    //获取一个商品
    getOneBook: '/getOneBook',
    //获取列表轮播图
    getOneKindSlider: '/getOneKindSlider',
    //获取所有分类ICON
    getAllKindsIconList: '/getAllKindsIconList'
};
const booksPosition = './mock/bookList.json';
let read = callback => {
  fs.readFile(booksPosition, 'utf8', (err, data) => {
    if (data.length === 0) {
      data = [];
    } else {
      data = JSON.parse(data);
    }
    callback(err, data);
  });
};
let write = (data, callback) => {
  fs.writeFile(booksPosition, JSON.stringify(data), callback);
};

//获取某一类商品的信息（并且可以选择获取这类商品的数量和偏移量）
// http://localhost:9999/api/books/getOneKindList?kindId=1&limit=6&offset=1
goodsRoutes.get(urls.getOneKindList, (req, res) => {
  //kid参数错误
  if (typeof req.query.kindId === 'undefined' || isNaN(parseInt(req.query.kindId)) || parseInt(req.query.kindId) < 0) return res.send({
    code: 1,
    msg: 'kid参数错误！'
  });
  //offset是否传递过来
  if (typeof req.query.offset !== 'undefined') {
    //offset参数错误
    if (isNaN(parseInt(req.query.offset)) || parseInt(req.query.offset) < 0) {
      return res.send({
        code: 1,
        msg: 'offset参数错误！'
      });
    }
  } else {
    req.query.offset = 1;
  }
  //limit是否传递过来
  if (typeof req.query.limit !== 'undefined') {
    //limit参数错误
    if (isNaN(parseInt(req.query.limit)) || parseInt(req.query.limit) < 0) {
      return res.send({
        code: 1,
        msg: 'limit参数错误！'
      });
    }
  } else {
    req.query.limit = 5;
  }

  let kinds = [];
  read((err, data) => {
    if (err) return res.send({code: 1, msg: '服务器出现错误！'});
    kinds = data;
    let kind = kinds.find(item => item.kindId === parseInt(req.query.kindId));
    if (kind) {
      let oneKindBooks = kind/*.list*/;
      let kindId = oneKindBooks.kindId;
      let kindName = oneKindBooks.kindName;
      let kindIcon = oneKindBooks.kindIcon;
      let kindSliderImgs = oneKindBooks.kindSliderImgs;
      let oneKindBookList = oneKindBooks.list.slice(parseInt(req.query.offset) - 1, parseInt(req.query.offset) - 1 + parseInt(req.query.limit));

      let hasMore = true;
      if (parseInt(req.query.offset) + parseInt(req.query.limit) > oneKindBooks.length) {
        hasMore = false;
      }
      res.send({
        code: 0,
        msg: '获取成功',
        limit: parseInt(req.query.limit),
        offset: parseInt(req.query.offset),
        page: parseInt(req.query.offset) / parseInt(req.query.limit) + 1,
        pageNum: Math.ceil(oneKindBookList.length / req.query.limit),
        total: oneKindBookList.length,
        hasMore: hasMore,
        /*data: goodsList.slice(parseInt(req.query.offset) - 1, parseInt(req.query.offset) - 1 + parseInt(req.query.limit))*/
        data:{
          "kindId": kindId,
          "kindName": kindName,
          "kindIcon": kindIcon,
          "kindSliderImgs":kindSliderImgs,
          "list":oneKindBookList
        }
      });
    } else {
      res.send({code: 1, msg: '此分类不存在！'});
    }
  });
});

//获取某种分类的轮播图轮播图
// http://localhost:9999/api/books/getOneKindSlider?kindId=1
goodsRoutes.get(urls.getOneKindSlider, (req, res) => {
  //kid参数错误
  if (typeof req.query.kindId === 'undefined' || isNaN(parseInt(req.query.kindId)) || parseInt(req.query.kindId) < 0) return res.send({
    code: 1,
    msg: 'kindId参数错误！'
  });
  read((err, data) => {
    if (err) return res.send({code: 1, msg: '服务器出现错误！'});
    let kind = data.find(item => item.kindId === parseInt(req.query.kindId));
    if (kind) {
      res.send({
        code: 0,
        msg: '获取成功',
        kindId:kind.kindId,
        kindName:kind.kindName,
        data: kind.kindSliderImgs
      });
    } else {
      res.send({code: 1, msg: '此分类不存在！'});
    }
  });
});


//获取一个商品
//http://localhost:9999/api/books/getOneBook?kindId=2&bookId=1
goodsRoutes.get(urls.getOneBook, (req, res) => {
  //kindId参数错误
  if (typeof req.query.kindId === 'undefined' || isNaN(parseInt(req.query.kindId)) || parseInt(req.query.kindId) < 0) return res.send({
    code: 1,
    msg: 'kindId参数错误！'
  });
  //bookId参数错误
  if (typeof req.query.bookId === 'undefined' || isNaN(parseInt(req.query.bookId)) || parseInt(req.query.bookId) < 0) return res.send({
    code: 1,
    msg: 'bookId参数错误！'
  });
  read((err, data) => {
    if (err) return res.send({code: 1, msg: '服务器出现错误！'});
    let kind = data.find(item => item.kindId === parseInt(req.query.kindId));
    if (kind) {
      let books = kind.list.find(item => item.bookId === parseInt(req.query.bookId));
      if (books) {
        res.send({
          code: 0,
          msg: '获取成功',
          kindId:req.query.kindId,
          kindName:kind.kindName,
          data: books
        });
      } else {
        res.send({code: 1, msg: '此商品不存在！'});
      }
    } else {
      res.send({code: 1, msg: '此分类不存在！'});
    }
  });
});



//获取所有分类ICON
goodsRoutes.get(urls.getAllKindsIconList, (req, res) => {
  fs.readFile('./mock/allKindsIconList.json', 'utf8', (err, data) => {
    if (err) return res.send({code: 1, msg: '服务器出现错误！'});
    res.send({code: 0, msg: '获取成功', data: JSON.parse(data)});
  });
});

module.exports = goodsRoutes;
