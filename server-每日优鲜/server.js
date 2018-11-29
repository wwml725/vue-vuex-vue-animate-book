const express = require('express');
const fs = require('fs');
const app = express();
//中间件
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// //路由
// const userRoutes = require('./routes/user');
// const goodsRoutes = require('./routes/goods');
// const orderRoutes = require('./routes/order');

app.use(function (req, res, next) {
    //如果客户端要向服务器发送cookie的话，绝不对写*
    res.header('Access-Control-Allow-Origin', "http://localhost:8080");
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
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'missfresh',
    cookie: {maxAge: 1000 * 60 * 60},
}));
app.use(express.static('build'));

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.body);
    console.log(req.query);
    if (!req.session.users) {
        req.session.users = [];
    }
    next();
});

//路由
const userRoutes = require('./routes/user');
const goodsRoutes = require('./routes/goods');
const orderRoutes = require('./routes/order');
//路由
app.use('/api/user', userRoutes);
app.use('/api/goods', goodsRoutes);
app.use('/api/order', orderRoutes);

app.listen(9999, () => {
    console.log('Service Start! Port: 9999');
});
