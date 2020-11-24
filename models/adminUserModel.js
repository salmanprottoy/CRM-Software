const db = require('./db');

module.exports ={

	validate: function(user, callback){
		var sql = "select * from adminuser where username='"+user.username+"' and password='"+user.password+"'";
		console.log(sql);
		db.getResults(sql, function(results){
			if(results.length > 0){
				// callback(true);
			//	console.log("validate hoise");
				callback(results[0]);
				//console.log(results[0]);
			}else{
				callback(false);
			}
		});
	},

	// validate: function(user, callback){
	// 	var sql = "select * from user where username='"+user.username+"' and password='"+user.password+"'";
	// 	db.getResults(sql, function(results){
	// 		if(results.length > 0){
	// 			callback(true);
	// 		}else{
	// 			callback(false);
	// 		}
	// 	});
	// },
	getById: function(id, callback){
		var sql = "select * from adminuser where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from adminuser";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	getById: function(id, callback){
		var sql = "select * from adminuser where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	insert: function(user, callback){
		var sql = "insert into adminuser VALUES ('', '"+user.username+"' , '"+user.password+"' , '"+user.type+"')";
		
		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql = "update adminuser set username='"+user.username+"' , password='"+user.password+"' , type='"+user.type+"' where id = '"+user.id+"'";
		db.execute(sql,function(status){
			callback(status)
		});

	},
	delete: function(id, callback){
		var sql = "DELETE FROM adminuser WHERE id = '"+id+"'";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	}
}