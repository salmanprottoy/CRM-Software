const db = require('./db');

module.exports ={

	getById: function(id, callback){
		var sql = "select * from bankinfo where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from bankinfo";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	update: function(bankInfo, callback){
		var sql = "update bankinfo set accountName='"+bankInfo.accountName+"' , accountNumber='"+bankInfo.accountNumber+"' , bankName='"+bankInfo.bankName+"' where id = '"+bankInfo.id+"'";
		db.execute(sql, function(status){
			callback(status)
		});
	},
	search: function(bankInfo, callback){
		var sql = "SELECT * FROM bankinfo WHERE "+bankInfo.searchBy+" LIKE '%"+bankInfo.search+"%'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
	}
}