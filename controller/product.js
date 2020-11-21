const express = require('express');
const productModel	= require.main.require('./models/productModel');
const router = express.Router();

router.get('/create', (req, res)=>{
	res.render('product/create'); 
})

router.post('/create', (req, res)=>{

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


module.exports = router;