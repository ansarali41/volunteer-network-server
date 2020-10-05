const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const objectId = require('mongodb').ObjectID;
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yf6o8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()
app.use(cors());
app.use(bodyParser.json());

// mongodb
client.connect(err => {
    const volunteerTasksCollection = client.db("volunteerNetwork").collection("volunteerTasks");
    const registrationListCollection = client.db("volunteerNetwork").collection("registrationList");

    //   create or post to database from admin
    app.post("/addVolunteerTasks", (req, res) => {
        const volunteerTasks = req.body;
        volunteerTasksCollection.insertOne(volunteerTasks)
            .then(result => {
                res.send(result.insertedCount>0)
            })
    })

    // get or read data all data from database
    app.get('/volunteerTasks', (req, res) => {
        volunteerTasksCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    // registration post to database
    app.post('/addRegistration', (req, res) => {
        const registration = req.body;
        registrationListCollection.insertOne(registration)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    // get registration list of user 
    app.get('/registrations/:email', (req, res) => {
        const userEmail =req.params.email;
        registrationListCollection.find({email: userEmail})
        .toArray((err,documents) => {
            res.send(documents)
        })
    })

    // delete task from database
    app.delete('/delete/:id', (req, res) => {
        const id = req.params.id;
        registrationListCollection.deleteOne({_id: objectId(req.params.id)})
        .then((result) => {
            res.send(result.deletedCount>0)
        })
    })

    // read all user data from data (admin)
    app.get('/allRegistrations', (req, res) => {
        registrationListCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })

    // delete user registration from admin 
    app.delete('/deleteUserReg/:id', (req, res) => {
        const id = req.params.id;
        registrationListCollection.deleteOne({_id: objectId(req.params.id)})
        .then((result) => {
            res.send(result.deletedCount>0)
        })
    })
});


const port = 5000;
app.listen(port, () => {
    console.log( process.env.PORT ||port)
})