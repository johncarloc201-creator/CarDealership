# Fix MongoDB Atlas Authentication Error

## Current Error
```
Error Code: 8000
Error Message: bad auth : authentication failed
```

## This means:
- ✅ Network Access is working (0.0.0.0/0 is fine)
- ❌ Username or password is incorrect

## Solution Steps:

### Option 1: Verify Existing User

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **"Database Access"** (left sidebar)
3. Look for user: `johncarloc201_db_user`
4. If it exists:
   - Click on the user
   - Click **"Edit"** (pencil icon)
   - Click **"Edit Password"**
   - Set password to: `papajesus12`
   - Click **"Update User"**

### Option 2: Create New User

1. Go to **"Database Access"**
2. Click **"Add New Database User"**
3. Fill in:
   - **Authentication Method:** Password
   - **Username:** `johncarloc201_db_user`
   - **Password:** `papajesus12` (or your choice)
   - **Database User Privileges:** 
     - Select: **"Read and write to any database"**
   - Click **"Add User"**

### Option 3: Use Different Credentials

If you want to use different credentials:

1. Create a new user in MongoDB Atlas
2. Update `db.js` file:
   ```javascript
   const password = encodeURIComponent('YOUR_NEW_PASSWORD');
   const MONGODB_URI = `mongodb+srv://YOUR_USERNAME:${password}@cluster0.cptuapp.mongodb.net/CarDealership?retryWrites=true&w=majority&appName=Cluster0`;
   ```

## After Fixing:

1. Wait 1-2 minutes for changes to apply
2. Test connection:
   ```bash
   node test-connection.js
   ```
3. If successful, start server:
   ```bash
   node server.js
   ```

## Quick Test:

Run this to verify credentials:
```bash
node test-connection.js
```

You should see:
```
✅ Connection Successful!
📦 Database: CarDealership
```

