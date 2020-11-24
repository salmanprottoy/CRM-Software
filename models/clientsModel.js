const db = require('./db');

module.exports ={

	validate: function(user, callback){
		var sql = "select * from user where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(true,results);
			}else{
				callback(false,results);
			}
		});
	},
	getById: function(table,id,callback){
		var sql = "select * from "+table+" where id='"+id+"'";
		db.getResults(sql,function(results){
			callback(results);
		})
	},
	getAll: function(tablename,callback){
		var sql = "select * from "+tablename+"";
		console.log(sql);
		db.getResults(sql, function(results){
			console.log(results);
			callback(results);
		});

	},
	insert: function(user,tab, callback){
		var sql="";
		if(tab=='leads') sql = "insert into "+tab+" VALUES ('', '"+user.name+"' , '"+user.email+"' , '"+user.phone+"' , '"+user.status+"', '"+user.gender+"')";
		else sql="insert into customer VALUES ('', '"+user.name+"' , '"+user.phone+"' , 'DHAKA' ,'"+user.email+"' , 'customer' , '"+user.gender+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update: function(user,table,callback){
		var sql ="";
		if(table=='leads') sql="update "+table+" set name='"+user.name+"' , email='"+user.email+"' , phone='"+user.phone+"' , status='"+user.status+"', gender='"+user.gender+"' where id = '"+user.id+"' ;";
		else sql="update "+table+" set customerName='"+user.name+"' , customerEmail='"+user.email+"' , customerContactNumber='"+user.phone+"' , customerStatus='"+user.status+"', customerGender='"+user.gender+"' where id = '"+user.id+"' ;";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		})
	},
	updatebyid: function(tab,id,callback){
		var stat="";
		var sql = "select * from "+tab+" where id='"+id+"'";
		db.getResults(sql,function(results){
		 	stat=results[0].status;
		 	if(stat=="normal")
			 {
			 	var sql="update "+tab+" set status='Potential' where id= '"+id+"'";
			 	db.execute(sql,function(status){
				callback(status);
				})
			 }
			 else
			 {
			 	var user=results[0];
			 	var sql = "delete from "+tab+" where id = '"+id+"';";
				db.execute(sql,function(status){
					if(status)
					{

						var sql2 = "insert into customer VALUES ('', '"+user.name+"' , '"+user.phone+"' , 'DHAKA' ,'"+user.email+"' , 'customer' , '"+user.gender+"')";
						console.log(sql2);
						db.execute(sql2, function(status){
							if(status)
							{
								callback(status);
							}
						});
					}
				})
			 }
		})
	},
	delete: function(id,tab,callback){
		var sql = "delete from "+tab+" where id = '"+id+"';";
		db.execute(sql,function(status){
			callback(status);
		})
	}
}