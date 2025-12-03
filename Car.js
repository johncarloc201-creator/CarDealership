const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear() + 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    type: {
        type: String,
        required: true,
        enum: ['sedan', 'suv', 'sports', 'luxury', 'truck', 'coupe', 'convertible'],
        lowercase: true
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    mileage: {
        type: Number,
        default: 0,
        min: 0
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        default: '🚗'
    },
    status: {
        type: String,
        enum: ['available', 'sold', 'reserved'],
        default: 'available'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
CarSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Car", CarSchema);

