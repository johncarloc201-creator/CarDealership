const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./db');
const userRoutes = require('./userRoutes');
const carRoutes = require('./carRoutes');
const User = require('./User');
const Car = require('./Car');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API routes
app.use("/api", userRoutes);
app.use("/api", carRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
    const dbStatus = mongoose.connection.readyState;
    const statusMessages = {
        0: "disconnected",
        1: "connected",
        2: "connecting",
        3: "disconnecting"
    };
    
    res.json({
        status: "ok",
        server: "running",
        database: {
            status: statusMessages[dbStatus] || "unknown",
            name: mongoose.connection.name || "CarDealership",
            host: mongoose.connection.host || "127.0.0.1",
            port: mongoose.connection.port || 27017
        },
        timestamp: new Date().toISOString()
    });
});

// Serve HTML page at root
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Helper function to escape HTML to prevent XSS attacks
const escapeHtml = (text) => {
    if (!text) return 'N/A';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
};

// View all users in browser - HTML page
app.get("/users", async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Dealership - Users</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
        }
        h1 {
            color: #1a1a2e;
            margin-bottom: 10px;
            font-size: 36px;
        }
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 16px;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
        }
        .stat-value {
            font-size: 32px;
            font-weight: 800;
            margin-bottom: 5px;
        }
        .stat-label {
            font-size: 14px;
            opacity: 0.9;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        td {
            padding: 15px;
            border-bottom: 1px solid #e0e0e0;
            color: #333;
        }
        tr:hover {
            background: #f8f9fa;
        }
        .no-users {
            text-align: center;
            padding: 60px;
            color: #666;
            font-size: 18px;
        }
        .back-link {
            display: inline-block;
            margin-top: 20px;
            color: #0f3460;
            text-decoration: none;
            font-weight: 600;
        }
        .back-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚗 Car Dealership - Users Database</h1>
        <p class="subtitle">View all registered users in the CarDealership database</p>
        
        <div class="stats">
            <div class="stat-card">
                <div class="stat-value">${users.length}</div>
                <div class="stat-label">Total Users</div>
            </div>
        </div>
        
        ${users.length === 0 ? 
            '<div class="no-users">No users found in the database.</div>' :
            `<table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Registered Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${users.map((user, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${escapeHtml(user.firstname)}</td>
                            <td>${escapeHtml(user.lastname)}</td>
                            <td>${escapeHtml(user.email)}</td>
                            <td>${user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>`
        }
        
        <a href="/" class="back-link">← Back to API</a>
    </div>
</body>
</html>
        `;
        res.send(html);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send(`<h1>Error</h1><p>${escapeHtml(error.message)}</p>`);
    }
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // Listen on all network interfaces

const getLocalIP = () => {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
};

const startServer = async () => {
    try {
        // Connect to MongoDB CarDealership database first
        await connectDB();
        
        // Start server only after successful DB connection
        app.listen(PORT, HOST, () => {
            const localIP = getLocalIP();
            console.log(`🚗 Server running on port ${PORT}`);
            console.log(`📊 Connected to CarDealership database`);
            console.log(`🌐 Desktop: http://localhost:${PORT}`);
            console.log(`📱 Phone/Other devices: http://${localIP}:${PORT}`);
            console.log(`🔗 API endpoint: http://${localIP}:${PORT}/api`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

startServer();

