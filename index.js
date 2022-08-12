const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

//mongodb connection
const uri = "mongodb+srv://grab_amazon_admin:apZKpzIcjzNVm3IX@cluster0.njtdwch.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const membershipCollection = client.db("grab_amazon").collection("membership");

    //membership api
    app.get('/membership', async (req, res) => {
      const query = {};
      const cursor = membershipCollection.find(query);
      const memberships = await cursor.toArray();
      res.send(memberships);
    })
  }

  finally {

  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Welcome from grab-amazon');
})

app.listen(port, () => {
  console.log(`grab-amazon listening on port ${port}`)
});