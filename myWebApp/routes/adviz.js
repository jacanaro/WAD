var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/adviz";

var express = require('express');
var router = express.Router();
var path = require('path');
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

user_name = "";
password = "";


router.get('/', function (req, res, next) {
    //res.render('index', { title: 'Login' });
    res.sendFile('index.html', {root: '../myWebApp/public'});
});

router.post('/login', (req, res) => {
    user_name = req.body.user;
    password = req.body.password;
    console.log("User name = " + user_name + ", password is " + password);
    res.end("yes");
});

router.get('/loginData', function (req, res, next) {
    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {
        if (err) throw err;
        var db = client.db("adviz");
        db.collection("users").find({}).toArray(function (err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                // check is user input matches username and password of a current index of the userCollection array
                if (user_name == result[i].userID && password == result[i].password) {
                    console.log(result[i]);
                    res.json(result[i]);
                    break;
                } else if (i == result.length - 1) {
                    res.status(401).json({failString: "Unauthorized"});
                }
            }
            client.close();
        });
    });
});

router.get('/user', function (req, res, next) {
                    res.json({userID: user_name});
});

module.exports = router;