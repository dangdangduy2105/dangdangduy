const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()
const Handlebars = require('handlebars');
const multiparty = require('multiparty');
const path = require('path');
var secret = require('./secret.js')

// app.engine('handlebars', handlebars.engine);
app.engine('handlebars', expressHandlebars({

    defaultLayout: 'main',
    
}))
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('cookie-parser')(secret.cookieSecret));
app.use(require('express-session')({saveUninitialized: false, resave: true, secret: secret.sessionSecret}))
//

//
let products = [
    {id: '1', name: 'iPhone XS', price: '1,199', image:''},
    {id: '2', name: 'iPhone 12', price: '1,399', image:''},
    {id: '3', name: 'Macbook Pro 13" M1', price: '1,299', image:''},
    {id: '4', name: 'Airpod Pro', price: '499', image:''},
]



//
// app.use((req, res, next) => {
//     res.locals.msg = req.session.msg || '';
//     delete req.session.msg
//     next();
// })
//mainpage
app.get('/', (req, res) => {
    // if(!req.session.username){
    //     return res.redirect('/login')
    // }
    res.render('sanpham', {products})

})

//login
// app.get('/login', (req, res) => {

//     res.render('login')

// })

// app.post('/login', (req, res) =>{

//     user = {us: process.app.get('/add', (req, res) => {

//         res.render('add') 
    
//     }).username, ps: process.env.password}
    
//     user = {us: process.env.username, ps: process.env.password}
//     userLogin = {username: req.body.username, password: req.body.password}
    
//     if(userLogin.username == user.us && userLogin.password == user.ps){
        
//         req.session.username = userLogin.username

//         return res.redirect('/')
//     }

//     res.render('login', {...userLogin, msg:"Invalid username or password"})
// })
//
app.get('/:id', (req, res) => {

    // if(!req.session.username){
        
    //     return res.redirect('/login')

    // }

    let spid = parseInt(req.params.id)

    let sp = products.find(s => s.id == spid)

    if(!sp){
        return res.redirect('/')
    }

    res.render('chitiet', sp)

})
//
app.get('/add', (req, res) => {

    res.render('themsanpham')

})
app.post('/add', (req, res) => {

    let sp = ({
        id: req.body.id, 
        name: req.body.name, 
        price: req.body.price, 
        image: req.body.image
    })

    if(!sp.id || !sp.name || sp.price){
        let msg = {
            intro: "Lỗi",
            message: "Chưa nhập đủ thông tin"
        }
        return res.render('themsanpham', {...sp, msg})
    }
    let old = products.find(s => s.id == sp.id)
    if(old){
        let msg = {
            intro: "Lỗi",
            message: "Trùng sản phẩm đang có"
        }
        return res.render('themsanpham', {...sv, msg})
    }
    products.push(sp)
    req.session.msg = {
        intro: "Đã lưu",
        message: "Đã lưu sản phẩm" + sp.id
    }
    res.redirect(301, '/')

})

//

//
app.use((req, res) =>

    res.status(404).send('Đường dẫn không hợp lệ')

)
//
app.listen(8080, () => console.log(

    'Express started on http://localhost:${port}; ' +
    'press Ctrl-C to terminate. '))