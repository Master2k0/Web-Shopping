// var MongoClient = require('mongodb').MongoClient; 
// var url = "mongodb://127.0.0.1:27017/"; 
// MongoClient.connect(url, function(err, db) { 
//      if (err) throw err; var dbo = db.db("shopping"); 
//      var myobj = { 
//           fullname: 'admin', 
//           img:'', 
//           email:'sontranbeou1@gmail.com', 
//           password:'$2b$10$Hsjy6oOttwiip7Leh4MbTeMwYIBKI0ziP3DWvNhhCoeOodzmB33ai' }; 
//           dbo.collection("user").insertOne(myobj, function(err, response) { if (err) throw err; 
//                res.send('1 document inserted'); db.close(); 
//           }); 
//      });

var MongoClient = require('mongodb').MongoClient; 
var url = "mongodb://127.0.0.1:27017/"; 
MongoClient.connect(url, function(err, db) { 
     if (err) throw err; var dbo = db.db("shopping"); 
     var myobj = { 
          fullname: 'admin', 
          img:'Thinh.png', 
          email:'18421447@gm.uit.edu.vn', 
          password:'$2y$12$uP5DIv86.dZSeLNN3Ogvh.Yb/TULqZxR5ZqkiHFs904H.rt8pNBOe' }; 
          dbo.collection("user").insertOne(myobj, function(err, response) { if (err) throw err; 
               res.send('1 document inserted'); db.close(); 
          }); 
     });
