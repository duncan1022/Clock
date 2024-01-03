 function toggleClocks(clockType) {
      if (clockType === 'digital') {
        document.getElementById('digital').style.display = 'block';
        document.getElementById('analog').style.display = 'none';
      } else if (clockType === 'analog') {
        document.getElementById('digital').style.display = 'none';
        document.getElementById('analog').style.display = 'block';
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

    setInterval(updateClocks, 1000);
    updateClocks(); 