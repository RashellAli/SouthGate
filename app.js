// ----- LOGIN LOGIC -----
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Optional: Device ID logic (comment out if you don't want single-device enforcement)
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem("deviceId", deviceId);
    }

    const userDoc = db.collection("users").doc(user.uid);
    const docSnap = await userDoc.get();

    if (!docSnap.exists) {
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
    console.error(error);
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
    document.getElementById("notes").value = "";
  })
  .catch(error => {
    alert("Error submitting report: " + error.message);
    console.error(error);
  });
}

// ----- BLUR WHEN TAB HIDDEN -----
document.addEventListener('visibilitychange', () => {
  const formDiv = document.getElementById('formDiv');
  if (!formDiv) return;

  formDiv.style.filter = document.hidden ? 'blur(8px)' : 'none';
});