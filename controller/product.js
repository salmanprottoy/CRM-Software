const express 					= require('express');
const {check, validationResult} = require('express-validator');
const productModel				= require.main.require('./models/productModel');
const router 					= express.Router();

router.get('/create', (req, res)=>{
	res.render('product/create'); 
})

router.post('/create',[
	check('productCode','Product Code can not be null').not().isEmpty().trim().escape(),
	check('productName','Product Name must be atleast 4 characters long').exists().isLength({min:4}),
	check('productVendor','Product Vendor must be atleast 4 characters long').exists().isLength({min:4}),
	check('quantityInStock','Quantity In Stock can not be null').not().isEmpty().trim().escape(),
	check('buyPrice','Buy Price can not be null').not().isEmpty().trim().escape(),
	check('sellPrice','Sell Price can not be null').not().isEmpty().trim().escape(),
	check('productDescription','Product Description can not be null').not().isEmpty().trim().escape()
], (req, res)=>{

	const errors = validationResult(req);
	if(!errors.isEmpty()){
		const alerts= errors.array();
		res.render('product/create',{alerts}); 
	}else{

		var product = {
			productCode         : 	req.body.productCode,
			productName         : 	req.body.productName,
			productVendor	    : 	req.body.productVendor,
			quantityInStock	    :	req.body.quantityInStock,
			buyPrice            : 	req.body.buyPrice,
			sellPrice           : 	req.body.sellPrice,
			productDescription  : 	req.body.productDescription,
			productImage        : 	req.body.productImage
		};

		productModel.insert(product, function(status){
			if(status){
				res.redirect('/accountingSellsHome/product');
			}else{
				res.redirect('product/create');
			}
		});
	}
})

router.get('/edit/:id', (req, res)=>{
	
	productModel.getById(req.params.id,function(result){

		var product ={
			productCode            : 	result.productCode,
			productName            : 	result.productName,
            productVendor	       : 	result.productVendor,
            quantityInStock        : 	result.quantityInStock,
			buyPrice               : 	result.buyPrice,
            sellPrice	           : 	result.sellPrice,
            productDescription     : 	result.productDescription,
			productImage	       : 	result.productImage
		};

		res.render('product/edit', product);
	});
})


router.post('/edit/:id', (req, res)=>{

	var product = {
		id		            :	req.params.id,
		productCode         : 	req.body.productCode,
		productName         : 	req.body.productName,
        productVendor	    : 	req.body.productVendor,
        quantityInStock	    :	req.body.quantityInStock,
		buyPrice            : 	req.body.buyPrice,
        sellPrice           : 	req.body.sellPrice,
        productDescription  : 	req.body.productDescription,
		productImage        : 	req.body.productImage
	};
	productModel.update(product, function(status){
		
		if(status){
			res.redirect('/accountingSellsHome/product');
		}else{
			res.render('product/edit', product);
		}
	});
})

router.get('/delete/:id', (req, res)=>{
	productModel.getById(req.params.id,function(result){

		var product ={
			productCode            : 	result.productCode,
			productName            : 	result.productName,
            productVendor	       : 	result.productVendor,
            quantityInStock        : 	result.quantityInStock,
			buyPrice               : 	result.buyPrice,
            sellPrice	           : 	result.sellPrice,
            productDescription     : 	result.productDescription,
			productImage	       : 	result.productImage
		};

		res.render('product/delete', product);
	});

})

router.post('/delete/:id', (req, res)=>{
	
	productModel.delete(req.params.id,function(status){
		if(status){
			res.redirect('/accountingSellsHome/product');
        }
	});
	
})

router.post('/search',(req,res)=>{
	var product = {
		search : req.body.search,
		searchBy: req.body.searchBy
	};
	productModel.search(product, function(results){
		if(results){
			res.json({product: results});
		}else{
			res.json({product:'error'});
		}
	});
});


module.exports = router;