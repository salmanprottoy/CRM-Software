//declaration
const express 				= require('express');
const explayouts			= require('express-ejs-layouts');
const bodyParser 			= require('body-parser');
const exSession 			= require('express-session');
const cookieParser		 	= require('cookie-parser');
const pdfDocument     		= require('pdfkit');
const fs					= require('fs');
const login					= require('./controller/login');
const signup				= require('./controller/signup');
const forgotPassword		= require('./controller/forgotPassword');
const home					= require('./controller/home');
const accountingSellsHome	= require('./controller/accountingSellsHome');
const logout				= require('./controller/logout');
const user					= require('./controller/user');
const customer				= require('./controller/customer');
const product				= require('./controller/product');
const bankInfo				= require('./controller/bankInfo');
const salary				= require('./controller/salary');
const app 					= express();

app.use(explayouts);
//config
// app.set('layouts')
app.set('view engine', 'ejs');


//middleware

app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(exSession({secret: 'my secret value', saveUninitialized: true, resave: false }));
app.use(cookieParser());

app.use('/login', login);
app.use('/signup', signup);
app.use('/forgotPassword', forgotPassword);
app.use('/home', home);
app.use('/accountingSellsHome', accountingSellsHome);
app.use('/logout', logout);
app.use('/user', user);
app.use('/customer', customer);
app.use('/product', product);
app.use('/bankInfo', bankInfo);
app.use('/salary', salary);

//route
app.get('/', (req, res)=>{
	res.send('Hello from express server');	
});

//server startup
app.listen(3000, (error)=>{
	console.log('express server started at 3000...');
});