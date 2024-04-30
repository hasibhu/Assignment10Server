const express = require('express')
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


//middleware 
app.use(cors());
app.use(express.json());


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


// post data from addLocation component
app.post('/addLocation', async(req, res) => {
    const location = req.body;
    console.log(location);
    const result = await assignment10Data.insertOne(location);
    res.send(result);
})

// To read all server data 
app.get('/myLocation/', async (req, res) => {
    try {
        const result = await assignment10Data.find({}).toArray();
        res.json(result);
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({ error: "Failed to retrieve data" });
    }
});

//Read the posted data in server at MyListPage
app.get('/myLocation/:email', async (req, res) => {
    // console.log(req.params.email);
    const result = await  assignment10Data.find({ email: req.params.email }).toArray();
    // console.log(result);
    res.send(result)
})

//country name specific data for italy 
app.get('/myLocation/', async (req, res) => {
    try {
        const result = await assignment10Data.find({ countryName: "Italy" }).toArray();
        console.log(result);
        res.json(result);
        
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({ error: "Failed to retrieve data" });
    }
});



//delete //delete
app.delete('/myLocation/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await assignment10Data.deleteOne(query);
    res.send(result);

})

// update 
app.put('/coffee/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updatedCoffee = req.body;
    const coffeeUpdate = {
        $set: {
            name: updatedCoffee.name,
            quantity: updatedCoffee.quantity,
            supplier: updatedCoffee.supplier,
            taste: updatedCoffee.taste,
            category: updatedCoffee.category,
            details: updatedCoffee.details,
            photo: updatedCoffee.photo
        }
    };

    const result = await coffeeCollection.updateOne(filter, coffeeUpdate, options);
    res.send(result);

})



app.get('/', async (req, res) => {

    res.send('The travel agency server is running..... ')
})

app.listen(port, () => {
    console.log(`The server running on port: ${port}`)

})