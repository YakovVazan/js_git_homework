document.addEventListener("DOMContentLoaded", () => {
  function updateClock() {
    const clockElement = document.getElementById("time");
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();

    clockElement.innerHTML = `${date} | ${time}`;
  }

  setInterval(updateClock, 1000);

  updateClock();
});
