let userName = window.prompt("Name: ");
let userBirthYear = window.prompt("Birth Year: ");
let isStudent = window.confirm("Are You Student? ");

let currentYear = new Date().getFullYear();
let userAge = currentYear - userBirthYear;

let userCategory;
if (userAge < 13) {
  userCategory = "Kid";
} else if (userAge <= 17) {
  userCategory = "Teen";
} else if (userAge <= 59) {
  userCategory = "Adult";
} else {
  userCategory = "Senior";
}

let p = document.querySelector("p");
let msgConsole = `Hello ${userName}, You are ${userAge} years old.\nCategory: ${userCategory}.`;
let msgDocument = `Hello ${userName}, You are ${userAge} years old.<br>Category: ${userCategory}.`;

if (isStudent === true) {
  p.innerHTML = `${msgDocument}<br>Don't Forget To Study Hard!`;
  console.log(`${msgConsole}\nDon't Forget To Study Hard!`);
  window.alert(`${msgConsole}\nDon't Forget To Study Hard!`);
} else {
  p.innerHTML = msgDocument;
  console.log(msgConsole);
  window.alert(msgConsole);
}
