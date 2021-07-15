function saveUser() {
  // Get Email Input Element //
  let userEmail = document.getElementById("in-email");
  // Initializing users vector //
  let users = [];
  // Getting users vector if you have it in localStorage //
  if(localStorage.hasOwnProperty("users")) {
  	users = JSON.parse(window.localStorage.getItem("users"));
  }
  // Check if the email is already registered //
  // If registered, it does not save in localStorage and shows "E-mail já cadastrado" //
  // If not registered, save to localStorage and show "E-mail cadastrado com sucesso" //
  let verify = users.findIndex(user => { if(user.email == userEmail.value) return true; });
  if(verify != -1) {
    userEmail.value = "";
    alert("E-mail já cadastrado.");
    return false;
  } else {
    // Adding a new object (user) to the users vector //
    users.push({ email: userEmail.value });
    // Save the vector of users to localStorage //
    window.localStorage.setItem("users", JSON.stringify(users));
    userEmail.value = "";
    alert("E-mail cadastrado com sucesso.");
  }
}

function updateTimer(black, today, digit) {
  // Calculate days
  let difference = black.getTime() - today.getTime();
  let days = Math.trunc(difference / (1000*60*60*24));
	// Calculate hours
  difference = difference % (1000*60*60*24);
	let hours = Math.trunc(difference / (1000*60*60));
	// Calculate minutes
  difference = difference % (1000*60*60);
	let minutes = Math.trunc(difference / (1000*60)) + 1;
  //
  digit[0].innerText = days;
  digit[1].innerText = hours;
  digit[2].innerText = minutes;
}

var digitsElements = document.getElementsByClassName("digit");
let today = new Date();
var blackFriday = new Date(new Date().getFullYear(), 10, 26);

updateTimer(blackFriday, today, digitsElements);

let diff = 60000 - (today.getSeconds() * 1000);

window.setTimeout(() => {
  updateTimer(blackFriday, new Date(), digitsElements);
  window.setInterval(() => {
    updateTimer(blackFriday, new Date(), digitsElements);
  }, 60000);
}, diff);