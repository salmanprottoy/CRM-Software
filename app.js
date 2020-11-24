//declaration
const express 		= require('express');
const explayouts          = require('express-ejs-layouts');
const bodyParser 	= require('body-parser');
const exSession 	= require('express-session');
const cookieParser 	= require('cookie-parser');
const nodemailer 				= require("nodemailer");
const {check,validationResult}	=require('express-validator');
const fastcsv 					= require("fast-csv");
const fs 						= require("fs");
const expfileupload			= require('express-fileupload');
const pdf 					= require('html-pdf');
const pdfDocument     		= require('pdfkit');
const user					= require('./controller/user');
const login					= require('./controller/login');
const home					= require('./controller/home');
const logout				= require('./controller/logout');
const markethome			= require('./controller/marketing/markethome');
const campaigns				= require('./controller/marketing/campaigns');
const clients				= require('./controller/marketing/clients');
const signup				= require('./controller/signup');
const forgotPassword		= require('./controller/forgotPassword');
const accountingSellsHome	= require('./controller/accountingSellsConrtoller/accountingSellsHome');
const customer				= require('./controller/accountingSellsConrtoller/customer');
const product				= require('./controller/accountingSellsConrtoller/product');
const bankInfo				= require('./controller/accountingSellsConrtoller/bankInfo');
const salary				= require('./controller/accountingSellsConrtoller/salary');
const admin_home			= require('./controller/admin/admin_home');
const feedbackadmin			= require('./controller/admin/feedback');
const adminuser				= require('./controller/adminUser');
const supAdmin_home			= require('./controller/supAdmin/supAdmin_home');
const supAdmin				= require('./controller/supAdmin/supAdmin');
const admin					= require('./controller/supAdmin/admin');
const subscriber			= require('./controller/supAdmin/subscriber');
const feedback				= require('./controller/supAdmin/feedback');
const package				= require('./controller/supAdmin/package');
const verification			= require('./controller/supAdmin/verification');
const meeting				= require('./controller/supAdmin/meeting');
const registration			= require('./controller/registration');
const app 					= express();

app.use(explayouts);
//config
app.set('view engine', 'ejs');
//middleware
app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(exSession({secret: 'my secret value', saveUninitialized: true, resave: false }));
app.use(cookieParser());
app.use(expfileupload());

app.use('',function(req, res, next) {
  res.locals.glob = req.session.use;
  next();
});

app.use('/user', user);
app.use('/login', login);
app.use('/logout', logout);
app.use('/getstarted',registration);
app.use('/forgotPassword', forgotPassword);
app.use('/home', home);
app.use('/markethome', markethome);
app.use('/campaigns',campaigns);
app.use('/clients',clients);
app.use('/supAdmin_home', supAdmin_home);
app.use('/admin_home', admin_home);
app.use('/adminUser', adminuser);
app.use('/supAdmin_home/supAdmin', supAdmin);
app.use('/supAdmin_home/admin', admin);
app.use('/supAdmin_home/subscriber', subscriber);
app.use('/supAdmin_home/verification', verification);
app.use('/supAdmin_home/feedback', feedback);
app.use('/supAdmin_home/package', package);
app.use('/admin_home/feedback', feedbackadmin);
app.use('/supAdmin_home/meeting', meeting);
app.use('/accountingSellsHome', accountingSellsHome);
app.use('/accountingSellsHome/customer', customer);
app.use('/accountingSellsHome/product', product);
app.use('/accountingSellsHome/bankInfo', bankInfo);
app.use('/accountingSellsHome/salary', salary);

//route
app.get('/', (req, res)=>{
	res.render('login/landing');	
});

//server startup
app.listen(3000, (error)=>{
	console.log('express server started at 3000...');
});