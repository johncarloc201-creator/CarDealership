<?php
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
$totalAmount = (isset($_GET['price']) && is_numeric($_GET['price'])) ? $_GET['price'] + $shippingFee : '50,000,050';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shipping Details</title>
    <link rel="stylesheet" href="buy.css">
    <script>
        function toggleDetails() {
            var form = document.getElementById('shipping-form');
            var details = document.getElementById('details');
            if (form.style.display !== 'none') {
                form.style.display = 'none';
                details.style.display = 'block';
            }
        }
    </script>
</head>
<body>
    <div class="shipping-details">
        <h1>Shipping Details</h1>
        <form id="shipping-form" method="GET" action="">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" required>
            <br>
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" required>
            <br>
            <label for="middleName">Middle Name:</label>
            <input type="text" id="middleName" name="middleName">
            <br>
            <label for="street">Street:</label>
            <input type="text" id="street" name="street" required>
            <br>
            <label for="puokSitio">Puok/Sitio:</label>
            <input type="text" id="puokSitio" name="puokSitio" required>
            <br>
            <label for="barangay">Barangay:</label>
            <input type="text" id="barangay" name="barangay" required>
            <br>
            <label for="city">City:</label>
            <input type="text" id="city" name="city" required>
            <br>
            <label for="state">State:</label>
            <input type="text" id="state" name="state" required>
            <br>
            <label for="country">Country:</label>
            <input type="text" id="country" name="country" required>
            <br>
            <label for="paymentMethod">Payment Method:</label>
            <select id="paymentMethod" name="paymentMethod">
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Online Payment">Online Payment</option>
            </select>
            <br>
            <input type="hidden" name="product" value="<?php echo htmlspecialchars($product); ?>">
            <input type="hidden" name="price" value="<?php echo htmlspecialchars($price); ?>">
            <input type="submit" value="Submit" onclick="toggleDetails();">
        </form>
        <div id="details" style="display:<?php echo isset($_GET['firstName']) ? 'block' : 'none'; ?>;" class="details-box">
            <p>Product: <?php echo htmlspecialchars($product); ?></p>
            <p>Price: <?php echo htmlspecialchars($price); ?></p>
            <p>First Name: <?php echo htmlspecialchars($firstName); ?></p>
            <p>Last Name: <?php echo htmlspecialchars($lastName); ?></p>
            <p>Middle Name: <?php echo htmlspecialchars($middleName); ?></p>
            <p>Address: <?php echo htmlspecialchars($street . ', ' . $puokSitio . ', ' . $barangay . ', ' . $city . ', ' . $state . ', ' . $country); ?></p>
            <p>Payment Method: <?php echo htmlspecialchars($paymentMethod); ?></p>
            <p>Shipping Fee: ₱<?php echo htmlspecialchars($shippingFee); ?></p>
            <p>Total Amount: ₱<?php echo htmlspecialchars($totalAmount); ?></p>
            <button onclick="location.href='place_order.php'">Place Order</button>
        </div>
    </div>
</body>
</html>
