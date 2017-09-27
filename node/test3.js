/**
 * Created by wangyun on 17/4/4.
 */

const express = require('express')
const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/user1', (req,res) => {
    //res.send({user:"leo1"})

    setTimeout(() => {
        res.send({user:"leo1"})
    },1000)
})
app.get('/user2', (req,res) => {
    res.send({user:"leo2"})
})
app.get('/user3', (req,res) => {
    res.send({user:"leo3"})
})


app.listen(3000)

