const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode";
}

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  themeToggle.textContent = newTheme === "dark" ? "Light Mode" : "Dark Mode";
});

const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showNextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

setInterval(showNextSlide, 3500);

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
  });
});