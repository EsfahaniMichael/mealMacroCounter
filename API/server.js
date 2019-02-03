const express = require("express");
const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json({type: ' application/*+json'});
const env = require("dotenv");


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