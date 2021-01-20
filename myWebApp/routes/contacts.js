var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/adviz";
const mongoose = require('mongoose');

var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get("/", function (req, res, next) {
    let contacts = [];
    let ID = req.query.userId;
    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {
        if (err) throw err;
        var db = client.db("adviz");

        if (ID == "all") {
            if (user_name == "admina") {
                db.collection("contacts").find({}).toArray(function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    res.json(result);
                    client.close();

                });
            } else {
                db.collection("contacts").find({}).toArray(function (err, result) {
                    if (err) throw err;
                    for (var i in result) {
                        if (result[i].ownerID != user_name) {
                            if (result[i].isPrivate == false) {
                                contacts[i] = result[i];
                            }
                        } else {
                            contacts[i] = result[i];
                        }
                    }
                    res.send(contacts);
                    client.close();
                });
            }
        } else {
            db.collection("contacts").find({ownerID: ID}).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                res.json(result);
                client.close();
            });
        }
    });
});

const contactSchema = new mongoose.Schema ({
    Titel: String,
    m_w_d: String,
    Vorname: String,
    Name: String,
    StrHsnr: String,
    PLZ: Number,
    Stadt: String,
    Land: String,
    Email: String,
    Sonstiges: String,
    isPrivate: Boolean,
    lat: Number,
    lng: Number,
    ownerID: String

});

const Contact = mongoose.model("Contact", contactSchema);


router.post("/", async (req, res) => {
    await mongoose.connect("mongodb://localhost:27017/adviz", {useNewUrlParser: true});
    const newContact = new Contact({
        Titel: req.body.Titel,
        m_w_d: req.body.m_w_d,
        Vorname: req.body.Vorname,
        Name: req.body.Name,
        StrHsnr: req.body.StrHsnr,
        PLZ: req.body.PLZ,
        Stadt: req.body.Stadt,
        Land: req.body.Land,
        Email: req.body.Email,
        Sonstiges: req.body.Sonstiges,
        isPrivate: req.body.isPrivate,
        lat: req.body.lat,
        lng: req.body.lng,
        ownerID: req.body.ownerID
    });
    await newContact.save();
    res.send(newContact)
});


router.put("/id", function (req, res, next){

    var updatedContact = req.body;
    console.log(updatedContact);
    /*
db.collection('contacts').updateOne(
    {
        $set: { 'Titel': req.body.Titel },
        $currentDate: { lastModified: true }
    }
);*/
    res.end("yes");
});

/*
router.delete("/id", function (req, res, next){

    var contactToDelete = req.body;
    console.log(contactToDelete);
    res.end("yes");
});

 */

router.delete("/id", async (req, res) => {
    try {
        await mongoose.connect("mongodb://localhost:27017/adviz", {useNewUrlParser: true});
        await Contact.deleteOne({ _id: req.body._id })
        res.end("deleted")
    } catch {
        res.status(404)
        res.send({ error: "Kein Kontakt vorhanden!" })
    }
})


module.exports = router;
