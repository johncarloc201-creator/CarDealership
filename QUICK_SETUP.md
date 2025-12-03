# Quick MongoDB Connection Setup

## 🚀 Fast Setup (3 Steps)

### Step 1: Get Your MongoDB Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **"Database"** → **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your password
6. Replace `<dbname>` with `CarDealership`

### Step 2: Create .env File

Create a file named `.env` in `D:\MONGO_APP\` with this content:

```
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/CarDealership?retryWrites=true&w=majority
PORT=5000
```

**Replace:**
- `your_username` → Your MongoDB username
- `your_password` → Your MongoDB password  
- `your_cluster.mongodb.net` → Your cluster address

### Step 3: Test Connection

```bash
node test-connection.js
```

If successful, you'll see:
```
✅ Connection Successful!
```

## 🔧 Alternative: Use Setup Script

Run the interactive setup:

```bash
node setup-connection.js
```

This will guide you through entering your credentials.

## 📝 Manual Setup (Edit db.js)

If you prefer, you can directly edit `db.js` and update these lines:

```javascript
const username = 'your_username';
const password = 'your_password';
const cluster = 'your_cluster.mongodb.net';
const database = 'CarDealership';
```

## ⚠️ Important: MongoDB Atlas Setup

Before connecting, make sure:

1. **Network Access:**
   - Go to MongoDB Atlas → Network Access
   - Add IP Address: `0.0.0.0/0` (for testing)
   - Or add your specific IP address

2. **Database User:**
   - Go to Database Access
   - Create user with "Read and write to any database" permission
   - Note the username and password

3. **Wait 1-2 minutes** after making changes in Atlas

## ✅ Verify Connection

After setup, start your server:

```bash
node server.js
```

You should see:
```
✅ MongoDB Atlas Connected Successfully!
📦 Database: CarDealership
```

## 🆘 Need Help?

- See `MONGODB_SETUP.md` for detailed instructions
- Run `node test-connection.js` for diagnostics
- Check MongoDB Atlas dashboard for connection issues

