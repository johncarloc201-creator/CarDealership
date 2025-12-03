


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - WHEEL TO GO</title>
    <link rel="stylesheet" href="main1.css">
</head>
<body>
    <div class="wrapper">
        <nav class="navbar">
            <ul>
                <li><a href="index.php">HOME</a></li>
                <li><a href="#">COLLECTIONS</a></li>
                <li><a href="#">BUY CARS</a></li>
                <li><a href="#">PARTS</a></li>
                <li><a href="#">SERVICES</a></li>
                <li><a href="#">ABOUT US</a></li>
            </ul>
        </nav>

        <div class="form-container">
            <!-- Signup Form -->
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
                            <input type="radio" name="role" value="admin">
                            Admin
                        </label>
                        <label>
                            <input type="radio" name="role" value="customer" checked>
                            Customer
                        </label>
                    </div>
                    <button type="submit">Create Account</button>
                    <p>Already have an account? <a href="login.php">Sign In</a></p>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
