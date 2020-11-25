const db = require('./db');

module.exports ={

	getCountProduct: function(callback){
        var sql = "SELECT COUNT(*) as count from product";
        console.log(sql);
		db.getResults(sql, function(results){
			callback(results);
		});
    },
    getInventory: function(callback){
        var sql = "SELECT SUM(quantityInStock) as inventory from product";
        console.log(sql);
		db.getResults(sql, function(results){
			callback(results);
		});
    },
    getCountCustomer: function(callback){
        var sql = "SELECT COUNT(*) as count from customer";
        console.log(sql);
		db.getResults(sql, function(results){
			callback(results);
		});
    }
}