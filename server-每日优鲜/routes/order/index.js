const express = require('express');
const fs = require('fs');
const orderRoutes = express.Router();
/*
const urls = {
    //获取用户订单列表
    getUserOrdersRoute: '/getUserOrders',
    //获取指定日期订单列表
    getUserDateOrdersRoute: '/getUserDateOrders',
    //根据状态获取订单列表
    getUserStateOrdersRoute: '/getUserStateOrders',
    //获取订单信息
    getOrderRoute: '/getOrder',
    //更改订单状态
    changeStateRoute: '/changeState',
    //创建新订单
    addOrderRoute: '/addOrder'
};
*/

const urlNames = require('../urlNames');
const urls = urlNames.orderUrlName;

const state = ['unpaid', 'paid', 'cancelled'];

const orderListPosition = './mock/orderList.json';

let getTime = () => {
    let str = '';
    let time = new Date().toLocaleString();
    let reg = /\d+/g;
    time.replace(reg, (...args) => {
        str += args[0];
    });
    return str;
};

let read = callback => {
    fs.readFile(orderListPosition, 'utf8', (err, data) => {
        if (data.length === 0) {
            data = [];
        } else {
            data = JSON.parse(data);
        }
        callback(err, data);
    });
};

let write = (data, callback) => {
    fs.writeFile(orderListPosition, JSON.stringify(data), callback);
};

//获取用户订单列表
orderRoutes.get(urls.getUserOrdersRoute, (req, res) => {
    //uid参数错误
    if (typeof req.query.uid === 'undefined' || isNaN(parseInt(req.query.uid)) || parseInt(req.query.uid) < 0) return res.send({
        code: 1,
        msg: 'uid参数错误！'
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
    let allUsers = [];
    read((err, data) => {
        if (err) return res.send({code: 1, msg: '服务器出现错误！'});
        allUsers = data;
        let user = allUsers.find(item => item.uid === parseInt(req.query.uid));
        if (user) {
            let orders = user.orders;
            let hasMore = true;
            if (parseInt(req.query.offset) + parseInt(req.query.limit) > orders.length) {
                hasMore = false;
            }
            res.send({
                code: 0,
                msg: '获取成功',
                limit: parseInt(req.query.limit),
                offset: parseInt(req.query.offset),
                page: parseInt(req.query.offset) / parseInt(req.query.limit) + 1,
                pageNum: Math.ceil(orders.length / req.query.limit),
                total: orders.length,
                hasMore: hasMore,
                data: orders.slice(parseInt(req.query.offset) - 1, parseInt(req.query.offset) - 1 + parseInt(req.query.limit))
            });
        } else {
            res.send({code: 1, msg: '此用户不存在！'});
        }
    });
});

//获取指定日期订单列表
orderRoutes.get(urls.getUserDateOrdersRoute, (req, res) => {
    //uid参数错误
    if (typeof req.query.uid === 'undefined' || isNaN(parseInt(req.query.uid)) || parseInt(req.query.uid) < 0) return res.send({
        code: 1,
        msg: 'uid参数错误！'
    });
    //date参数错误
    if (typeof req.query.date === 'undefined' || typeof req.query.date !== 'string' || isNaN(parseInt(req.query.date)) || req.query.date.length !== 8) return res.send({
        code: 1,
        msg: 'date参数错误！'
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
    let allUsers = [];
    read((err, data) => {
        if (err) return res.send({code: 1, msg: '服务器出现错误！'});
        allUsers = data;
        let user = allUsers.find(item => item.uid === parseInt(req.query.uid));
        if (user) {
            let orders = user.orders.filter(item => item.date.indexOf(req.query.date) > -1);
            let hasMore = true;
            if (parseInt(req.query.offset) + parseInt(req.query.limit) > orders.length) {
                hasMore = false;
            }
            res.send({
                code: 0,
                msg: '获取成功',
                limit: parseInt(req.query.limit),
                offset: parseInt(req.query.offset),
                page: parseInt(req.query.offset) / parseInt(req.query.limit) + 1,
                pageNum: Math.ceil(orders.length / req.query.limit),
                total: orders.length,
                hasMore: hasMore,
                data: orders.slice(parseInt(req.query.offset) - 1, parseInt(req.query.offset) - 1 + parseInt(req.query.limit))
            });
        } else {
            res.send({code: 1, msg: '此用户不存在！'});
        }
    });
});

//根据状态获取订单列表
orderRoutes.get(urls.getUserStateOrdersRoute, (req, res) => {
    //uid参数错误
    if (typeof req.query.uid === 'undefined' || isNaN(parseInt(req.query.uid)) || parseInt(req.query.uid) < 0) return res.send({
        code: 1,
        msg: 'uid参数错误！'
    });
    //state参数错误
    if (parseInt(req.query.state) !== 0 && parseInt(req.query.state) !== 1 && parseInt(req.query.state) !== 2) return res.send({
        code: 1,
        msg: 'state参数错误！'
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
    let allUsers = [];
    read((err, data) => {
        if (err) return res.send({code: 1, msg: '服务器出现错误！'});
        allUsers = data;
        let user = allUsers.find(item => item.uid === parseInt(req.query.uid));
        if (user) {
            let orders = user.orders.filter(item => item.state === state[parseInt(req.query.state)]);
            let hasMore = true;
            if (parseInt(req.query.offset) + parseInt(req.query.limit) > orders.length) {
                hasMore = false;
            }
            res.send({
                code: 0,
                msg: '获取成功',
                limit: parseInt(req.query.limit),
                offset: parseInt(req.query.offset),
                page: parseInt(req.query.offset) / parseInt(req.query.limit) + 1,
                pageNum: Math.ceil(orders.length / req.query.limit),
                total: orders.length,
                hasMore: hasMore,
                data: orders.slice(parseInt(req.query.offset) - 1, parseInt(req.query.offset) - 1 + parseInt(req.query.limit))
            });
        } else {
            res.send({code: 1, msg: '此用户不存在！'});
        }
    });
});

//获取订单信息
orderRoutes.get(urls.getOrderRoute, (req, res) => {
    //uid参数错误
    if (typeof req.query.uid === 'undefined' || isNaN(parseInt(req.query.uid)) || parseInt(req.query.uid) < 0) return res.send({
        code: 1,
        msg: 'uid参数错误！'
    });
    //oid参数错误
    if (typeof req.query.oid === 'undefined' || isNaN(parseInt(req.query.oid)) || parseInt(req.query.oid) < 0) return res.send({
        code: 1,
        msg: 'oid参数错误！'
    });
    let allUsers = [];
    read((err, data) => {
        if (err) return res.send({code: 1, msg: '服务器出现错误！'});
        allUsers = data;
        let user = allUsers.find(item => item.uid === parseInt(req.query.uid));
        if (user) {
            let order = user.orders.find(item => item.oid === parseInt(req.query.oid));
            if (order) {
                return res.send({
                    code: 0,
                    msg: '获取成功',
                    data: order
                });
            } else {
                return res.send({code: 1, msg: '此订单不存在！'});
            }
        } else {
            res.send({code: 1, msg: '此用户不存在！'});
        }
    });
});

//更改订单状态
orderRoutes.post(urls.changeStateRoute, (req, res) => {
    //uid数据错误
    if (typeof req.body.uid === 'undefined' || isNaN(parseInt(req.body.uid)) || parseInt(req.body.uid) < 0) return res.send({
        code: 1,
        msg: 'uid数据错误！'
    });
    //oid数据错误
    if (typeof req.body.oid === 'undefined' || isNaN(parseInt(req.body.oid)) || parseInt(req.body.oid) < 0) return res.send({
        code: 1,
        msg: 'oid数据错误！'
    });
    //state数据错误
    if (parseInt(req.body.state) !== 0 && parseInt(req.body.state) !== 1 && parseInt(req.body.state) !== 2) return res.send({
        code: 1,
        msg: 'state数据错误！'
    });
    let allUsers = [];
    read((err, data) => {
        if (err) return res.send({code: 1, msg: '服务器出现错误！'});
        allUsers = data;
        let user = allUsers.find(item => item.uid === parseInt(req.body.uid));
        if (user) {
            let order = user.orders.find(item => item.oid === parseInt(req.body.oid));
            if (order) {
                order.state = state[parseInt(req.body.state)];
                write(allUsers, (err) => {
                    if (err) return res.send({code: 1, msg: '服务器出现错误！'});
                    res.send({code: 0, msg: '修改成功'});
                });
            } else {
                res.send({code: 1, msg: '此订单不存在！'});
            }
        } else {
            res.send({code: 1, msg: '此用户不存在！'});
        }
    });
});

//创建新订单
orderRoutes.post(urls.addOrderRoute, (req, res) => {
    //uid数据错误
    if (typeof req.body.uid === 'undefined' || isNaN(parseInt(req.body.uid)) || parseInt(req.body.uid) < 0) return res.send({
        code: 1,
        msg: 'uid数据错误！'
    });
    //totalPrice数据错误
    if (typeof req.body.totalPrice === 'undefined' || isNaN(parseInt(req.body.totalPrice)) || parseInt(req.body.totalPrice) < 0) return res.send({
        code: 1,
        msg: 'totalPrice数据错误！'
    });
    //discount数据错误
    if (typeof req.body.discount === 'undefined' || isNaN(parseInt(req.body.discount)) || parseInt(req.body.discount) < 0) return res.send({
        code: 1,
        msg: 'discount数据错误！'
    });
    //list数据错误
    if (typeof req.body.list === 'undefined' || !(req.body.list instanceof Array)) return res.send({
        code: 1,
        msg: 'list数据错误！'
    });
    let allUsers = [];
    read((err, data) => {
        if (err) return res.send({code: 1, msg: '服务器出现错误！'});
        allUsers = data.length > 0 ? data : [];
        let user = allUsers.find(item => item.uid === parseInt(req.body.uid));
        if (!user) {
            console.log(1);
            user = {uid: req.body.uid};
            let tempUsers = fs.readFileSync('./mock/userList.json', 'utf8');
            if (!tempUsers) return res.send({code: 1, msg: '服务器出现错误！'});
            tempUsers = JSON.parse(tempUsers);
            let tempUser = tempUsers.find(item => item.uid === user.uid);
            if (!tempUser) return res.send({code: 1, msg: '用户不存在！'});
            user.phone = tempUser.phone;
            user.isVIP = tempUser.isVIP;
            user.address = tempUser.address;
            allUsers.push(user);
        }
        user.orders = user.orders || [];
        let order = {
            oid: user.orders.length > 0 ? parseInt(user.orders[user.orders.length - 1].oid) + 1 : 1,
            date: getTime(),
            state: "unpaid",
            totalPrice: req.body.totalPrice,
            discount: req.body.discount,
            list: req.body.list
        };
        user.orders.push(order);
        write(allUsers, (err) => {
            if (err) return res.send({code: 1, msg: '服务器出现错误！'});
            res.send({code: 0, msg: '创建订单成功'});
        });
    });
});

module.exports = orderRoutes;