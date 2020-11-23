const express 		= require('express');
const pdfDocument	= require('pdfkit');
var fs				= require('fs');
var pdf 			= require('html-pdf');
var html 			= fs.readFileSync('././views/accountingSellsHome/customer.ejs', 'utf8');
var options 		= { format: 'A4' };
const customerModel	= require.main.require('././models/customerModel');
const {check, validationResult} = require('express-validator');
const router 		= express.Router();

router.get('/create', (req, res)=>{
	res.render('customer/create'); 
})

router.post('/create',[
	check('customerName','Customer Name can not be null').not().isEmpty().trim().escape(),
	check('customerContactNumber','Customer Number can not be null').not().isEmpty().trim().escape(),
	check('customerAddress','Customer Address can not be null').not().isEmpty().trim().escape(),
	check('customerEmail','Customer Email can not be null').not().isEmpty().trim().escape(),
	check('customerStatus','Customer Status can not be null').not().isEmpty().trim().escape(),
	check('customerGender','Customer Gender can not be null').not().isEmpty().trim().escape(),
], (req, res)=>{

	const errors = validationResult(req);
	if(!errors.isEmpty()){
		const alerts= errors.array();
		res.render('customer/create',{alerts}); 
	}else{

		var customer = {
			customerName            : 	req.body.customerName,
			customerContactNumber   : 	req.body.customerContactNumber,
			customerAddress	        : 	req.body.customerAddress,
			customerEmail	        : 	req.body.customerEmail,
			customerStatus	        : 	req.body.customerStatus,
			customerGender	        : 	req.body.customerGender
		};

		customerModel.insert(customer, function(status){
			if(status){
				res.redirect('/accountingSellsHome/customer');
			}else{
				res.redirect('/customer/create');
			}
		});
	}
})

router.get('/edit/:id', (req, res)=>{

	
	customerModel.getById(req.params.id,function(result){

		var customer ={
			customerName            : 	result.customerName,
			customerContactNumber   : 	result.customerContactNumber,
			customerAddress	        : 	result.customerAddress,
			customerEmail           : 	result.customerEmail,
			customerStatus   		: 	result.customerStatus,
			customerGender	        : 	result.customerGender
		};

		res.render('customer/edit', customer);
	});
})


router.post('/edit/:id', (req, res)=>{

	var customer = {
		id		                :	req.params.id,
		customerName            : 	req.body.customerName,
		customerContactNumber   : 	req.body.customerContactNumber,
		customerAddress	        : 	req.body.customerAddress,
		customerEmail	        : 	req.body.customerEmail,
		customerStatus	        : 	req.body.customerStatus,
		customerGender	        : 	req.body.customerGender
	};
	customerModel.update(customer, function(status){
		
		if(status){
			res.redirect('/accountingSellsHome/customer');
		}else{
			res.render('customer/edit', customer);
		}
	});
})

router.get('/delete/:id', (req, res)=>{
	customerModel.getById(req.params.id,function(result){

		var customer ={
			customerName            : 	result.customerName,
			customerContactNumber   : 	result.customerContactNumber,
			customerAddress	        : 	result.customerAddress,
			customerEmail           : 	result.customerEmail,
			customerStatus   		: 	result.customerStatus,
			customerGender	        : 	result.customerGender
		};

		res.render('customer/delete', customer);
	});

})

router.post('/delete/:id', (req, res)=>{
	
	customerModel.delete(req.params.id,function(status){
		if(status){
			res.redirect('/accountingSellsHome/customer');
		}
	});
	
})

router.post('/search',(req,res)=>{
	var customer = {
		search : req.body.search,
		searchBy: req.body.searchBy
	};
	customerModel.search(customer, function(results){
		if(results){
			res.json({customer: results});
		}else{
			res.json({customer:'error'});
		}
	});
});

module.exports = router;