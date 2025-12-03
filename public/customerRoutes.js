const express = require('express');
const CustomerDetails = require('./customerDetails.model');
const router = express.Router();

// Save Customer Purchase
router.post("/purchase", async (req, res) => {
    try {
        const {
            fullname,
            address,
            contact,
            paymentMethod,
            carModel,
            price
        } = req.body;

        if (!fullname || !address || !contact || !paymentMethod) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const purchase = await CustomerDetails.create({
            fullname,
            address,
            contact,
            paymentMethod,
            carModel,
            price
        });

        res.json({
            message: "Purchase saved successfully",
            purchase
        });

    } catch (err) {
        console.error("Purchase save error:", err);
        res.status(500).json({ message: "Error saving purchase", error: err.message });
    }
});

// Get all purchases
router.get("/purchases", async (req, res) => {
    try {
        const purchases = await CustomerDetails.find();
        res.json(purchases);
    } catch (err) {
        console.error("Fetch purchases error:", err);
        res.status(500).json({ message: "Error fetching purchases", error: err.message });
    }
});

module.exports = router;
