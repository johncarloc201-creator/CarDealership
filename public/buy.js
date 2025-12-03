const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/carDealership', {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Purchase schema
const PurchaseSchema = new mongoose.Schema({
fullname: { type: String, required: true, trim: true },
address: { type: String, required: true, trim: true },
contact: { type: String, required: true, trim: true },
paymentMethod: { type: String, required: true, enum: ['Cash', 'Installment', 'Bank Transfer'] },
carName: { type: String, required: true, trim: true },
price: { type: Number, required: true, min: 0 },
purchasedAt: { type: Date, default: Date.now }
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);

async function savePurchase(data) {
const purchase = new Purchase(data);
return await purchase.save();
}

module.exports = { Purchase, savePurchase };
