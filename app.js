// ----- LOGIN LOGIC WITH SINGLE DEVICE ENFORCEMENT -----
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

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

// ----- LOGOUT LOGIC -----
function logout() {
  auth.signOut().then(() => {
    document.getElementById("loginDiv").style.display = "block";
    document.getElementById("formDiv").style.display = "none";
  });
}

// ----- SUBMIT REPORT -----
function submitReport() {
  const type = document.getElementById("type").value;
  const notes = document.getElementById("notes").value;

  if (!notes) {
    alert("Please enter report details.");
    return;
  }

  db.collection("reports").add({
    type: type,
    notes: notes,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    user: auth.currentUser.email
  })
  .then(() => {
    alert("Report submitted successfully!");
    document.getElementById("notes").value = ""; // clear textarea
  })
  .catch(error => {
    alert("Error submitting report: " + error.message);
  });
}

// ----- BLUR WHEN TAB HIDDEN -----
document.addEventListener('visibilitychange', () => {
  const formDiv = document.getElementById('formDiv');
  if (!formDiv) return;

  if (document.hidden) {
    formDiv.style.filter = 'blur(8px)';
  } else {
    formDiv.style.filter = 'none';
  }
});