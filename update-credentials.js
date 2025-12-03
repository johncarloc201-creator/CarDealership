// Quick MongoDB Credentials Updater
// This script helps you update your MongoDB connection credentials

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🔧 MongoDB Credentials Updater\n');
console.log('This will help you fix the authentication error.\n');

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

async function updateCredentials() {
    try {
        console.log('Enter your MongoDB Atlas credentials:\n');
        
        const username = await askQuestion('MongoDB Username: ');
        const password = await askQuestion('MongoDB Password: ');
        const cluster = await askQuestion('Cluster (e.g., cluster0.xxxxx.mongodb.net): ');
        const database = await askQuestion('Database name (default: CarDealership): ') || 'CarDealership';
        
        if (!username || !password || !cluster) {
            console.log('\n❌ Error: Username, password, and cluster are required!');
            rl.close();
            return;
        }
        
        // Encode password for URL
        const encodedPassword = encodeURIComponent(password);
        const connectionString = `mongodb+srv://${username}:${encodedPassword}@${cluster}/${database}?retryWrites=true&w=majority&appName=Cluster0`;
        
        // Create .env file
        const envContent = `# MongoDB Atlas Connection String
MONGODB_URI=${connectionString}

# Server Port
PORT=5000
`;
        
        const envPath = path.join(__dirname, '.env');
        fs.writeFileSync(envPath, envContent);
        
        console.log('\n✅ Credentials saved to .env file!');
        console.log('\n📋 Important: Make sure in MongoDB Atlas:');
        console.log('   1. Go to "Database Access" → Verify user exists');
        console.log('   2. Check password is correct');
        console.log('   3. User must have "Read and write to any database" permission');
        console.log('   4. Go to "Network Access" → Add 0.0.0.0/0 (or your IP)');
        console.log('\n🧪 Testing connection...\n');
        
        // Test the connection
        const mongoose = require('mongoose');
        require('dotenv').config();
        
        try {
            await mongoose.connect(connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 10000
            });
            
            console.log('✅ Connection successful!');
            console.log(`📦 Database: ${mongoose.connection.name}`);
            console.log(`🔗 Cluster: ${mongoose.connection.host}`);
            
            await mongoose.disconnect();
            console.log('\n✅ All set! You can now run: node server.js');
        } catch (error) {
            console.log('\n❌ Connection failed!');
            console.log(`   Error: ${error.message}`);
            
            if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
                console.log('\n🔧 Authentication Error - Check:');
                console.log('   1. Username is correct in MongoDB Atlas');
                console.log('   2. Password is correct (no typos)');
                console.log('   3. User exists in "Database Access"');
                console.log('   4. User has proper permissions');
            }
        }
        
    } catch (error) {
        console.error('\n❌ Error:', error.message);
    } finally {
        rl.close();
    }
}

updateCredentials();

