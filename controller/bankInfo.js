const express = require('express');
const bankModel	= require.main.require('./models/bankModel');
const router = express.Router();

router.get('/edit/:id', (req, res)=>{

	
	bankModel.getById(req.params.id,function(result){

		var bankInfo ={
			accountName      : 	result.accountName,
			accountNumber    : 	result.accountNumber,
			bankName	     : 	result.bankName
		};

		res.render('bankInfo/edit', bankInfo);
	});
})


router.post('/edit/:id', (req, res)=>{

	var bankInfo = {
		id		        :	req.params.id,
		accountName     : 	req.body.accountName,
		accountNumber   : 	req.body.accountNumber,
		bankName	    : 	req.body.bankName
	};
	bankModel.update(bankInfo, function(status){
		
		if(status){
			res.redirect('/accountingSellsHome/bankInfo');
		}else{
			res.render('bankInfo/edit', bankInfo);
		}
	});
})

router.post('/search',(req,res)=>{
	var bankInfo = {
		search : req.body.search,
		searchBy: req.body.searchBy
	};
	bankModel.search(bankInfo, function(results){
		if(results){
			res.json({bankInfo: results});
		}else{
			res.json({bankInfo:'error'});
		}
	});
});

module.exports = router;