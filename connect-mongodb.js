// Simple MongoDB Connection Setup
// Run: node connect-mongodb.js

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('═══════════════════════════════════════════════════════');
console.log('   🔗 MongoDB Connection Setup for Car Dealership');
console.log('═══════════════════════════════════════════════════════\n');

function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => resolve(answer.trim()));
    });
}

async function setupConnection() {
    try {
        console.log('📋 We need your MongoDB Atlas connection details.\n');
        console.log('💡 To get your connection string:');
        console.log('   1. Go to: https://cloud.mongodb.com/');
        console.log('   2. Click "Database" → "Connect" → "Connect your application"');
        console.log('   3. Copy the connection string\n');
        
        const method = await ask('Choose method:\n  1. Enter full connection string\n  2. Enter details separately\nChoice (1 or 2): ');
        
        let connectionString = '';
        
        if (method === '1') {
            console.log('\n📝 Paste your MongoDB connection string:');
            console.log('   Format: mongodb+srv://username:password@cluster.mongodb.net/database');
            const fullString = await ask('Connection string: ');
            connectionString = fullString;
        } else {
            console.log('\n📝 Enter your MongoDB details:');
            const username = await ask('Username: ');
            const password = await ask('Password: ');
            const cluster = await ask('Cluster (e.g., cluster0.xxxxx.mongodb.net): ');
            const database = await ask('Database name (default: CarDealership): ') || 'CarDealership';
            
            const encodedPassword = encodeURIComponent(password);
            connectionString = `mongodb+srv://${username}:${encodedPassword}@${cluster}/${database}?retryWrites=true&w=majority&appName=Cluster0`;
        }
        
        if (!connectionString) {
            console.log('\n❌ Error: Connection string is required!');
            rl.close();
            return;
        }
        
        console.log('\n🔄 Testing connection...\n');
        
        // Test connection
        try {
            await mongoose.connect(connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 15000
            });
            
            console.log('✅ Connection Successful!');
            console.log(`📦 Database: ${mongoose.connection.name}`);
            console.log(`🔗 Cluster: ${mongoose.connection.host}`);
            console.log(`👤 Connected as: ${mongoose.connection.user || 'user'}\n`);
            
            // Save to .env file
            const envPath = path.join(__dirname, '.env');
            const envContent = `# MongoDB Atlas Connection String
MONGODB_URI=${connectionString}

# Server Port
PORT=5000
`;
            
            fs.writeFileSync(envPath, envContent);
            console.log('✅ Connection string saved to .env file!\n');
            
            await mongoose.disconnect();
            
            console.log('═══════════════════════════════════════════════════════');
            console.log('   ✅ Setup Complete!');
            console.log('═══════════════════════════════════════════════════════\n');
            console.log('📋 Next steps:');
            console.log('   1. Make sure Network Access allows your IP in MongoDB Atlas');
            console.log('   2. Start your server: node server.js');
            console.log('   3. Open browser: http://localhost:5000\n');
            
        } catch (error) {
            console.log('\n❌ Connection Failed!\n');
            console.log(`Error: ${error.message}\n`);
            
            if (error.message.includes('authentication') || error.message.includes('bad auth')) {
                console.log('🔧 Authentication Error - Fix this:');
                console.log('   1. Go to MongoDB Atlas → Database Access');
                console.log('   2. Verify username and password are correct');
                console.log('   3. Make sure user has "Read and write" permissions');
                console.log('   4. Try resetting the password\n');
            } else if (error.code === 8000) {
                console.log('🔧 Network Access Issue:');
                console.log('   1. Go to MongoDB Atlas → Network Access');
                console.log('   2. Add IP Address: 0.0.0.0/0 (for testing)');
                console.log('   3. Wait 1-2 minutes after adding\n');
            }
            
            console.log('💡 Run this script again after fixing the issue.\n');
        }
        
    } catch (error) {
        console.error('\n❌ Error:', error.message);
    } finally {
        rl.close();
    }
}

setupConnection();

