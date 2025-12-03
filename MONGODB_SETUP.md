# MongoDB Connection Setup Guide

## How to Connect Your MongoDB Account

### Option 1: Using Environment Variables (Recommended - More Secure)

1. **Create a `.env` file** in your project root (`D:\MONGO_APP\.env`):
   ```
   MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/CarDealership?retryWrites=true&w=majority&appName=Cluster0
   ```

2. **Get Your MongoDB Connection String:**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Click **"Database"** → Select your cluster
   - Click **"Connect"**
   - Choose **"Connect your application"**
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `CarDealership` (or your preferred database name)

3. **Example `.env` file:**
   ```
   MONGODB_URI=mongodb+srv://myuser:mypassword123@cluster0.xxxxx.mongodb.net/CarDealership?retryWrites=true&w=majority
   PORT=5000
   ```

### Option 2: Update db.js Directly

Edit `db.js` and replace the connection string with your own:

```javascript
const username = 'your_username';
const password = 'your_password';
const cluster = 'your_cluster.mongodb.net';
const database = 'CarDealership';

const MONGODB_URI = `mongodb+srv://${username}:${encodeURIComponent(password)}@${cluster}/${database}?retryWrites=true&w=majority&appName=Cluster0`;
```

## Steps to Get Your MongoDB Connection String:

### Step 1: Log into MongoDB Atlas
- Go to: https://cloud.mongodb.com/
- Sign in with your account

### Step 2: Get Connection String
1. Click **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Select **"Connect your application"**
4. Choose **"Node.js"** as driver
5. Copy the connection string

### Step 3: Configure Network Access
1. Go to **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. For testing: Add `0.0.0.0/0` (allows all IPs)
4. For production: Add your specific IP address
5. Click **"Confirm"**

### Step 4: Create Database User
1. Go to **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username and password
5. Set privileges: **"Read and write to any database"**
6. Click **"Add User"**

### Step 5: Update Connection String
Replace in your `.env` file or `db.js`:
- `<username>` → Your database username
- `<password>` → Your database password
- `<dbname>` → `CarDealership` (or your database name)

## Testing the Connection

After setting up, test your connection:

```bash
node test-connection.js
```

Or start your server:

```bash
node server.js
```

You should see:
```
✅ MongoDB Atlas Connected Successfully!
📦 Database: CarDealership
🔗 Cluster: your-cluster.mongodb.net
```

## Troubleshooting

### Connection Failed?
1. Check Network Access - Make sure your IP is whitelisted
2. Verify username and password are correct
3. Check if database user has proper permissions
4. Wait 1-2 minutes after making changes in Atlas

### Authentication Error?
1. Verify database user exists in "Database Access"
2. Check password is correct (no typos)
3. Make sure user has "Read and write" permissions

### Still Not Working?
Run the diagnostic test:
```bash
node test-connection.js
```

This will show detailed error information.

