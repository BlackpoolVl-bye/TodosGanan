const wheel = document.getElementById("wheel");
const spinbutton = document.getElementById("spinbutton");
let degree = 0;

function spinwheel() {
  degree = Math.floor(5000 + Math.random() * 5000);
  wheel.style.transition = "transform 10s ease-out";
  wheel.style.transform = `rotate(${degree}deg)`;

  // Restablece la rotación para el siguiente giro
  setTimeout(() => {
    wheel.style.transition = "none";
    wheel.style.transform = `rotate(${degree % 360}deg)`;
  }, 10000);
}

spinbutton.addEventListener("click", spinwheel);