# SouthGate Protection![IMG_0329](https://github.com/user-attachments/assets/fbc9527f-dc10-42dd-a211-b7697e311a22)

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>SouthGate Protection - Coming Soon</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <img src="logo.png" alt="SouthGate Protection Logo" class="logo" />
    <h1 class="fade-in-text">SouthGate Protection</h1>
    <p class="fade-in-text delay">Coming Soon...</p>
  </div>
</body>
</html>
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
