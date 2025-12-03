<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard - Manage Users</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      width: 80%;
      margin: 0 auto;
      padding-top: 20px;
    }
    h2 {
      color: #333;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 10px;
      border: 1px solid #ccc;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
    button {
      padding: 5px 10px;
      cursor: pointer;
    }
    .btn-primary {
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
    }
    .btn-danger {
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
    }
    .form-container {
      margin-bottom: 20px;
    }
    input, select {
      padding: 5px;
      margin-top: 5px;
      margin-bottom: 10px;
      width: 100%;
    }
    .form-container button {
      width: 100%;
      padding: 10px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <div class="container">
    <h2>Manage Users</h2>
    
    <!-- Add User Form -->
    <div class="form-container">
      <h3>Add New User</h3>
      <form id="addUserForm">
        <input type="text" id="userName" placeholder="Name" required>
        <input type="email" id="userEmail" placeholder="Email" required>
        <select id="userRole" required>
          <option value="" disabled selected>Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
        <button type="submit">Add User</button>
      </form>
    </div>

    <!-- User Table -->
    <table id="userTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Users will be added dynamically here -->
      </tbody>
    </table>
  </div>

  <script>
    // Array to hold user data
    let users = [];

    // Function to render users in the table
    function renderUsers() {
      const tableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];
      tableBody.innerHTML = '';  // Clear existing users

      users.forEach((user, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>
            <button class="btn-danger" onclick="deleteUser(${index})">Delete</button>
          </td>
        `;
      });
    }

    // Add new user
    document.getElementById('addUserForm').addEventListener('submit', function(event) {
      event.preventDefault();  // Prevent form submission

      const name = document.getElementById('userName').value;
      const email = document.getElementById('userEmail').value;
      const role = document.getElementById('userRole').value;

      if (name && email && role) {
        const newUser = { name, email, role };
        users.push(newUser);

        // Clear the form and re-render the table
        document.getElementById('addUserForm').reset();
        renderUsers();
      }
    });

    // Delete user
    function deleteUser(index) {
      if (confirm('Are you sure you want to delete this user?')) {
        users.splice(index, 1);
        renderUsers();
      }
    }

    // Initial render of the user list
    renderUsers();
  </script>
</body>
</html>
