const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
	orgin:"file:///F:/Sanaullah%20Projects/Friend's%20List/client/friends.html",
	methods: ['GET','POST','DELETE']
}));

app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "friends"
});

con.connect(function(err) {
  if(err){
      console.log("Something fishy going around into our database. Connection Issue!");
  }
  else{
      console.log("Connected!");
  }
  
});
  
app.post('/post',(req,res)=>{
    const crfname = req.body.crfname;
    const crfage = req.body.crfage;
    const crfclass = req.body.crfclass;

    const sql = `INSERT INTO flist (name,age,class) VALUES ("${crfname}",${crfage},${crfclass})`;
      con.query(sql, function (err, result) {
        if (err){
          console.log("query error. Data not inserted!!",err)
        }
        else{
          console.log("1 record inserted");
        }
      });
    
});

app.get('/get',(req,res)=>{
  const sql = `SELECT * from flist`;
  con.query(sql, function (err, result) {
    if (err){
      console.log("query error. Data not sent!!",err)
    }
    else{
      console.log("Data Sent...");
      res.send(result);
    }
  });
})

app.delete('/delete/:name',(req,res)=>{
  const name = req.params.name;

  console.log(name);

  const sql = `DELETE from flist where name="${name}"`;
  con.query(sql,function(err,data){
    if(err){
      console.log("query error. Data not deleted!");
    }
    else{
      console.log("1 record deleted!");
    }
  })

})

app.post('/update',(req,res)=>{
  const upname = req.body.upname;
  const upage = req.body.upage;
  const upclass = req.body.upclass;
  const keyAsName = req.body.keyAsName;

  const sql = `UPDATE flist SET name="${upname}",age=${upage},class=${upclass} WHERE name="${keyAsName}"`;
  con.query(sql, function (err, result) {
    if (err){
      console.log("query error. Data not sent!!",err)
    }
    else{
      console.log("Updated...");
      res.send("Updated!!!");
    }
  });

})

app.listen(3000,()=>{
  console.log('server is running on port 3000');
});

