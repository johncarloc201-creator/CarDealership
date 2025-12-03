<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Users</title>
    <link rel="stylesheet" href="manage.css">
</head>
<body>
    <!-- Main container -->
    <div class="container">
        <!-- Header -->
        <header>
            <h1>Manage Users</h1>
            <p>View, edit, and manage users' permissions and settings.</p>
        </header>

        <!-- Search and Filters -->
        <div class="search-filter">
            <input type="text" placeholder="Search users..." id="search" />
            <div class="filters">
                <label for="status">Status:</label>
                <select id="status">
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <label for="role">Role:</label>
                <select id="role">
                    <option value="all">All</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>
        </div>

        <!-- User Table -->
        <table class="user-table">
            <thead>
                <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>John Doe</td>
                    <td>john@example.com</td>
                    <td>Admin</td>
                    <td>Active</td>
                    <td>2024-12-01 15:35:00</td>
                    <td><button class="edit-btn">Edit</button></td>
                </tr>
                <tr>
                    <td>Jane Smith</td>
                    <td>jane@domain.com</td>
                    <td>User</td>
                    <td>Inactive</td>
                    <td>2024-11-30 12:10:00</td>
                    <td><button class="edit-btn">Edit</button></td>
                </tr>
                <!-- More rows can go here -->
            </tbody>
        </table>

        <!-- Modal for Editing User -->
        <div class="modal" id="edit-modal">
            <div class="modal-content">
                <span class="close-btn" id="close-modal">&times;</span>
                <h2>Edit User</h2>
                <form id="edit-form">
                    <label for="username">Name:</label>
                    <input type="text" id="username" value="John Doe" />
                    
                    <label for="email">Email:</label>
                    <input type="email" id="email" value="john@example.com" />

                    <label for="role">Role:</label>
                    <select id="role-edit">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>

                    <label for="status">Status:</label>
                    <select id="status-edit">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <div class="modal-actions">
                        <button type="submit" class="save-btn">Save Changes</button>
                        <button type="button" class="cancel-btn" id="cancel-edit">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
