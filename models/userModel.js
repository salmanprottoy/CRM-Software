const db = require('./db');

module.exports ={

	validate: function(user, callback){
		var sql = "select * from user where username='"+user.username+"' and password='"+user.password+"'";
		//console.log(sql);
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(true,results);
			}else{
				
				
			}
		});
	},
	getById: function(id, callback){
		var sql = "select * from user where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from user";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	insert: function(user, callback){
		var sql = "insert into user VALUES ('', '"+user.username+"' , '"+user.password+"' , '"+user.type+"','','','','')";
		
		console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql = "update user set username='"+user.username+"' , contactNumber='"+user.phone+"', email='"+user.email+"' , designation='"+user.designation+"' where id = '"+user.id+"'";
		db.execute(sql,function(status){
			callback(status)
		});

	},
	delete: function(id, callback){
		var sql = "DELETE FROM user WHERE id = '"+id+"'";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	}
}