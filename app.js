// ----- LOGIN LOGIC WITH SINGLE DEVICE ENFORCEMENT -----
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Bypass device check for the admin email
    if (email === "info@southgateprotection.co.uk") {
      document.getElementById("loginDiv").style.display = "none";
      document.getElementById("formDiv").style.display = "block";
      alert("Login successful!");
      return;
    }

    // Generate a device ID for this session
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = Math.random().toString(36).substring(2, 15); // simple unique string
      localStorage.setItem("deviceId", deviceId);
    }

    // Check Firestore for existing device ID
    const userDoc = db.collection("users").doc(user.uid);
    const docSnap = await userDoc.get();

    if (!docSnap.exists) {
      // First time login, save device ID
      await userDoc.set({ deviceId: deviceId });
    } else {
      const storedDevice = docSnap.data().deviceId;
      if (storedDevice && storedDevice !== deviceId) {
        await auth.signOut();
        alert("Login blocked: this account is only allowed on its registered device.");
        return;
      }
    }

    document.getElementById("loginDiv").style.display = "none";
    document.getElementById("formDiv").style.display = "block";
    alert("Login successful!");

  } catch (error) {
    alert("Login failed: " + error.message);
  }
}