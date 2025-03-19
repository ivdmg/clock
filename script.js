const hrs = document.getElementById("hrs");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const week = document.querySelector(".week");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
function launchDigital(){
    let currentData = new Date();

    hrs.innerHTML = (currentData.getHours() < 10 ? "0" : "") + currentData.getHours();
    min.innerHTML = (currentData.getMinutes() < 10 ? "0" : "") + currentData.getMinutes();
    sec.innerHTML = (currentData.getSeconds() < 10 ? "0" : "") + currentData.getSeconds();
    week.innerHTML = (days[currentData.getDay()].slice(0, 3))
}

// launchDigital();

// setInterval(launchDigital, 1000);

const btn = document.getElementById("btn");

// 
const handHrs = document.getElementById("hand-hrs");
const handMin = document.getElementById("hand-min")
const handSec = document.getElementById("hand-sec")

function launchAnalog(){
    let date = new Date();

    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    let hRotate = 30 * hh + mm / 2;
    let mRotate = mm * 6;
    let sRotate = ss * 6;

    handHrs.style.transform = `translate(0, -100%) rotate(${hRotate}deg)`
    handMin.style.transform = `translate(0, -100%) rotate(${mRotate}deg)`
    handSec.style.transform = `translate(0, -85%) rotate(${sRotate}deg)`
}
// launchAnalog();

// setInterval(launchAnalog, 1000);

const btnToggle = document.getElementById("btn");
const digitalClock = document.querySelector(".clock-digital");
const analogClock = document.querySelector(".clock-analog");


let intervalAnalog;
launchDigital();
let intervalDigital = setInterval(launchDigital, 1000);
function addAnalog(){
    clearInterval(intervalDigital);
    btnToggle.innerText = "Digital"
    document.querySelector(".clock-analog").style.display = "flex";
    document.querySelector(".clock-digital").style.display = "none";
    launchAnalog();
    intervalDigital = setInterval(launchAnalog, 1000);
}
function addDigital(){
    clearInterval(intervalAnalog);
    btnToggle.innerText = "Analog"
    document.querySelector(".clock-analog").style.display = "none";
    document.querySelector(".clock-digital").style.display = "flex";
    launchDigital();
    intervalAnalog = setInterval(launchDigital, 1000);
}
btnToggle.addEventListener('click', () => {
    String(btnToggle.innerText) === "ANALOG" ? addAnalog() : addDigital();
})