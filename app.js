// =================================================================
// 1. FIREBASE CONFIGURATION (Firebase से जोड़ने की सेटिंग्स)
// =================================================================
// YE AAPKO FIREBASE CONSOLE SE MILEGA
// Project Settings -> General -> Your apps -> SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSy...APNA_API_KEY_YAHAN_DAALEIN",
  authDomain: "APNA_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://APNA_PROJECT_ID.firebaseio.com",
  projectId: "APNA_PROJECT_ID",
  storageBucket: "APNA_PROJECT_ID.appspot.com",
  messagingSenderId: "APNA_SENDER_ID",
  appId: "APNA_APP_ID"
};

// Firebase ko in settings ke saath chalu karein
firebase.initializeApp(firebaseConfig);

// Firebase ki zaroori services ke shortcut bana lein
const auth = firebase.auth();
const db = firebase.database();


// =================================================================
// 2. ADMIN CONFIGURATION (Admin को पहचानने की सेटिंग्स)
// =================================================================
// YE UID AAPKO FIREBASE CONSOLE KE AUTHENTICATION SECTION SE MILEGI
const ADMIN_UID = "YAHAN_ADMIN_KI_UID_PASTE_KAREIN";


// =================================================================
// 3. UI ELEMENTS (HTML के हिस्सों को पकड़ना)
// =================================================================
const loginSection = document.getElementById('login-section');
const userInfoSection = document.getElementById('user-info');
const userEmailSpan = document.getElementById('user-email');
const logoutButton = document.getElementById('logout-button');

const adminOnlyLinks = document.querySelectorAll('.admin-only');
const userOnlyLinks = document.querySelectorAll('.user-only');


// =================================================================
// 4. AUTHENTICATION LOGIC (Login/Logout का असली जादू)
// =================================================================
// Yeh function tab chalta hai jab user login, logout ya page refresh karta hai
auth.onAuthStateChanged(user => {
  if (user) {
    // --- USER LOGIN HAI ---
    console.log("User is logged in:", user.uid);

    // Login/Register section ko chhupao
    if(loginSection) loginSection.style.display = 'none';

    // User info aur logout button dikhao
    if(userInfoSection) userInfoSection.style.display = 'block';
    if(userEmailSpan) userEmailSpan.textContent = user.email;
    if(logoutButton) logoutButton.style.display = 'inline-block';

    // Ab check karo ki user ADMIN hai ya NORMAL USER
    if (user.uid === ADMIN_UID) {
      // --- USER ADMIN HAI ---
      console.log("Role: ADMIN");
      // Admin ke links dikhao
      adminOnlyLinks.forEach(elem => { elem.style.display = 'inline-block'; });
      // User ke links chhupao
      userOnlyLinks.forEach(elem => { elem.style.display = 'none'; });

    } else {
      // --- USER EK NORMAL USER HAI ---
      console.log("Role: NORMAL USER");
      // User ke links dikhao
      userOnlyLinks.forEach(elem => { elem.style.display = 'inline-block'; });
      // Admin ke links chhupao
      adminOnlyLinks.forEach(elem => { elem.style.display = 'none'; });
    }

  } else {
    // --- USER LOGOUT HAI ---
    console.log("User is logged out.");

    // Login/Register section ko dikhao
    if(loginSection) loginSection.style.display = 'block';

    // User info aur logout button chhupao
    if(userInfoSection) userInfoSection.style.display = 'none';

    // Saare role-specific links chhupa do
    adminOnlyLinks.forEach(elem => { elem.style.display = 'none'; });
    userOnlyLinks.forEach(elem => { elem.style.display = 'none'; });
  }
});

// Logout button par click karne par kya hoga
if(logoutButton) {
    logoutButton.addEventListener('click', () => {
      auth.signOut().then(() => {
        console.log("User signed out successfully.");
        // Logout ke baad user ko login page par bhej sakte hain
        // window.location.href = '/login.html';
      }).catch((error) => {
        console.error("Sign out error:", error);
      });
    });
}

console.log("App script loaded and running.");
