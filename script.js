function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

window.onload = function () {
  if (!localStorage.getItem("videoSeen")) {
    document.getElementById("videoPopup").style.display = "flex";
    localStorage.setItem("videoSeen", "true");
  }
};

function closePopup() {
  document.getElementById("videoPopup").style.display = "none";
}

const text = "CSE Student | Cybersecurity | AI | Problem Solver";
let i = 0;

function typeEffect() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, 80);
  }
}

typeEffect();


