// Initialize Car Dealership Database with Sample Data
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./db');
const Car = require('./Car');

const sampleCars = [
    {
        make: "Toyota",
        model: "Camry",
        year: 2024,
        price: 28500,
        type: "sedan",
        color: "Silver",
        mileage: 0,
        description: "Reliable and fuel-efficient sedan perfect for daily commuting.",
        image: "🚗",
        status: "available"
    },
    {
        make: "Ford",
        model: "Explorer",
        year: 2024,
        price: 38500,
        type: "suv",
        color: "Black",
        mileage: 0,
        description: "Spacious SUV with advanced safety features and modern technology.",
        image: "🚙",
        status: "available"
    },
    {
        make: "BMW",
        model: "M3",
        year: 2024,
        price: 75000,
        type: "sports",
        color: "Blue",
        mileage: 0,
        description: "High-performance sports car with exceptional handling and power.",
        image: "🏎️",
        status: "available"
    },
    {
        make: "Mercedes-Benz",
        model: "S-Class",
        year: 2024,
        price: 110000,
        type: "luxury",
        color: "White",
        mileage: 0,
        description: "Ultra-luxury sedan with premium features and elegant design.",
        image: "🚘",
        status: "available"
    },
    {
        make: "Honda",
        model: "Civic",
        year: 2024,
        price: 24500,
        type: "sedan",
        color: "Red",
        mileage: 0,
        description: "Compact sedan known for reliability and excellent fuel economy.",
        image: "🚗",
        status: "available"
    },
    {
        make: "Jeep",
        model: "Grand Cherokee",
        year: 2024,
        price: 42000,
        type: "suv",
        color: "Gray",
        mileage: 0,
        description: "Rugged SUV with off-road capabilities and premium interior.",
        image: "🚙",
        status: "available"
    },
    {
        make: "Porsche",
        model: "911",
        year: 2024,
        price: 105000,
        type: "sports",
        color: "Yellow",
        mileage: 0,
        description: "Iconic sports car with legendary performance and timeless design.",
        image: "🏎️",
        status: "available"
    },
    {
        make: "Audi",
        model: "A8",
        year: 2024,
        price: 95000,
        type: "luxury",
        color: "Black",
        mileage: 0,
        description: "Flagship luxury sedan with cutting-edge technology and comfort.",
        image: "🚘",
        status: "available"
    },
    {
        make: "Tesla",
        model: "Model 3",
        year: 2024,
        price: 42000,
        type: "sedan",
        color: "White",
        mileage: 0,
        description: "Electric sedan with advanced autopilot and impressive range.",
        image: "🚗",
        status: "available"
    },
    {
        make: "Ford",
        model: "F-150",
        year: 2024,
        price: 45000,
        type: "truck",
        color: "Blue",
        mileage: 0,
        description: "Best-selling truck with powerful engine and towing capacity.",
        image: "🚚",
        status: "available"
    }
];

async function initializeDatabase() {
    try {
        console.log('🔄 Connecting to MongoDB...\n');
        await connectDB();
        
        console.log('📦 Initializing Car Dealership database...\n');
        
        // Check if cars already exist
        const existingCars = await Car.countDocuments();
        if (existingCars > 0) {
            console.log(`⚠️  Database already has ${existingCars} cars.`);
            const readline = require('readline');
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            
            const answer = await new Promise((resolve) => {
                rl.question('Do you want to add sample cars anyway? (y/n): ', resolve);
            });
            rl.close();
            
            if (answer.toLowerCase() !== 'y') {
                console.log('✅ Database initialization cancelled.');
                await mongoose.disconnect();
                process.exit(0);
            }
        }
        
        // Insert sample cars
        console.log('📝 Adding sample cars to database...\n');
        const insertedCars = await Car.insertMany(sampleCars);
        
        console.log(`✅ Successfully added ${insertedCars.length} cars to the database!\n`);
        console.log('📊 Database Summary:');
        console.log(`   Total Cars: ${await Car.countDocuments()}`);
        console.log(`   Available: ${await Car.countDocuments({ status: 'available' })}`);
        console.log(`   Database: ${mongoose.connection.name}\n`);
        
        console.log('✅ Car Dealership database initialized successfully!');
        console.log('🚗 You can now view cars at: http://localhost:5000/api/cars\n');
        
        await mongoose.disconnect();
        process.exit(0);
        
    } catch (error) {
        console.error('\n❌ Error initializing database:', error.message);
        if (error.code === 11000) {
            console.error('   → Some cars may already exist in the database');
        }
        await mongoose.disconnect();
        process.exit(1);
    }
}

initializeDatabase();

