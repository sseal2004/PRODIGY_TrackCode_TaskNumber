 let startTime, interval;
    let elapsed = 0;
    const runnerVideo = document.getElementById("runnerVideo");

    function formatTime(ms) {
      const date = new Date(ms);
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');
      const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
      return `${minutes}:${seconds}:${milliseconds}`;
    }

    function updateDisplay() {
      document.getElementById("time").textContent = formatTime(elapsed);
    }

    function startTimer() {
      if (interval) return;
      startTime = Date.now() - elapsed;
      interval = setInterval(() => {
        elapsed = Date.now() - startTime;
        updateDisplay();
      }, 10);
      runnerVideo.play();
    }

    function stopTimer() {
      clearInterval(interval);
      interval = null;
      runnerVideo.pause();
    }

    function resetTimer() {
      stopTimer();
      elapsed = 0;
      updateDisplay();
      document.getElementById("laps").innerHTML = "";
      runnerVideo.pause();
      runnerVideo.currentTime = 0;
    }

    function lapTimer() {
      if (!interval) return;
      const lapTime = formatTime(elapsed);
      const lap = document.createElement("p");
      lap.textContent = `Lap: ${lapTime}`;
      document.getElementById("laps").appendChild(lap);
    }