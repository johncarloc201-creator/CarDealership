# MongoDB Atlas Setup Guide

## Fixing AtlasError 8000

This error means MongoDB Atlas is blocking your connection. Follow these steps:

### Step 1: Allow Network Access

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Click on **"Network Access"** in the left sidebar
3. Click **"Add IP Address"** button
4. For testing, you can add:
   - **`0.0.0.0/0`** - Allows all IP addresses (less secure, but good for testing)
   - OR add your current IP address (more secure)

5. Click **"Confirm"**

### Step 2: Verify Database User

1. Go to **"Database Access"** in the left sidebar
2. Check if user `johncarloc201_db_user` exists
3. If not, create a new user:
   - Click **"Add New Database User"**
   - Username: `johncarloc201_db_user`
   - Password: `papajesus12` (or create a new one)
   - Database User Privileges: **"Read and write to any database"**
   - Click **"Add User"**

### Step 3: Get Correct Connection String

1. Go to **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `CarDealership`

### Step 4: Test Connection

After updating Network Access, wait 1-2 minutes, then:

```bash
node server.js
```

You should see:
```
✅ MongoDB Atlas Connected Successfully!
📦 Database: CarDealership
🔗 Cluster: cluster0.xxxxx.mongodb.net
```

## Quick Fix (Allow All IPs - Testing Only)

1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Enter: `0.0.0.0/0`
4. Comment: "Allow all for testing"
5. Click "Confirm"
6. Wait 1-2 minutes
7. Restart your server

## Security Note

⚠️ **Important**: Allowing `0.0.0.0/0` allows connections from anywhere. For production:
- Use specific IP addresses
- Use MongoDB Atlas IP Access List
- Consider using VPC Peering for better security

