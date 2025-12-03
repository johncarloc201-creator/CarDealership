# Shipping Details Form

<?php
$servername = "localhost"; // Database server
$username = "root"; // Database username
$password = ""; // Database password (default is empty for localhost)
$dbname = "car_website"; // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
<?php
// Include database connection
include('db.php');

$product = isset($_GET['product']) ? $_GET['product'] : 'Unknown Product';
$price = isset($_GET['price']) ? $_GET['price'] : 'Unknown Price';
$firstName = isset($_GET['firstName']) ? $_GET['firstName'] : 'Unknown First Name';
$lastName = isset($_GET['lastName']) ? $_GET['lastName'] : 'Unknown Last Name';
$middleName = isset($_GET['middleName']) ? $_GET['middleName'] : 'Unknown Middle Name';
$street = isset($_GET['street']) ? $_GET['street'] : 'Unknown Street';
$puokSitio = isset($_GET['puokSitio']) ? $_GET['puokSitio'] : 'Unknown Puok/Sitio';
$barangay = isset($_GET['barangay']) ? $_GET['barangay'] : 'Unknown Barangay';
$city = isset($_GET['city']) ? $_GET['city'] : 'Unknown City';
$state = isset($_GET['state']) ? $_GET['state'] : 'Unknown State';
$country = isset($_GET['country']) ? $_GET['country'] : 'Unknown Country';
$paymentMethod = isset($_GET['paymentMethod']) ? $_GET['paymentMethod'] : 'Cash on Delivery';
$shippingFee = 50; // Example shipping fee
$totalAmount = (isset($_GET['price']) && is_numeric($_GET['price'])) ? $_GET['price'] + $shippingFee : 'Unknown Price';

// Insert data into the database when the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['firstName'])) {
    $sql = "INSERT INTO shipping_details (product, price, first_name, last_name, middle_name, street, puok_sitio, barangay, city, state, country, payment_method, shipping_fee, total_amount)
            VALUES ('$product', '$price', '$firstName', '$lastName', '$middleName', '$street', '$puokSitio', '$barangay', '$city', '$state', '$country', '$paymentMethod', '$shippingFee', '$totalAmount')";

    if ($conn->query($sql) === TRUE) {
        echo "<p>Order placed successfully!</p>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close the connection
$conn->close();
?>
<?php
// Include database connection
include('place_order.php');

$product = isset($_GET['product']) ? $_GET['product'] : 'Unknown Product';
$price = isset($_GET['price']) ? $_GET['price'] : 'Unknown Price';
$firstName = isset($_GET['firstName']) ? $_GET['firstName'] : 'Unknown First Name';
$lastName = isset($_GET['lastName']) ? $_GET['lastName'] : 'Unknown Last Name';
$middleName = isset($_GET['middleName']) ? $_GET['middleName'] : 'Unknown Middle Name';
$street = isset($_GET['street']) ? 
