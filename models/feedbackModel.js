const db = require('./db');

module.exports ={

	validate: function(user, callback){
		var sql = "select * from adminuser where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getById: function(id, callback){
		var sql = "select * from feedback where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from feedback";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	insert: function(user, callback){
		var sql = "insert into subscriber VALUES ('', '"+user.type+"' , '"+user.cname+"' , '"+user.cemail+"' , '"+user.cmobile+"', '"+user.caddress+"', '"+user.cmname+"'  )";
		
		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql = "update feedback set isSolved='"+user.isSolved+"'  where id = '"+user.id+"'";
		db.execute(sql,function(status){
			callback(status)
		});

	},
	delete: function(id, callback){
		var sql = "DELETE FROM feedback WHERE id = '"+id+"'";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	}
}