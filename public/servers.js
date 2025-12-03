// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('YOUR_MONGO_URI_HERE', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema
const customerSchema = new mongoose.Schema({
    fullname: String,
    address: String,
    contact: String,
    payment: String,
    product: String,
    price: Number,
    date: Date
});

const Customer = mongoose.model('Customer', customerSchema);

// Endpoint to receive purchase data
app.post('/purchase', async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        await newCustomer.save();
        res.json({ success: true, message: 'Purchase saved!' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
