let temp = prompt("Write The Termprature Degree in Celsius Please!");

let heatLevel =
  temp < 0
    ? "Freezing Cold"
    : temp <= 15
    ? "Cold"
    : temp <= 25
    ? "Mid"
    : temp <= 35
    ? "Warm"
    : "Hot";

let riskLevel;
if (temp > -5 && temp < 40) {
  riskLevel = "Safe Temprature";
} else {
  riskLevel = "Dangerous Temprature";
}

let safetyTip =
  temp > 16 && temp < 25
    ? "Perfect for outdoor activities!"
    : temp > 30
    ? "Stay hydrated!"
    : "Have a Nice Day!";

let msgConsole = `
    Temp: ${temp}
    Heat Level: ${heatLevel}
    Risk Level: ${riskLevel}
    Safety Tip: ${safetyTip}
`;

let msgDocument = `
    Temp: ${temp}
    <br>
    Heat Level: ${heatLevel}
    <br>
    Risk Level: ${riskLevel}
    <br>
    Safety Tip: ${safetyTip}
`;

console.log(msgConsole);
alert(msgConsole);

let p = document.querySelector("p");
p.innerHTML = msgDocument;
