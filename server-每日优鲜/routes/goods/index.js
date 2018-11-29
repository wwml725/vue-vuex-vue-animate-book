const express = require('express');
const fs = require('fs');
const goodsRoutes = express.Router();
// const urls = {
//     //获取每一类商品列表
//     getKindListRoute: '/getKindList',
//     //获取一个商品
//     getOneGoodsRoute: '/getOneGoods',
//     //获取列表轮播图
//     getKindSliderRoute: '/getKindSlider',
//     //获取所有分类ICON
//     getAllKindsIconListRoute: '/getAllKindsIconList'
// };

const urlNames = require('../urlNames');
const urls = urlNames.goodsUrlName;


const goodsListPosition = './mock/goodsList.json';

let read = callback => {
    fs.readFile(goodsListPosition, 'utf8', (err, data) => {
        if (data.length === 0) {
            data = [];
        } else {
            data = JSON.parse(data);
        }
        callback(err, data);
    });
};

let write = (data, callback) => {
    fs.writeFile(goodsListPosition, JSON.stringify(data), callback);
};

//获取每一类商品列表
goodsRoutes.get(urls.getKindListRoute, (req, res) => {
    //kid参数错误
    if (typeof req.query.kid === 'undefined' || isNaN(parseInt(req.query.kid)) || parseInt(req.query.kid) < 0) return res.send({
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
        let kind = kinds.find(item => item.kid === parseInt(req.query.kid));
        if (kind) {
            let goodsList = kind.list;
            let hasMore = true;
            if (parseInt(req.query.offset) + parseInt(req.query.limit) > goodsList.length) {
                hasMore = false;
            }
            res.send({
                code: 0,
                msg: '获取成功',
                limit: parseInt(req.query.limit),
                offset: parseInt(req.query.offset),
                page: parseInt(req.query.offset) / parseInt(req.query.limit) + 1,
                pageNum: Math.ceil(goodsList.length / req.query.limit),
                total: goodsList.length,
                hasMore: hasMore,
                data: goodsList.slice(parseInt(req.query.offset) - 1, parseInt(req.query.offset) - 1 + parseInt(req.query.limit))
            });
        } else {
            res.send({code: 1, msg: '此分类不存在！'});
        }
    });
});

//获取一个商品
goodsRoutes.get(urls.getOneGoodsRoute, (req, res) => {
    //kid参数错误
    if (typeof req.query.kid === 'undefined' || isNaN(parseInt(req.query.kid)) || parseInt(req.query.kid) < 0) return res.send({
        code: 1,
        msg: 'kid参数错误！'
    });
    //gid参数错误
    if (typeof req.query.gid === 'undefined' || isNaN(parseInt(req.query.gid)) || parseInt(req.query.gid) < 0) return res.send({
        code: 1,
        msg: 'gid参数错误！'
    });
    read((err, data) => {
        if (err) return res.send({code: 1, msg: '服务器出现错误！'});
        let kind = data.find(item => item.kid === parseInt(req.query.kid));
        if (kind) {
            let goods = kind.list.find(item => item.gid === parseInt(req.query.gid));
            if (goods) {
                res.send({
                    code: 0,
                    msg: '获取成功',
                    data: goods
                });
            } else {
                res.send({code: 1, msg: '此商品不存在！'});
            }
        } else {
            res.send({code: 1, msg: '此分类不存在！'});
        }
    });
});

//获取列表轮播图
goodsRoutes.get(urls.getKindSliderRoute, (req, res) => {
    //kid参数错误
    if (typeof req.query.kid === 'undefined' || isNaN(parseInt(req.query.kid)) || parseInt(req.query.kid) < 0) return res.send({
        code: 1,
        msg: 'kid参数错误！'
    });
    read((err, data) => {
        if (err) return res.send({code: 1, msg: '服务器出现错误！'});
        let kind = data.find(item => item.kid === parseInt(req.query.kid));
        if (kind) {
            res.send({
                code: 0,
                msg: '获取成功',
                data: kind.kindSliderImgs
            });
        } else {
            res.send({code: 1, msg: '此分类不存在！'});
        }
    });
});

//获取所有分类ICON
goodsRoutes.get(urls.getAllKindsIconListRoute, (req, res) => {
    fs.readFile('./mock/allKindsIconList.json', 'utf8', (err, data) => {
        if (err) return res.send({code: 1, msg: '服务器出现错误！'});
        res.send({code: 0, msg: '获取成功', data: JSON.parse(data)});
    });
});

module.exports = goodsRoutes;