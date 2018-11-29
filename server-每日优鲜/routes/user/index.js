const express = require('express');
const fs = require('fs');
const userRoutes = express.Router();
// const urls = {
//     //注册新用户
//     regRoute: '/reg',
//     //登录
//     loginRoute: '/login',
//     //获取用户信息
//     getInfoRoute: '/getInfo',
//     //修改地址
//     updateAddressRoute: '/updateAddress',
//     //更新用户信息
//     updateRoute: '/update',
//     //验证用户是否登录
//     validateRoute: '/validate',
//     //退出登录
//     logoutRoute: '/logout'
// };

const urlNames = require('../urlNames');
const urls = urlNames.userUrlName;

const userListPosition = './mock/userList.json';

let read = callback => {
    fs.readFile(userListPosition, 'utf8', (err, data) => {
        if (data.length === 0) {
            data = [];
        } else {
            data = JSON.parse(data);
        }
        callback(err, data);
    });
};

let write = (data, callback) => {
    fs.writeFile(userListPosition, JSON.stringify(data), callback);
};

//注册新用户
userRoutes.post(urls.regRoute, (req, res) => {
    //phone数据错误
    if (typeof req.body.phone === 'undefined' || typeof req.body.phone !== 'string' || req.body.phone.length !== 11) return res.send({
        code: 1,
        msg: 'phone数据错误！'
    });
    //password数据错误
    if (typeof req.body.password === 'undefined' || typeof req.body.password !== 'string' || req.body.password.length < 6 || req.body.password.length > 18) return res.send({
        code: 1,
        msg: 'password数据错误！'
    });
    //username数据错误
    if (typeof req.body.username === 'undefined' || typeof req.body.username !== 'string' || req.body.username.length === 0) return res.send({
        code: 1,
        msg: 'username数据错误！'
    });
    let user = req.body;
    let users = [];
    read((err, data) => {
        if (err) return res.send({code: 1, msg: '服务器出现错误！'});
        users = data.length > 0 ? data : [];
        let flag = users.find(item => item.phone === user.phone);
        if (flag) return res.send({code: 1, msg: '该手机号已经被注册！'});
        user.uid = users.length > 0 ? parseInt(users[users.length - 1].uid) + 1 : 1;
        user.city = '北京';
        user.address = '';
        user.avatar = 'http://www.shangliushuai.cn/images/Ryan.jpg';
        user.isVIP = false;
        users.push(user);
        write(users, (err) => {
            if (err) return res.send({code: 1, msg: '注册失败'});
            res.send({code: 0, msg: '注册成功'});
        });
    });
});

//登录
userRoutes.post(urls.loginRoute, (req, res) => {
    //phone数据错误
    if (typeof req.body.phone === 'undefined' || typeof req.body.phone !== 'string' || req.body.phone.length !== 11) return res.send({
        code: 1,
        msg: 'phone数据错误！'
    });
    //password数据错误
    if (typeof req.body.password === 'undefined' || typeof req.body.password !== 'string' || req.body.password.length < 6 || req.body.password.length > 18) return res.send({
        code: 1,
        msg: 'password数据错误！'
    });
    let users = [];
    read((err, data) => {
        if (err) return res.send({code: 1, msg: '服务器出现错误！'});
        users = data;
        let user = users.find(item => item.phone === req.body.phone && item.password === req.body.password);
        if (user) {
            req.session.users.push({
                uid: user.uid,
                isVIP: user.isVIP,
                username: user.username
            });
            res.send({
                code: 0, msg: '登录成功', data: {
                    uid: user.uid,
                    isVIP: user.isVIP,
                    username: user.username
                }
            });
        } else {
            res.send({code: 1, msg: '手机号/密码错误！'});
        }
    });
});

//获取用户信息
userRoutes.get(urls.getInfoRoute, (req, res) => {
    //uid参数错误
    if (typeof req.query.uid === 'undefined' || isNaN(parseInt(req.query.uid)) || parseInt(req.query.uid) < 0) return res.send({
        code: 1,
        msg: 'uid参数错误！'
    });
    let users = [];
    read((err, data) => {
        if (err) return res.send({code: 1, msg: '服务器出现错误！'});
        users = data;
        let user = users.find(item => item.uid === parseInt(req.query.uid));
        if (user) {
            res.send({
                code: 0, msg: '获取成功', data: {
                    username: user.username,
                    avatar: user.avatar,
                    phone: user.phone,
                    isVIP: user.isVIP,
                    city: user.city,
                    address: user.address
                }
            });
        } else {
            res.send({code: 1, msg: '此用户不存在！'});
        }
    });
});

//修改地址
userRoutes.post(urls.updateAddressRoute, (req, res) => {
    //uid数据错误
    if (typeof req.body.uid === 'undefined' || isNaN(parseInt(req.body.uid)) || parseInt(req.body.uid) < 0) return res.send({
        code: 1,
        msg: 'uid数据错误！'
    });
    //address数据错误
    if (typeof req.body.address === 'undefined' || req.body.address.length === 0) return res.send({
        code: 1,
        msg: 'address数据错误！'
    });
    let users = [];
    read((err, data) => {
        if (err) return res.send({code: 1, msg: '服务器出现错误！'});
        users = data;
        let user = users.find(item => item.uid === parseInt(req.body.uid));
        if (user) {
            user.address = req.body.address;
            write(users, (err) => {
                if (err) return res.send({code: 1, msg: '服务器出现错误！'});
                res.send({
                    code: 0, msg: '修改地址成功', data: {
                        username: user.username,
                        phone: user.phone,
                        address: user.address
                    }
                });
            });
        } else {
            res.send({code: 1, msg: '此用户不存在！'});
        }
    });
});

//更新用户信息
userRoutes.post(urls.updateRoute, (req, res) => {
    //uid数据错误
    if (typeof req.body.uid === 'undefined' || isNaN(parseInt(req.body.uid)) || parseInt(req.body.uid) < 0) return res.send({
        code: 1,
        msg: 'uid数据错误！'
    });
    //检测是否传入phone
    if (typeof req.body.phone !== 'undefined') {
        //phone数据错误
        if (typeof req.body.phone !== 'string' || req.body.phone.length !== 11) return res.send({
            code: 1,
            msg: 'phone数据错误！'
        });
    }
    //检测是否传入password
    if (typeof req.body.uid !== 'undefined') {
        //password数据错误
        if (typeof req.body.password !== 'string' || req.body.password.length < 6 || req.body.password.length > 18) return res.send({
            code: 1,
            msg: 'password数据错误！'
        });
    }
    //检测是否传入username
    if (typeof req.body.username !== 'undefined') {
        //username数据错误
        if (typeof req.body.username !== 'string' || req.body.username.length === 0) return res.send({
            code: 1,
            msg: 'username数据错误！'
        });
    }
    //检测是否传入avatar
    if (typeof req.body.avatar !== 'undefined') {
        //avatar数据错误
        if (typeof req.body.avatar !== 'string' || req.body.avatar.length === 0) return res.send({
            code: 1,
            msg: 'avatar数据错误！'
        });
    }
    //检测是否传入isVIP
    if (typeof req.body.isVIP !== 'undefined') {
        //isVIP数据错误
        if (typeof req.body.isVIP !== 'boolean') return res.send({
            code: 1,
            msg: 'isVIP数据错误！'
        });
    }
    //检测是否传入city
    if (typeof req.body.city !== 'undefined') {
        //city数据错误
        if (typeof req.body.city !== 'string' || req.body.address.city === 0) return res.send({
            code: 1,
            msg: 'city数据错误！'
        });
    }
    //检测是否传入address
    if (typeof req.body.address !== 'undefined') {
        //address数据错误
        if (typeof req.body.address !== 'string' || req.body.address.length === 0) return res.send({
            code: 1,
            msg: 'address数据错误！'
        });
    }
    let users = [];
    read((err, data) => {
        if (err) return res.send({code: 1, msg: '服务器出现错误！'});
        users = data;
        let user = users.find(item => item.uid === parseInt(req.body.uid));
        if (user) {
            user.phone = req.body.phone || user.phone;
            user.password = req.body.password || user.password;
            user.username = req.body.username || user.username;
            user.avatar = req.body.avatar || user.avatar;
            user.isVIP = req.body.isVIP || user.isVIP;
            user.city = req.body.city || user.city;
            user.address = req.body.address || user.address;
            write(users, (err) => {
                if (err) return res.send({code: 1, msg: '服务器出现错误！'});
                res.send({code: 0, msg: '更新信息成功'});
            });
        } else {
            res.send({code: 1, msg: '此用户不存在！'});
        }
    });
});

//验证用户是否登录
userRoutes.get(urls.validateRoute, (req, res) => {
    //uid参数错误
    if (typeof req.query.uid === 'undefined' || isNaN(parseInt(req.query.uid)) || parseInt(req.query.uid) < 0) return res.send({
        code: 1,
        msg: 'uid参数错误！'
    });
    let user = req.session.users.find(item => item.uid === parseInt(req.query.uid));
    if (user) {
        res.send({code: 0, msg: '此用户已登陆'});
    } else {
        res.send({code: 1, msg: '此用户未登陆！'});
    }
});

//退出登录
userRoutes.get(urls.logoutRoute, (req, res) => {
    //uid参数错误
    if (typeof req.query.uid === 'undefined' || isNaN(parseInt(req.query.uid)) || parseInt(req.query.uid) < 0) return res.send({
        code: 1,
        msg: 'uid参数错误！'
    });
    req.session.users = req.session.users.filter(item => item.uid !== parseInt(req.query.uid));
    let user = req.session.users.find(item => item.uid === parseInt(req.query.uid));
    if (user) {
        res.send({code: 1, msg: '退出登录失败！'});
    } else {
        res.send({code: 0, msg: '退出登录成功'});
    }
});

module.exports = userRoutes;