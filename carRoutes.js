const express = require('express');
const Car = require('./Car');
const router = express.Router();

// Get all cars
router.get("/cars", async (req, res) => {
    try {
        const { type, status, minPrice, maxPrice, search } = req.query;
        let query = {};

        // Filter by type
        if (type) {
            query.type = type.toLowerCase();
        }

        // Filter by status
        if (status) {
            query.status = status.toLowerCase();
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Search by make or model
        if (search) {
            query.$or = [
                { make: { $regex: search, $options: 'i' } },
                { model: { $regex: search, $options: 'i' } }
            ];
        }

        const cars = await Car.find(query).sort({ createdAt: -1 });
        res.json(cars);
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).json({ message: "Error fetching cars", error: error.message });
    }
});

// Get single car by ID
router.get("/cars/:id", async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.json(car);
    } catch (error) {
        console.error("Error fetching car:", error);
        res.status(500).json({ message: "Error fetching car", error: error.message });
    }
});

// Add new car
router.post("/cars", async (req, res) => {
    try {
        const car = await Car.create(req.body);
        res.status(201).json({ message: "Car added successfully", car });
    } catch (error) {
        console.error("Error adding car:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation error", error: error.message });
        }
        res.status(500).json({ message: "Error adding car", error: error.message });
    }
});

// Update car
router.put("/cars/:id", async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.json({ message: "Car updated successfully", car });
    } catch (error) {
        console.error("Error updating car:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation error", error: error.message });
        }
        res.status(500).json({ message: "Error updating car", error: error.message });
    }
});

// Delete car
router.delete("/cars/:id", async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.json({ message: "Car deleted successfully", car });
    } catch (error) {
        console.error("Error deleting car:", error);
        res.status(500).json({ message: "Error deleting car", error: error.message });
    }
});

// Get car statistics
router.get("/cars/stats/summary", async (req, res) => {
    try {
        const totalCars = await Car.countDocuments();
        const availableCars = await Car.countDocuments({ status: 'available' });
        const soldCars = await Car.countDocuments({ status: 'sold' });
        const totalValue = await Car.aggregate([
            { $match: { status: 'available' } },
            { $group: { _id: null, total: { $sum: '$price' } } }
        ]);

        const carsByType = await Car.aggregate([
            { $group: { _id: '$type', count: { $sum: 1 } } }
        ]);

        res.json({
            totalCars,
            availableCars,
            soldCars,
            totalValue: totalValue[0]?.total || 0,
            carsByType: carsByType.reduce((acc, item) => {
                acc[item._id] = item.count;
                return acc;
            }, {})
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ message: "Error fetching statistics", error: error.message });
    }
});

module.exports = router;

