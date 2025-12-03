<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<div class="wrapper">
    <nav class="navbar">
      
        <ul>
            <li><a class="active" href="body.php">HOME</a></li>
            <li><a href="cars.php">COLLECTIONS</a></li>
            <li><a href="cars10.php">BUY CARS</a></li>
            <li><a href="parts.php">PARTS</a></li>
            <li><a href="services.php">SERVICES</a></li>
            
          
        </ul>   
    </nav>
</div>
<style>
.navbar {
    height: 80px;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
}

.navbar ul {
    float: right;
    margin-right: 20px;
    margin-top: 0px;
}

.navbar ul li {
    list-style: none;
    margin: 9px;
    display: inline-block;
    line-height: 80px;
}

.navbar ul li a {
    text-decoration: none;
    color: white;
    font-size: 20px;
    padding: 5px 12px;
    font-family: 'Roboto', sans-serif;
    transition: .4s ease-in;
}

.navbar ul li button {
    text-decoration: none;
    color: white;
    font-size: 20px;
    padding: 5px 12px;
    font-family: 'Roboto', sans-serif;
    transition: .4s ease-in;
    background-color: red;
}

.navbar ul li a:hover {
    background: red;
    border-radius: 2px;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.column {
  float: left;
  width: 33.3%;
  margin-bottom: 16px;
  padding: 0 8px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 5px;
}

.about-section {
  padding: 50px;
  text-align: center;
  background-color: #474e5d;
  color: white;
  align text: center;
}
.about-mission {
  padding: 50px;
  text-align: left;
  background-color: #474e5d;
  color: white;
  text align: justify;

}
.about-vision {
  padding: 50px;
  text-align: left;
  background-color: #474e5d;
  color: white;
  text align: justify;
}


.container {
  padding: 0 16px;
}

.container::after, .row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #555;
}
@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}
</style>
</head>
<body>

<div class="about-section">
  <h1>About Us </h1>
  <p>At WHEEL TO GO, we're dedicated to providing car enthusiasts and buyers with expert insights,  reviews, and the latest automotive trends.
   Whether you're searching for your next vehicle, need maintenance tips, or simply want to stay updated on the newest releases, we’ve got you covered. Our goal is to help you make informed decisions and enhance your driving experience.</p>
</div>

<div>
<h2 style="text-align:center">Team Payaman</h2>
<div class="row">
  <div class="column">
    <div class="card">
      <img src="ryannn.jpg" alt="Ryan" style="width:100%">
      <div class="container">
        <h2>Ryan Aniola</h2>
        <p class="title">CEO & Founder</p>
        <p>Driving Innovation, Delivering Excellence.</p>
        <p>aniolaryan7@gmail.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src="carlzz1.jpg" alt="Mike" style="width:100%">
      <div class="container">
        <h2>John Carlo Castro</h2>
        <p class="title">Analyst</p>
        <p>Revolutionizing the Road, One Car at a Time.</p>
        <p>carlojohncastro2@gmail.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
      <img src="diazzz.jpg" alt="John" style="width:100%">
      <div class="container">
        <h2>Christian Rey Diaz</h2>
        <p class="title">System Management Director</p>
        <p>Your Gateway to Luxury and Speed.</p>
        <p>diazchristian9@gmail.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
</div>
 <div class="column">
    <div class="card">
      <img src="lib.jpg" alt="John" style="width:100%">
      <div class="container">
        <h2>Reymart Libres</h2>
        <p class="title">Web Designer</p>
        <p>Passion for Cars, Commitment to Quality.</p>
        <p>libresretmart5@gmail.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
</div>
<div class="column">
    <div class="card">
      <img src="glen.jpg" alt="John" style="width:100%">
      <div class="container">
        <h2>Glennmar Baguio</h2>
        <p class="title">Accounting Manager</p>
        <p>Redefining the Road with Every Drive.</p>
        <p>baguioglennmar1@gmail.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
</div>
</div>



</body>
</html>