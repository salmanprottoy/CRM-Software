const express 	    = require('express');
const userModel     = require.main.require('./models/userModel');
const customerModel = require.main.require('./models/customerModel');
const productModel  = require.main.require('./models/productModel');
const bankModel     = require.main.require('./models/bankModel');
const salaryModel   = require.main.require('./models/salaryModel');
const router 	    = express.Router();
router.get('/', (req, res)=>{
	
	/* if(req.cookies['uname'] != null){
		res.render('home/index');
	}else{
		res.redirect('/login');
	} */
	res.render('accountingSellsHome/index');
})

router.get('/product', (req, res)=>{
	productModel.getAll(function(results){
        console,console.log(results);
		res.render('accountingSellsHome/product', {productList: results});
	});
})
router.get('/customer', (req, res)=>{

	customerModel.getAll(function(results){
        console,console.log(results);
		res.render('accountingSellsHome/customer', {customerList: results});
	});

})
router.get('/report', (req, res)=>{
	res.render('accountingSellsHome/report'); 
})
router.get('/revenue', (req, res)=>{
	res.render('accountingSellsHome/revenue'); 
})
router.get('/salary', (req, res)=>{
	salaryModel.getAll(function(results){
        console,console.log(results);
		res.render('accountingSellsHome/salary', {salaryList: results});
	});
})
router.get('/bankInfo', (req, res)=>{
	bankModel.getAll(function(results){
        console,console.log(results);
		res.render('accountingSellsHome/bankInfo', {bankInfo: results});
	}); 
})
router.get('/calendar', (req, res)=>{
	res.render('accountingSellsHome/calendar'); 
});

module.exports = router;