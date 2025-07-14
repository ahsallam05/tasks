let userName = prompt("Name: ");
let userAge = prompt("Age: ");
let baseSalary = prompt("Salary: ");
let yearsOfExperience = prompt("Years of Experience: ");
let selfRating = prompt("Rate Yourself from 1 to 10: ");

let jobLevel;
if (yearsOfExperience < 2) {
  jobLevel = "Junior";
} else if (yearsOfExperience < 5) {
  jobLevel = "Mid-Level";
} else if (yearsOfExperience < 10) {
  jobLevel = "Senior";
} else {
  jobLevel = "Expert";
}

let performanceLevel;
switch (selfRating) {
  case "10":
  case "90":
    performanceLevel = "Excellent";
    break;
  case "8":
  case "70":
    performanceLevel = "Good";
    break;
  case "60":
  case "50":
    performanceLevel = "Average";
    break;
  case "40":
  case "30":
  case "20":
  case "10":
    performanceLevel = "Needs Improvements";
    break;
}

let bonus;
if (yearsOfExperience <= 2) {
  bonus = baseSalary * 0.1;
} else if (yearsOfExperience <= 5) {
  bonus = baseSalary * 0.15;
} else {
  bonus = baseSalary * 0.2;
}
let finalSalary = Number(baseSalary) + bonus;

let currentHour = new Date().getHours();
let workShift;
if (currentHour >= 9 && currentHour <= 18) {
  workShift = "Day Shift";
} else {
  workShift = "Night Shift";
}

let summaryConsole = `
Name: ${userName}
Age: ${userAge}
Job Level: ${jobLevel}
Performance Level: ${performanceLevel}
Base Salary: ${baseSalary}
Bonus: ${bonus}
Final Salary: ${finalSalary}
Shift: ${workShift}
`
let summaryDocument = `
Name: ${userName}
<br>
Age: ${userAge}
<br>
Job Level: ${jobLevel}
<br>
Performance Level: ${performanceLevel}
<br>
Base Salary: ${baseSalary}
<br>
Bonus: ${bonus}
<br>
Final Salary: ${finalSalary}
<br>
Shift: ${workShift}
`

console.log(summaryConsole);
window.alert(summaryConsole);
let p = document.getElementById('p');
p.innerHTML = summaryDocument;