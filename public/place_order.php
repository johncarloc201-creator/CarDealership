<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $product = isset($_POST['product']) ? $_POST['product'] : 'Unknown Product';
    $price = isset($_POST['price']) ? $_POST['price'] : 'Unknown Price';
    $firstName = isset($_POST['firstName']) ? $_POST['firstName'] : 'Unknown First Name';
    $lastName = isset($_POST['lastName']) ? $_POST['lastName'] : 'Unknown Last Name';
    $middleName = isset($_POST['middleName']) ? $_POST['middleName'] : 'Unknown Middle Name';
    $street = isset($_POST['street']) ? $_POST['street'] : 'Unknown Street';
    $puokSitio = isset($_POST['puokSitio']) ? $_POST['puokSitio'] : 'Unknown Puok/Sitio';
    $barangay = isset($_POST['barangay']) ? $_POST['barangay'] : 'Unknown Barangay';
    $city = isset($_POST['city']) ? $_POST['city'] : 'Unknown City';
    $state = isset($_POST['state']) ? $_POST['state'] : 'Unknown State';
    $country = isset($_POST['country']) ? $_POST['country'] : 'Unknown Country';
    $paymentMethod = isset($_POST['paymentMethod']) ? $_POST['paymentMethod'] : 'Cash on Delivery';
    $shippingFee = 50;
    $totalAmount = (is_numeric($price)) ? $price + $shippingFee : '50,000.050';

    $_SESSION['order'] = [
        'product' => $product,
        'price' => $price,
        'firstName' => $firstName,
        'lastName' => $lastName,
        'middleName' => $middleName,
        'address' => "$street, $puokSitio, $barangay, $city, $state, $country",
        'paymentMethod' => $paymentMethod,
        'shippingFee' => $shippingFee,
        'totalAmount' => $totalAmount,
    ];

    header('Location: order_confirmation.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <link rel="stylesheet" href="place_order.css">
    <style>
        body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .button-container {
            margin-top: 20px;
        }
        button {
            margin: 5px;
            padding: 10px 20px;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h1>Order Confirmed</h1>
    <p>Your order has been successfully placed!</p>
    <div class="button-container">
        <form action="cars10.php" method="get">
            <button type="submit">Continue</button>
        </form>
        <form action="body.php" method="get">
            <button type="submit">Go Back Home</button>
            
        </form>
    </div>
</body>
</html>
