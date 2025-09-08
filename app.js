// ----- LOGIN LOGIC -----
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("loginDiv").style.display = "none";
      document.getElementById("formDiv").style.display = "block";
      alert("Login successful!");
    })
    .catch(error => {
      alert("Login failed: " + error.message);
    });
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