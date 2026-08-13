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

const chatbotButton = document.getElementById("chatbotButton");
const chatbotWindow = document.getElementById("chatbotWindow");
const closeChat = document.getElementById("closeChat");
const chatMessages = document.getElementById("chatMessages");
const chatOptions = document.querySelectorAll(".chat-option");

chatbotButton.addEventListener("click", () => {
  chatbotWindow.classList.toggle("open");
});

closeChat.addEventListener("click", () => {
  chatbotWindow.classList.remove("open");
});

chatOptions.forEach((button) => {
  button.addEventListener("click", () => {
    const response = button.dataset.response;

    if (response === "wellness") {
      addMessage("Wellness Check", "user-message");
      addMessage(
        "Quick check: What part of this portfolio made you feel most connected, curious, or inspired? You can send your thoughts through the contact section.",
        "bot-message"
      );
    }

    if (response === "suggestion") {
      addMessage("Website Suggestion", "user-message");
      addMessage(
        "What would make this website stronger, clearer, or more interesting? More art, more projects, more writing, better layout, or something else? Send suggestions through the contact section.",
        "bot-message"
      );
    }
  });
});

function addMessage(text, className) {
  const message = document.createElement("p");
  message.className = className;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}