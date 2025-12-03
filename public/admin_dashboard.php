<?php
// Start the session
session_start();

// Check if the user is logged in and is an admin
if (!isset($_SESSION['user_id']) || $_SESSION['role'] != 'admin') {
    // If not an admin, redirect to login page
    header("Location: login.php");
    exit();
}

// Admin content goes here
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <!-- Link to external stylesheet -->
    <link rel="stylesheet" href="styles.css">
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="wrapper">
        <!-- Sidebar -->
        <aside class="sidebar">
            <h2>Admin Panel</h2>
            <ul>
                <li><a href="dashboard.php" class="active"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                <li><a href="manage_users.php"><i class="fas fa-users"></i> Manage Users</a></li>
                <li><a href="view_reports.php"><i class="fas fa-chart-line"></i> View Reports</a></li>
                <li><a href="settings.php"><i class="fas fa-cogs"></i> Settings</a></li>
            </ul>
        </aside>

        
        <div class="content-wrapper">
            
            <header>
                <div class="navbar">
                    <h1>Admin Dashboard</h1>
                    <div class="user-info">
                        <p>Welcome, <strong><?php echo $_SESSION['email']; ?></strong></p>
                        <a href="logout.php" class="logout-btn">Logout</a>
                    </div>
                </div>
            </header>

            
            <main>
                <section class="welcome-section">
                    <h2>Welcome to the Admin Dashboard</h2>
                    <p>You are logged in as <strong><?php echo $_SESSION['email']; ?></strong>. Use the navigation panel to manage the system.</p>
                </section>

                <section class="admin-actions">
                    <div class="action-card">
                        <a href="manage_users.php" class="action-btn">
                            <i class="fas fa-users-cog"></i> Manage Users
                        </a>
                    </div>
                    <div class="action-card">
                        <a href="view_reports.php" class="action-btn">
                            <i class="fas fa-chart-pie"></i> View Reports
                        </a>
                    </div>
                    <div class="action-card">
                        <a href="settings.php" class="action-btn">
                            <i class="fas fa-cogs"></i> Settings
                        </a>
                    </div>
                </section>
            </main>

            
           <footer>
                <p>&copy; 2024 Admin WHEELS TO GO Dashboard | All rights reserved</p>
            </footer> 
        </div>
    </div>
</body>
</html>
