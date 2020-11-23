const express = require('express');
const salaryModel	= require.main.require('./models/salaryModel');
const router = express.Router();

router.post('/search',(req,res)=>{
	var salary = {
		search : req.body.search,
		searchBy: req.body.searchBy
	};
	salaryModel.search(salary, function(results){
		if(results){
			res.json({salary: results});
		}else{
			res.json({salary:'error'});
		}
	});
});

module.exports = router;