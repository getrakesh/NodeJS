const express= require('express');
const app=express();
const Joi=require('joi');
const mongoClient=require('mongodb').MongoClient;
//creating client



   

app.use(express.json());

const courses=[
    
    {id:1,name:'Rakesh'},
    {id:2,name:'Imran'},
    {id:3,name:'Mahesh'},
    {id:4,name:'John'},

]


app.get('/',(req,res) =>{
    //const url="mongodb://localhost:27017/mydb";

    // mongoClient.connect(url, { useNewUrlParser: true}, function(err,db){
    //     if (err) 
    //     {
    //         console.log(err);
    //     }
    //       console.log("Database created!");
    //       db.close();
    // });
    //var MongoClient = require('mongodb').MongoClient;

    
           
    1.//Create a database named "mydb1":
    // var urlDB = "mongodb://localhost:27017/mydb1";
    // var MongoClient = require('mongodb').MongoClient;
    // MongoClient.connect(urlDB, function(err, db) {
    //       if (err) throw err;
    //       console.log("Database created!");
    //       db.close();
    //     });
 

    2.//Creatig DB with collection
    var url = "mongodb://localhost:27017/";
    
    mongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("MyDBTest1");
      dbo.createCollection("customers11", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
      });
    });

    res.send('Hello World');
})

app.get('/api/courses',(req,res)=>{
    res.send(JSON.stringify('[1,2,3,4,5]'))
})

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`listening on port ${port}..`);
});

//RESTFUL SERVICES
//api/curses/1
app.get('/api/courses/:id',(req,res)=>{
    // res.send(req.params.id);
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) res.status(404).send('The course with given ID is not present')
    res.send(course);
    
})


app.post('/api/courses/',(req,res)=>{

    const schema={
        name:Joi.string().min(3).required()
    };
    const result=Joi.validate(req.body,schema);
    console.log(result);
    if(result.error)
    {
        res.status(400).send(result.error.details[0].message);
        return ;
    }
    // if(!req.body.name || req.body.name.length < 3)
    // {
    //     //bad request
    //     res.status(404).send('Name is required and it should be more than 3 character');
    //     return;
    // }
const course={
    id:courses.length+1,
    name:req.body.name
};
courses.push(course);
res.send(course);
});

app.put('/api/courses/:id',(req,res)=>
{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    // if(!course)
    // {
    //     res.status(404).send('The course with given ID is not present');
    //     return;
    // } 
    if(!course) return res.status(404).send('The course with given ID is not present');
    const schema={
        name:Joi.string().min(3).required()
    };
    const result=Joi.validate(req.body,schema);
    if(result.error)
    {
        res.status(400).send(result.error.details[0].message);
        return ;
    }
    course.name=req.body.name;
    res.send(course);

});

app.delete('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) res.status(404).send('The course with given ID is not present')

    const index=courses.indexOf(course);
    courses.splice(index,1);
    res.send(courses);
})

//Insert One
app.get('/api/MongoDB/InsertOne',(req,res)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    var myobj = { name: "Company Inc", address: "Highway 37" };
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        
        dbo.collection("customers").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });

      res.send('Inserted one record'+JSON.stringify(myobj) );
})

app.get('/api/MongoDB/InsertMany',(req,res)=>{
    var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = [
    { name: 'John', address: 'Highway 71'},
    { name: 'Peter', address: 'Lowstreet 4'},
    { name: 'Amy', address: 'Apple st 652'},
    { name: 'Hannah', address: 'Mountain 21'},
    { name: 'Michael', address: 'Valley 345'},
    { name: 'Sandy', address: 'Ocean blvd 2'},
    { name: 'Betty', address: 'Green Grass 1'},
    { name: 'Richard', address: 'Sky st 331'},
    { name: 'Susan', address: 'One way 98'},
    { name: 'Vicky', address: 'Yellow Garden 2'},
    { name: 'Ben', address: 'Park Lane 38'},
    { name: 'William', address: 'Central st 954'},
    { name: 'Chuck', address: 'Main Road 989'},
    { name: 'Viola', address: 'Sideway 1633'}
  ];
  dbo.collection("customers").insertMany(myobj, function(err, insertres) {
    if (err) throw err;
    console.log("Number of documents inserted: " + insertres.insertedCount);
    db.close();
    res.send("Insert many"+JSON.stringify(myobj));
  });
});
})


