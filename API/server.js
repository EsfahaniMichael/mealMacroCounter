const express = require("express");
const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json({type: ' application/*+json'});
const env = require("dotenv");

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



// const meal = 'caesar salad';
// const query = `SELECT * FROM meals AS m WHERE meal = ?`;
// const insert = [meal];
//const sql = mysql.format(query, insert);


// dataBase.query(sql, (error, data, fields)=>{
//     if(!error){
//         console.log(data[0]);
//     } else {
//         console.log('query failed');
//     }
// });



// const addingQuery = `INSERT INTO `meals` (`id`, `meal`, `protein`, `carbohydrates`, `fats`)
//  VALUES (NULL, '', '', '', '') `






env.config();

const app = express();
app.use(bodyParser.json());


app.get('/', (req,res) => {
    res.send('sent');
});



app.get('/meals',(req, res, next) =>{
    
        let query = `SELECT * FROM meals `;
        let inserts = [`meal`];
    
        let sql = mysql.format(query, inserts);
    
        dataBase.query(sql, (err, results, fields) => {
            
            if (err) return next(err);
    
            
            const output = {
                success: true,
                data: results
            }
            res.json(output);
        });
} )

app.get('/meals/:id', (req, res, next) => {
    const { id } = req.params;

    let query = 'SELECT * FROM ?? WHERE ?? = ?';
    let inserts = ['students', 'id', id];

    let sql = mysql.format(query, inserts);

    dataBase.query(sql, (err, results, fields) => {
        if (err) return next(err);

        const output = {
            success: true,
            data: results
        };
        res.json(output);
    });
});

app.post('/meals', (req, res, next) => {
    const { meal, protein, carbohydrates, fats} = req.body;
    console.log('this be a meal',req.body)
    let query = 'INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)';
    let inserts = ['meals', 'meal', 'protein', 'carbohydrates', 'fats', meal, protein, carbohydrates, fats];

    let sql = mysql.format(query, inserts);
    console.log("This is the formatted SQL", sql);
    dataBase.query(sql, (err, results, fields) => {
        if (err) return next(err);
        const output = {
            success : true,
            data: results
        }
        res.json(output);
    })
});

app.post('/meals/delete', (req, res, next) => {
    const { id } = req.body;

    let query = 'DELETE FROM ?? WHERE ?? = ?';
    let inserts = ['meals','id', id];

    let sql = mysql.format(query, inserts);
    console.log("This is the formatted SQL", sql);
    dataBase.query(sql, (err, results, fields) => {
        if (err) return next(err);
        const output = {
            success : true,
            data: results
        }
        res.json(output);
    })
});



// const macroTable = require('./lib/table');

// app.get('/', (req, res, next) => {
//     const data = macroTable.get();
//     res.send(data);
// })

// app.post("/", (req,res,next) => {

//     const {meal} = req.body;

//     macroTable.add(meal);

//     return res.send("sent")
// })

var PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('LISTENING on: ', PORT)
})