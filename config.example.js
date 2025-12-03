// MongoDB Configuration Example
// Copy this file to config.js and update with your credentials

module.exports = {
    // Option 1: Full connection string
    MONGODB_URI: 'mongodb+srv://your_username:your_password@your_cluster.mongodb.net/CarDealership?retryWrites=true&w=majority',
    
    // Option 2: Individual components (alternative)
    MONGODB: {
        username: 'your_username',
        password: 'your_password',
        cluster: 'your_cluster.mongodb.net',
        database: 'CarDealership'
    },
    
    // Server configuration
    PORT: 5000
};

