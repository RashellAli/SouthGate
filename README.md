<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>SouthGate Protection - Coming Soon</title>
  <style>
    <img src="IMG_0329.jpg" alt="SouthGate Protection Logo" />
    body {
      margin: 0;
      background-color: #000;
      color: white;
      font-family: Arial, sans-serif;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .container {
      text-align: center;
    }

    .logo {
      width: 200px;
      opacity: 0;
      animation: rise 2s ease-out forwards;
    }

    .fade-in-text {
      opacity: 0;
      animation: fadeIn 2s ease-out forwards;
    }

    .fade-in-text.delay {
      animation-delay: 2s;
    }

    @keyframes rise {
      from {
        opacity: 0;
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="fade-in-text">SouthGate Protection</h1>
    <p class="fade-in-text delay">Coming Soon...</p>
  </div>
</body>
</
