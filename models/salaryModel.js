const db = require('./db');

module.exports ={


	getById: function(id, callback){
		var sql = "select * from salary where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from salary";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	update: function(salary, callback){
		var sql = "update salary set employeeId='"+salary.employeeId+"' , salaryGrade='"+salary.salaryGrade+"' , salaryMin='"+salary.salaryMin+"', salaryMax='"+salary.salaryMax+"' where id = '"+salary.id+"'";
		db.execute(sql,function(status){
			callback(status)
		});

	},
	search: function(salary, callback){
		var sql = "SELECT * FROM salary WHERE "+salary.searchBy+" LIKE '%"+salary.search+"%'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
	}
}