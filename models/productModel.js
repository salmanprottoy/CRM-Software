const db = require('./db');

module.exports ={

	getById: function(id, callback){
		var sql = "select * from product where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from product";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	insert: function(product, callback){
		var sql = "insert into product VALUES ('', '"+product.productCode+"' , '"+product.productName+"' , '"+product.productVendor+"', '"+product.quantityInStock+"', '"+product.buyPrice+"', '"+product.sellPrice+"', '"+product.productDescription+"', '"+product.productImage+"')";

		db.execute(sql, function(status){
			callback(status);
		});
	} ,
	update: function(product, callback){
		var sql = "update product set productCode='"+product.productCode+"' , productName='"+product.productName+"' , productVendor='"+product.productVendor+"', quantityInStock='"+product.quantityInStock+"', buyPrice='"+product.buyPrice+"', sellPrice='"+product.sellPrice+"', productDescription='"+product.productDescription+"', productImage='"+product.productImage+"' where id = '"+product.id+"'";
		db.execute(sql, function(status){
			callback(status)
		});

    },
    delete: function(id, callback){
		var sql = "DELETE FROM product WHERE id = '"+id+"'";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},
	search: function(product, callback){
		var sql = "SELECT * FROM product WHERE "+product.searchBy+" LIKE '%"+product.search+"%'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
	}
}