import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017"; 
const client = new MongoClient(uri);

let db, collection;

// Connect once
async function connectDB() {
    if (!db) {
        await client.connect();
        db = client.db("CarDealership");
        collection = db.collection("customer_details");
        console.log("Connected to MongoDB ✔");
    }
}
connectDB();

// =============================
//   SAVE PURCHASE TO DATABASE
// =============================
app.post("/purchase", async (req, res) => {
    try {
        await connectDB();

        const data = req.body;
        data.date = new Date().toLocaleString();

        console.log("Received purchase:", data);  // For debugging

        await collection.insertOne(data);

        res.json({ message: "Saved to MongoDB successfully!" });
    } catch (err) {
        console.error("Error saving data:", err);
        res.status(500).json({ error: err.message });
    }
});

// =============================
//   START THE SERVER
// =============================
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
