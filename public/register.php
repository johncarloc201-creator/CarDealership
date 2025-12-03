<?php
// Database credentials
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'clients';

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Register a new user
if (isset($_POST['firstname'], $_POST['lastname'], $_POST['email'], $_POST['password'], $_POST['role'])) {
    // Sanitize inputs
    $firstname = $conn->real_escape_string($_POST['firstname']);
    $lastname = $conn->real_escape_string($_POST['lastname']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = $conn->real_escape_string($_POST['password']);
    $role = $conn->real_escape_string($_POST['role']);

    // Check if email already exists
    $checkEmailQuery = "SELECT id FROM users WHERE email = '$email' LIMIT 1";
    $result = $conn->query($checkEmailQuery);
    if ($result->num_rows > 0) {
        echo "Email is already registered.";
    } else {
        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insert into database
        $sql = "INSERT INTO users (firstname, lastname, email, password, role) 
                VALUES ('$firstname', '$lastname', '$email', '$hashed_password', '$role')";

        if ($conn->query($sql) === TRUE) {
            echo "Account created successfully!";
            // Redirect to login page after registration
            header("Location: login.php?status=created");
            exit();
        } else {
            echo "Error: " . $conn->error;
        }
    }
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WHEEL TO GO - Register</title>
    <link rel="stylesheet" href="main1.css">
</head>
<body>
    <div class="wrapper">
        <nav class="navbar">
            <ul>
                <li><a class="active" href="body.php">HOME</a></li>
                <li><a href="#">COLLECTIONS</a></li>
                <li><a href="#">BUY CARS</a></li>
                <li><a href="#">PARTS</a></li>
                <li><a href="#">SERVICES</a></li>
                <li><a href="#">ABOUT US</a></li>
            </ul>
        </nav>

        <!-- Signup Form -->
        <div class="form-container">
            <div class="form" id="signup-form">
                <form action="register.php" method="POST">
                    <h2>Create Account</h2>
                    <div class="input-group">
                        <label for="signup-firstname">Firstname</label>
                        <input type="text" id="signup-firstname" name="firstname" required>
                    </div>
                    <div class="input-group">
                        <label for="signup-lastname">Lastname</label>
                        <input type="text" id="signup-lastname" name="lastname" required>
                    </div>
                    <div class="input-group">
                        <label for="signup-email">Email</label>
                        <input type="email" id="signup-email" name="email" required>
                    </div>
                    <div class="input-group">
                        <label for="signup-password">Password</label>
                        <input type="password" id="signup-password" name="password" required>
                    </div>
                    <div class="role-selection">
                        <label>
                            <input type="radio" name="role" value="admin"> Admin
                        </label>
                        <label>
                            <input type="radio" name="role" value="customer" checked> Customer
                        </label>
                    </div>
                    <button type="submit">Create Account</button>
                    <p>Already have an account? <a href="login.php">Sign In</a></p>
                </form>
            </div>
        </div>

        <script>
            // Function to toggle between login and signup forms
            function toggleForms() {
                const loginForm = document.getElementById('login-form');
                const signupForm = document.getElementById('signup-form');
                if (loginForm.style.display === "none") {
                    loginForm.style.display = "block";
                    signupForm.style.display = "none";
                } else {
                    loginForm.style.display = "none";
                    signupForm.style.display = "block";
                }
            }
        </script>
    </div>
</body>
</html>
