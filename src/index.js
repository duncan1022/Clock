 
    setInterval(updateClocks, 1000);
    updateClocks();
    toggleClocks('analog');
 
 
    function toggleClocks(clockType) {
      const digitalClock = document.getElementById('digital');
      const analogClock = document.getElementById('analog');
      const counter = document.getElementById('counter');
      const calendar = document.getElementById('calendar'); // New line
    
      if (clockType === 'digital') {
        digitalClock.style.display = 'block';
        analogClock.style.display = 'none';
        counter.style.display = 'none';
        calendar.style.display = 'none'; // New line
      } else if (clockType === 'analog') {
        digitalClock.style.display = 'none';
        analogClock.style.display = 'block';
        counter.style.display = 'none';
        calendar.style.display = 'none'; // New line
      } else if (clockType === 'countdown') {
        digitalClock.style.display = 'none';
        analogClock.style.display = 'none';
        counter.style.display = 'block';
        calendar.style.display = 'none'; // New line
        startCountdown(new Date("Jan 5, 3561 15:37:25"), 'countdown');
      } else if (clockType === 'calendar') { // New block
        digitalClock.style.display = 'none';
        analogClock.style.display = 'none';
        counter.style.display = 'none';
        calendar.style.display = 'block';
        displayCalendar(); // Call the displayCalendar function when showing the calendar
      }
    }

    function displayDigitalTime() {
      let d = new Date();
      let hour = d.getHours();
      let min = d.getMinutes();
      let sec = d.getSeconds();
      let amOrPm = "AM";

      if (hour >= 12) {
        amOrPm = "PM";
      }
      if (hour > 12) {
        hour = hour - 12;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }

      document.getElementById("digital").innerHTML = hour + ":" + min + ":" + sec + " " + amOrPm;
    }
    function displayAnalogTime() {
      const now = new Date();
      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
    
      const hourHand = document.getElementById('hour-hand');
      const minuteHand = document.getElementById('minute-hand');
      const secondHand = document.getElementById('second-hand');
    
      const hourRotation = (360 / 12) * hours + (360 / 12) * (minutes / 60);
      const minuteRotation = (360 / 60) * minutes + (360 / 60) * (seconds / 60);
      const secondRotation = (360 / 60) * seconds;
    
      hourHand.style.transform = `rotate(${hourRotation}deg)`;
      minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
      secondHand.style.transform = `rotate(${secondRotation}deg)`;
    }
    
    function updateClocks() {
      displayDigitalTime();
      displayAnalogTime();
    }
    function startCountdown(targetDate, countdown) {
      let x = setInterval(function () {
        let now = new Date().getTime();
        let distance = targetDate - now;
    
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
        document.getElementById(countdown).innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        document.getElementById(countdown).setAttribute('data-target', targetDate); 
    
        if (distance < 0) {
          clearInterval(x);
          document.getElementById(countdown).innerHTML = "EXPIRED";
        }
      }, 1000);
    }
    function updateCountdown(newTargetDate) {
  startCountdown(newTargetDate, 'countdown');
}
function getCountdown() {
  const currentCountdown = parseInt(document.getElementById('countdown').getAttribute('data-target'));
  return isNaN(currentCountdown) ? 0 : currentCountdown;
}
let countdownInterval;
function addTime() {
  clearInterval(countdownInterval);
  const currentCountdown = getCountdown();
  startCountdown(currentCountdown + 60);
  countdownInterval = setInterval(updateCountdown, 1000);
 }

 function subtractTime() {
  clearInterval(countdownInterval);
  const currentCountdown = getCountdown();
  startCountdown(currentCountdown - 60); // Fix: Corrected function name here
  countdownInterval = setInterval(updateCountdown, 1000);
}

     function displayCalendar() {
      const calendarContainer = document.getElementById('calendar-body');
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
    
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
      
      // Clear previous calendar content
      calendarContainer.innerHTML = '';
    
      // Create header row
      const headerRow = document.createElement('tr');
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
      for (let day of daysOfWeek) {
        const dayCell = document.createElement('th');
        dayCell.textContent = day;
        headerRow.appendChild(dayCell);
      }
    
      calendarContainer.appendChild(headerRow);
    
      // Create calendar cells
      let dayCount = 1;
    
      for (let i = 0; i < 6; i++) {
        const calendarRow = document.createElement('tr');
    
        for (let j = 0; j < 7; j++) {
          const calendarCell = document.createElement('td');
    
          if ((i === 0 && j < firstDayOfMonth) || dayCount > daysInMonth) {
            // Empty cells before the first day and after the last day
            calendarCell.textContent = '';
          } else {
            calendarCell.textContent = dayCount;
            dayCount++;
          }
    
          calendarRow.appendChild(calendarCell);
        }
    
        calendarContainer.appendChild(calendarRow);
      }
    }
    window.addEventListener('load', function () {
      displayCalendar();
    });
