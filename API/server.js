const express = require("express");
const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json({type: ' application/*+json'});
const env = require("dotenv");
//testing
const mysql = require('mysql');
const credentials = require('./credentials');

const dataBase = mysql.createConnection(credentials);
dataBase.connect((error) => {
    if(error){
        console.log('connection to DB failed!')

    }
    else{
        console.log('connected to database');
    }
})
const meal = 'potato salad';
const query = `SELECT * FROM meals AS m WHERE meal = ?`;
const insert = [meal];
const sql = mysql.format(query, insert);
dataBase.query(sql, (error, data, fields)=>{
    if(!error){
        console.log(data[0]);
    } else {
        console.log('query failed');
    }
});


const macroTable = require('./lib/table');



env.config();

const app = express();
app.use(bodyParser.json());
app.get('/', (req, res, next) => {
    const data = macroTable.get();
    res.send(data);
})

app.post("/", (req,res,next) => {

    const {meal} = req.body;

    macroTable.add(meal);

    return res.send("sent")
})

var PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('LISTENING on: ', PORT)
})