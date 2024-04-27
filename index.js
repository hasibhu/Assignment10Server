const express = require('express')
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');


//middleware 
app.use(cors());
app.use(express.json());

// assignment
// assignmentkJ558WassignmentMVE9M09NKP

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.qoryues.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);

const dbConnect = async () => {
    try {
        await client.db("admin").command({ ping: 1 });
        console.log("You successfully connected to MongoDB!");
    } catch (error) {
        console.log(error)

    }
}
dbConnect();

const assignment10Data = client.db("assignment10DB").collection('locationData');
// const userCollection = client.db("coffeeDB").collection('user');












app.get('/', async (req, res) => {

    res.send('The travel agency server is running..... ')
})

app.listen(port, () => {
    console.log(`The server running on port: ${port}`)

})