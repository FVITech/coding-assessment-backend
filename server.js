"use strict";
const express = require('express');
const app = express();
const port = 2999;
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Assessment = require('./DB_model.js');
mongoose.connect(require('./.dbconfig.js'), {useMongoClient: true});

app.use(bodyParser.json());
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', 'http://apps.techlaunch.io');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});
app.use(express.static('static'));

app.get('/', function(req,res){
  res.end("hello world");
});

let ans = {q1: 150, q2: 115, q3: "dundundun", q4: 100, q5: "no"};
app.post('/api/assessment', async (req,res)=>{
  console.log("Received post", req.body);
  var result = {
    name: req.body.name,
    timestamp: new Date().getTime(),
    q1: {answer: req.body.q1, correct: ans.q1==req.body.q1},
    q2: {answer: req.body.q2, correct: ans.q2==req.body.q2},
    q3: {answer: req.body.q3, correct: (""+req.body.q3).indexOf(ans.q3)>=0},
    q4: {answer: req.body.q4, correct: ans.q4==req.body.q4},
    q5: {answer: req.body.q5, correct: (""+req.body.q5).indexOf(ans.q5)>=0}
  };

  var a = new Assessment(result);
  try{
    let dbRes = await a.save();
    res.json(dbRes);
  }
  catch (e){
    res.setStatus(500).json({error: e});
  }
});

app.get('/api/assessment', async (req,res)=>{
  console.log("Received get request for assessments");
  try{
    var result = await Assessment.find();
    console.log(result);
    res.json(result);
  }
  catch(e){
    res.setStatus(500).json({error:e});
  }

});

app.listen(port, ()=>console.log("Server listening on port", port));
