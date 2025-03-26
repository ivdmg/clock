const hrs = document.getElementById("hrs");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const week = document.querySelector(".week");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
const btn = document.getElementById("btn"); 
const handHrs = document.getElementById("hand-hrs");
const handMin = document.getElementById("hand-min")
const handSec = document.getElementById("hand-sec")

const digitalClock = document.querySelector(".clock-digital");
const analogClock = document.querySelector(".clock-analog");
const calendar = document.querySelector(".calendar");

const digitalBtn = document.getElementById("digital");
const analogBtn = document.getElementById("analog");
const calendarBtn = document.getElementById("calendar");

const dropdownbtn = document.getElementById("btndropdown");
const dropdownlist = document.querySelector(".dropdown-list");

function launchDigital(){
    let currentData = new Date();

    hrs.innerHTML = (currentData.getHours() < 10 ? "0" : "") + currentData.getHours();
    min.innerHTML = (currentData.getMinutes() < 10 ? "0" : "") + currentData.getMinutes();
    sec.innerHTML = (currentData.getSeconds() < 10 ? "0" : "") + currentData.getSeconds();
    week.innerHTML = (days[currentData.getDay()].slice(0, 3))
}

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

let intervalAnalog;
launchDigital();
let intervalDigital = setInterval(launchDigital, 1000);
function addAnalog(){
    clearInterval(intervalDigital);
    digitalClock.style.display = "none"
    calendar.style.display = "none"
    analogClock.style.display = "flex";
    launchAnalog();
    intervalDigital = setInterval(launchAnalog, 1000);
}
function addDigital(){
    clearInterval(intervalAnalog);
    calendar.style.display = "none";
    analogClock.style.display = "none";
    digitalClock.style.display = "flex";
    launchDigital();
    intervalAnalog = setInterval(launchDigital, 1000);
}
function addCalendar(){
    clearInterval(intervalAnalog);
    clearInterval(intervalDigital);
    analogClock.style.display = "none";
    digitalClock.style.display = "none";
    calendar.style.display = "block";
}

digitalBtn.addEventListener("click", () => {
    addDigital()
    dropdownbtn.textContent = "Digital clock";
})
analogBtn.addEventListener("click", () => {
    addAnalog()
    dropdownbtn.textContent = "Analog clock";
})
calendarBtn.addEventListener("click", () => {
    addCalendar()
    dropdownbtn.textContent = "Calendar";
})


// calendar

const calendarDays = document.querySelector(".calendar-days");
const MonthYear = document.getElementById("month-year");
const prevMonth = document.getElementById("prev-btn");
const nextMonth = document.getElementById("next-btn");

const date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
let currentDay = date.getDate();

function renderCalendar(month, year){
    MonthYear.textContent = `${months[month]} ${year}`;
    calendarDays.innerHTML = ``;

    const firstMonthday = new Date(year, month, 1).getDay();
    const offset = (firstMonthday === 0) ? 6 : firstMonthday - 1;
    const countDaysInMonth = new Date(year, month + 1, 0).getDate();
    const firstNextMonthday = new Date(year, month + 1, 1).getDay();
    const offsetnext = (firstNextMonthday === 0) ? 6 : firstNextMonthday - 1;
    const prevMonthdaysCount = new Date(year, month, 0).getDate();

    for(let i = prevMonthdaysCount - offset + 1; i <= prevMonthdaysCount; i++){
        let itemDayPrev = document.createElement("div");
        itemDayPrev.textContent = i;
        itemDayPrev.classList.add("prevnext");
        calendarDays.appendChild(itemDayPrev);
    }
    for(let i = 1; i <= countDaysInMonth; i++){
        let itemDay = document.createElement("div");
        itemDay.textContent = i;
        if(i === currentDay && currentMonth === date.getMonth()){
            itemDay.classList.add("currentday");
        }
        calendarDays.appendChild(itemDay);
    }
    for(let i = 1; i <= 7 - offsetnext; i++){
        let itemDayNext = document.createElement("div");
        itemDayNext.textContent = i;
        itemDayNext.classList.add("prevnext");
        calendarDays.appendChild(itemDayNext);
    }
}
renderCalendar(currentMonth, currentYear);

prevMonth.addEventListener("click", () => {
    currentMonth--;
    if(currentMonth < 0){
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
})
nextMonth.addEventListener("click", () => {
    currentMonth++;
    if(currentMonth > 11){
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
})


dropdownbtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownlist.classList.toggle("show");
})
document.addEventListener("click", () => {
    dropdownlist.classList.remove("show");
})