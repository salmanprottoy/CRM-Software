const db = require('./db');

module.exports ={

	getById: function(id, callback){
		var sql = "select * from customer where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from customer";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	insert: function(customer, callback){
		var sql = "insert into customer VALUES ('', '"+customer.customerName+"' , '"+customer.customerContactNumber+"' , '"+customer.customerAddress+"' , '"+customer.customerEmail+"' , '"+customer.customerStatus+"' , '"+customer.customerGender+"')";

		db.execute(sql, function(status){
			console.log(sql, status);
			callback(status);
		});
	} ,
	update: function(customer, callback){
		var sql = "update customer set customerName='"+customer.customerName+"' , customerContactNumber='"+customer.customerContactNumber+"' , customerAddress='"+customer.customerAddress+"' , customerEmail='"+customer.customerEmail+"' , customerStatus='"+customer.customerStatus+"' , customerGender='"+customer.customerGender+"' where id = '"+customer.id+"'";
		db.execute(sql, function(status){
			callback(status)
		});

	},
	delete: function(id, callback){
		var sql = "DELETE FROM customer WHERE id = '"+id+"'";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},
	search: function(customer, callback){
		var sql = "SELECT * FROM customer WHERE "+customer.searchBy+" LIKE '%"+customer.search+"%'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
	}
}