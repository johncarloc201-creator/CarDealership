<?php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WHEEL 2 GO</title>
    <link rel="stylesheet" href="body.css">
    <style>
        .wrapper {
            position: relative;
        }
        .navbar {
            position: absolute;
            top: 0;
            width: 100%;
            z-index: 1;
        }
        #bodybackground {
            width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <nav class="navbar">
            <ul>
                <li><a href="cars.php">COLLECTIONS</a></li>
                <li><a href="cars10.php">BUY CARS</a></li>
                <li><a href="parts.php">PARTS</a></li>
                <li><a href="services.php">SERVICES</a></li>
                <li><a href="about.php">ABOUT US</a></li>
                <li><a href="register.php">LOGOUT</a></li>
            </ul>
        </nav>
        <br>
        <video autoplay muted loop id="bodybackground">
            <source src="body.mp4" type="video/mp4">
        </video>

        <div class="basta">
            <p> GETS YOUR <br> WHEELS TURNING.</p>
        </div>
        
        

</body>
</html>
