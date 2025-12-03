// MongoDB Connection Setup Helper
// Run this script to test and configure your MongoDB connection

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🚗 MongoDB Connection Setup for Car Dealership\n');
console.log('This will help you configure your MongoDB Atlas connection.\n');

const questions = [
    {
        question: 'Enter your MongoDB username: ',
        key: 'username'
    },
    {
        question: 'Enter your MongoDB password: ',
        key: 'password',
        hidden: true
    },
    {
        question: 'Enter your MongoDB cluster (e.g., cluster0.xxxxx.mongodb.net): ',
        key: 'cluster'
    },
    {
        question: 'Enter database name (default: CarDealership): ',
        key: 'database',
        default: 'CarDealership'
    }
];

const answers = {};

function askQuestion(index) {
    if (index >= questions.length) {
        createEnvFile();
        return;
    }

    const q = questions[index];
    const prompt = q.default ? `${q.question} (${q.default}): ` : q.question;

    rl.question(prompt, (answer) => {
        const value = answer.trim() || q.default || '';
        if (value) {
            answers[q.key] = value;
        }
        askQuestion(index + 1);
    });
}

function createEnvFile() {
    const username = answers.username;
    const password = encodeURIComponent(answers.password);
    const cluster = answers.cluster;
    const database = answers.database || 'CarDealership';

    const connectionString = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority&appName=Cluster0`;

    const envContent = `# MongoDB Atlas Connection String
MONGODB_URI=${connectionString}

# Server Port
PORT=5000
`;

    const envPath = path.join(__dirname, '.env');

    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ Configuration saved to .env file!');
    console.log('\n📋 Next steps:');
    console.log('1. Make sure your IP is whitelisted in MongoDB Atlas Network Access');
    console.log('2. Verify your database user has "Read and write" permissions');
    console.log('3. Test connection: node test-connection.js');
    console.log('4. Start server: node server.js\n');
    
    rl.close();
}

// Start asking questions
askQuestion(0);

