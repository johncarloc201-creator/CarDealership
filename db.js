const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        let uri = (process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL || '').trim();
        const d = process.env.MONGODB_DATABASE || 'CarDealership';

        if (!uri) {
            const u = process.env.MONGODB_USERNAME;
            const p = process.env.MONGODB_PASSWORD ? encodeURIComponent(process.env.MONGODB_PASSWORD) : undefined;
            const c = process.env.MONGODB_CLUSTER;
            if (u && p && c) {
                uri = `mongodb+srv://${u}:${p}@${c}/${d}?retryWrites=true&w=majority&appName=Cluster0`;
            }
        }

        if (uri && uri.startsWith('mongodb+srv://')) {
            const atIdx = uri.indexOf('@');
            const slashIdx = uri.indexOf('/', atIdx + 1);
            const qIdx = uri.indexOf('?', atIdx + 1);
            const hasDb = slashIdx !== -1 && (qIdx === -1 ? uri.length > slashIdx + 1 : qIdx > slashIdx + 1);
            if (!hasDb) {
                const base = slashIdx === -1 ? uri : uri.slice(0, slashIdx + 1);
                const tail = qIdx === -1 ? '' : uri.slice(qIdx);
                uri = `${base}${d}${tail || '?retryWrites=true&w=majority&appName=Cluster0'}`;
            }
        }

        if (!uri) {
            throw new Error('Missing MongoDB credentials. Set MONGODB_URI or MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_CLUSTER in .env');
        }

        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ MongoDB Atlas Connected Successfully!');
        console.log(`📦 Database: ${conn.connection.name}`);
        console.log(`🔗 Cluster: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error('\n❌ MongoDB Atlas Connection Error!');
        console.error(`   Error Code: ${error.code || 'Unknown'}`);
        console.error(`   Error Name: ${error.name}`);
        console.error(`   Error Message: ${error.message}`);
        throw error;
    }
};

module.exports = connectDB;
