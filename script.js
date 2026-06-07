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