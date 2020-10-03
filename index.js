const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const pass ='i96NsKUrgnqWp6xA volunteerNetworkUser';
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://volunteerNetworkUser:i96NsKUrgnqWp6xA@cluster0.yf6o8.mongodb.net/volunteerNetwork?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });

const app = express()
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

// mongodb

client.connect(err => {
  const volunteerTasksCollection = client.db("volunteerNetwork").collection("volunteerTasks");
//   create or post to database
    app.post("/addVolunteerTasks", (req, res) => {
        const volunteerTasks = req.body;
        console.log(err, volunteerTasks);
        volunteerTasksCollection.insertMany(volunteerTasks)
        .then(result => {
            console.log(result);
        })
    })
    // get or read data from database
    app.get('/volunteerTasks', (req, res) => {
        volunteerTasksCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })

    console.log('database connected');

});


// client.connect(err => {
//     const volunteerTasksCollection = client.db("volunteerNetwork").collection("volunteerTasks");
//     // create or post to database
//     app.post("/addVolunteerTasks", (req, res) => {
//         const volunteerTasks = req.body;
//         console.log(err, volunteerTasks);
//         volunteerTasksCollection.insertOne(volunteerTasks)
//         .then(result => {
//             console.log(result);
//         })
//     })


//     console.log('database connected');
//     client.close();
// });


const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})