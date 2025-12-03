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

// Login functionality
if (isset($_POST['email'], $_POST['password'])) {
    // Sanitize inputs
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];

    // Retrieve user data from database
    $sql = "SELECT * FROM users WHERE email = '$email' LIMIT 1";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verify password
        if (password_verify($password, $user['password'])) {
            // Start session and set session variables
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['role'] = $user['role'];

            // Redirect to the admin dashboard if the user is an admin
            if ($_SESSION['role'] == 'admin') {
                header("Location: admin_dashboard.php"); // Admin dashboard page
                exit();
            } else {
                // Redirect to the default home page if the user is a customer
                header("Location: body.php?status=loggedin");
                exit();
            }
        } else {
            $error_message = "Incorrect password.";
        }
    } else {
        $error_message = "No user found with that email address.";
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WHEEL TO GO - Login</title>
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

        <div class="form-container">
            <!-- Login Form -->
            <div class="form" id="login-form">
                <form action="login.php" method="POST">
                    <h2>Sign In</h2>
                    <?php if (isset($error_message)) { echo "<p style='color:red;'>$error_message</p>"; } ?>
                    <div class="input-group">
                        <label for="login-email">Email</label>
                        <input type="email" id="login-email" name="email" required>
                    </div>
                    <div class="input-group">
                        <label for="login-password">Password</label>
                        <input type="password" id="login-password" name="password" required>
                    </div>
                    <button type="submit">Sign In</button>
                    <p>Don't have an account? <a href="register.php">Create Account</a></p>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
