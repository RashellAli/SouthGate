// ----- LOGIN LOGIC -----
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    console.log("Login successful for:", user.email);

    document.getElementById("loginDiv").style.display = "none";
    document.getElementById("formDiv").style.display = "block";

  } catch (error) {
    console.error("Login failed:", error);
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
    document.getElementById("notes").value = "";
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