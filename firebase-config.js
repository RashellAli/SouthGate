// Firebase configuration for SouthGate Protection
const firebaseConfig = {
  apiKey: "AIzaSyCfDWx6xC0DdgCNgk_dAd1pLD2zpqWeCYs",
  authDomain: "southgateprotection.firebaseapp.com",
  projectId: "southgateprotection",
  storageBucket: "southgateprotection.appspot.com",
  messagingSenderId: "19042058562",
  appId: "1:19042058562:web:fe2b6be92f73b47ccbc8db"
};

// Initialize Firebase (compat version)
firebase.initializeApp(firebaseConfig);

// Shortcut references
const auth = firebase.auth();
const db = firebase.firestore();