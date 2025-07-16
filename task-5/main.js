let btn = document.querySelector("button");
let inputDate = document.getElementById("event-input");

function startCounter() {
  let counter = setInterval(() => {
    let eventDate = new Date(inputDate.value).getTime();
    let currentDate = new Date().getTime();
    let timeDiff = eventDate - currentDate;

    let day = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let hour = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let min = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    let sec = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.querySelector(".day").innerHTML = day < 10 ? `0${day}` : day;
    document.querySelector(".hour").innerHTML = hour < 10 ? `0${hour}` : hour;
    document.querySelector(".minute").innerHTML = min < 10 ? `0${min}` : min;
    document.querySelector(".second").innerHTML = sec < 10 ? `0${sec}` : sec;

    if (timeDiff < 0) {
      clearInterval(counter);
      document.querySelector(".day").innerHTML = "00";
      document.querySelector(".hour").innerHTML = "00";
      document.querySelector(".minute").innerHTML = "00";
      document.querySelector(".second").innerHTML = "00";
      alert("🥳🥳🥳");
    }
  }, 1000);
}

btn.addEventListener("click", startCounter);
