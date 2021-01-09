const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 5000
const sqlite3 = require('sqlite3').verbose()

//connect database
const db = new sqlite3.Database('biousers.db',(err)=>{
    if(err){
        console.log(err)
    }
    console.log('connected to database')
})



//create table on database

db.run("CREATE TABLE IF NOT EXISTS usersbio(id INTEGER PRIMARY KEY, firstname text, lastname text, phoneno text,age text,dob text,email text,matricno text)",(err,table)=>{
    if(err){
            return console.log(err)
        }        
        return console.log('connected  to users table')

})
        
        

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(function(request,response,next){
        response.header("Access-Control-Allow-Origin","*")
        response.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type,Accept")
        next()
    })


//add data to database using the client api
app.post('/biodata/adddata',function(request,response){
    console.log(request.body)
    const firstname = request.body.firstname
    const lastname = request.body.lastname
    const phoneno = request.body.phoneno
    const age = request.body.age
    const dob = request.body.dob
    const email = request.body.email
    const matricno = request.body.matricno

        
    db.run("INSERT INTO usersbio(firstname,lastname,phoneno,age,dob,email,matricno) VALUES($1,$2,$3,$4,$5,$6,$7)",[firstname,lastname,phoneno,age,dob,email,matricno],(err,table)=>{
        
        if(err){
            return console.log(err)
        }        
        return console.log('bio data logged')
        
    })



})


//get data from database to the client api
app.get('/biodata/getdata',function(request,response){

        db.all("SELECT * FROM usersbio",function(err,rows){
            
            if(err){
                response.status(400).json({"error":err.message})
                return
            }  
            
            console.log(response)
            response.json({
                "message":'success',
                "data":rows
            })
            
            
        })
    
    
    
    })
        

app.listen(port,() => {
        console.log('server is running on port:'+port)
    })