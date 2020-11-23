const express 		= require('express');
const pdf			= require('html-pdf');
const pdfDocument	= require('pdfkit');
var option			= {format: 'A4'};
const fs			= require('fs');
const customerModel	= require.main.require('./models/customerModel');
const router 		= express.Router();

router.get('/create', (req, res)=>{
	res.render('customer/create'); 
})

router.post('/create', (req, res)=>{

	var customer = {
		customerName            : 	req.body.customerName,
		customerContactNumber   : 	req.body.customerContactNumber,
		customerAddress	        : 	req.body.customerAddress
	};

	customerModel.insert(customer, function(status){
		if(status){
			res.redirect('/accountingSellsHome/customer');
		}else{
			res.redirect('customer/create');
		}
	});
})

router.get('/createPdf', (req, res)=>{

	res.render('customerList-pdf',{result:req.body.table}, function(err,html){
		pdf.create(html, options).toFile('./assets/uploads/customerList.pdf', function(err, res) {
			if (err) {
				return console.log(err);
			}
			else{
				console.log(res); // { filename: '/app/businesscard.pdf' }
				var dataFile = fs.readFileSync('./assets/uploads/customerList.pdf');
				res.header = ('content-type','application/pdf');
				res.send(dataFile);
			}
			
		  });
	})

})

router.get('/edit/:id', (req, res)=>{

	
	customerModel.getById(req.params.id,function(result){

		var customer ={
			customerName            : 	result.customerName,
			customerContactNumber   : 	result.customerContactNumber,
			customerAddress	        : 	result.customerAddress
		};

		res.render('customer/edit', customer);
	});
})


router.post('/edit/:id', (req, res)=>{

	var customer = {
		id		                :	req.params.id,
		customerName            : 	req.body.customerName,
		customerContactNumber   : 	req.body.customerContactNumber,
		customerAddress	        : 	req.body.customerAddress
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
			customerAddress	        : 	result.customerAddress
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