// Key for localStorage
const STORAGE_KEY = "clickedEmails";

// Retrieve and parse emails from localStorage
function loadEmailLog() {
  const storedEmails = localStorage.getItem(STORAGE_KEY);
  return storedEmails ? JSON.parse(storedEmails) : [];
}

// Save email log to localStorage
function saveEmailLog() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(emailLog));
}

// Initialize email log from localStorage
const emailLog = loadEmailLog();

// Extract email from query parameter
function getEmailFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("email");
}

// Log email and display it
function logEmailAutomatically(email) {
  if (email && !emailLog.includes(email)) {
    emailLog.push(email);
    saveEmailLog(); // Save updated log to localStorage
    displayEmail(email); // Display email in the list
  } else if (emailLog.includes(email)) {
    console.warn(`Email ${email} already logged.`);
  }
}

// Display email in the email log
function displayEmail(email) {
  const emailList = document.getElementById("emailList");
  const emailItem = document.createElement("li");
  emailItem.textContent = email;
  emailList.appendChild(emailItem);
}

// Populate email log from localStorage on page load
function populateEmailLog() {
  emailLog.forEach(email => displayEmail(email));
}

// Main execution on page load
window.onload = function () {
  populateEmailLog(); // Populate stored emails
  const email = getEmailFromQuery(); // Get email from URL
  logEmailAutomatically(email); // Log email automatically
};
