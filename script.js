/* ========================================
   THE TAINTED ARCHIVE
   JAVASCRIPT
======================================== */


/* ----------------------------------------
   DARK MODE
---------------------------------------- */

const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("taintedArchiveTheme");


if (savedTheme) {

  html.setAttribute(
    "data-theme",
    savedTheme
  );

}


function updateThemeButton() {

  if (!themeToggle) return;

  const currentTheme =
    html.getAttribute("data-theme");

  themeToggle.textContent =
    currentTheme === "dark"
      ? "LIGHT MODE"
      : "DARK MODE";

}


updateThemeButton();


if (themeToggle) {

  themeToggle.addEventListener(
    "click",
    () => {

      const currentTheme =
        html.getAttribute("data-theme");

      const newTheme =
        currentTheme === "dark"
          ? "light"
          : "dark";

      html.setAttribute(
        "data-theme",
        newTheme
      );

      localStorage.setItem(
        "taintedArchiveTheme",
        newTheme
      );

      updateThemeButton();

    }
  );

}


/* ----------------------------------------
   HOMEPAGE SLIDESHOW
---------------------------------------- */

const slides =
  document.querySelectorAll(".slide");

const slideDotsContainer =
  document.getElementById("slideDots");

let currentSlide = 0;


function displaySlide(index) {

  if (slides.length === 0) return;


  slides.forEach(
    (slide) => {

      slide.classList.remove("active");

    }
  );


  slides[index].classList.add("active");


  const dots =
    document.querySelectorAll(".slide-dot");


  dots.forEach(
    (dot) => {

      dot.classList.remove("active");

    }
  );


  if (dots[index]) {

    dots[index].classList.add("active");

  }

}


if (
  slides.length > 0 &&
  slideDotsContainer
) {

  slides.forEach(
    (slide, index) => {

      const dot =
        document.createElement("button");

      dot.classList.add("slide-dot");

      dot.setAttribute(
        "aria-label",
        `Go to slide ${index + 1}`
      );


      if (index === 0) {

        dot.classList.add("active");

      }


      dot.addEventListener(
        "click",
        () => {

          currentSlide = index;

          displaySlide(
            currentSlide
          );

        }
      );


      slideDotsContainer.appendChild(
        dot
      );

    }
  );


  setInterval(
    () => {

      currentSlide =
        (currentSlide + 1)
        % slides.length;

      displaySlide(
        currentSlide
      );

    },
    4500
  );

}


/* ----------------------------------------
   ART FILTERS
---------------------------------------- */

const filterButtons =
  document.querySelectorAll(
    ".filter-button"
  );

const artPieces =
  document.querySelectorAll(
    ".art-piece"
  );


filterButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const filter =
          button.dataset.filter;


        filterButtons.forEach(
          (item) => {

            item.classList.remove(
              "active-filter"
            );

          }
        );


        button.classList.add(
          "active-filter"
        );


        artPieces.forEach(
          (piece) => {

            const category =
              piece.dataset.category;


            if (
              filter === "all" ||
              category === filter
            ) {

              piece.style.display =
                "block";

            }

            else {

              piece.style.display =
                "none";

            }

          }
        );

      }
    );

  }
);


/* ----------------------------------------
   ARCHIVE ASSISTANT
---------------------------------------- */

const chatbotButton =
  document.getElementById(
    "chatbotButton"
  );

const chatbotWindow =
  document.getElementById(
    "chatbotWindow"
  );

const closeChat =
  document.getElementById(
    "closeChat"
  );

const chatMessages =
  document.getElementById(
    "chatMessages"
  );

const chatOptions =
  document.getElementById(
    "chatOptions"
  );


if (
  chatbotButton &&
  chatbotWindow
) {

  chatbotButton.addEventListener(
    "click",
    () => {

      chatbotWindow.classList.toggle(
        "open"
      );

    }
  );

}


if (
  closeChat &&
  chatbotWindow
) {

  closeChat.addEventListener(
    "click",
    () => {

      chatbotWindow.classList.remove(
        "open"
      );

    }
  );

}


/* CREATE CHAT MESSAGE */

function addChatMessage(
  text,
  type = "bot"
) {

  if (!chatMessages) return;


  const message =
    document.createElement("div");


  message.className =
    type === "user"
      ? "user-message"
      : "bot-message";


  message.textContent =
    text;


  chatMessages.appendChild(
    message
  );


  chatMessages.scrollTop =
    chatMessages.scrollHeight;

}


/* CHAT OPTION BUTTONS */

if (chatOptions) {

  chatOptions.addEventListener(
    "click",
    (event) => {

      const selected =
        event.target.dataset.chat;


      if (selected === "wellness") {

        startWellnessCheck();

      }


      if (selected === "suggestion") {

        startSuggestionFlow();

      }

    }
  );

}


/* WELLNESS CHECK */

function startWellnessCheck() {

  addChatMessage(
    "Wellness Check",
    "user"
  );


  addChatMessage(
    "Quick archive check-in: how is today treating you?"
  );


  chatOptions.innerHTML = `
    <button class="wellness-choice" data-feeling="great">
      GREAT
    </button>

    <button class="wellness-choice" data-feeling="okay">
      I'M OKAY
    </button>

    <button class="wellness-choice" data-feeling="rough">
      ROUGH DAY
    </button>
  `;


  const choices =
    document.querySelectorAll(
      ".wellness-choice"
    );


  choices.forEach(
    (choice) => {

      choice.addEventListener(
        "click",
        () => {

          const feeling =
            choice.dataset.feeling;


          if (feeling === "great") {

            addChatMessage(
              "Great",
              "user"
            );

            addChatMessage(
              "Love that. Keep exploring the archive and carry that energy with you."
            );

          }


          if (feeling === "okay") {

            addChatMessage(
              "I'm okay",
              "user"
            );

            addChatMessage(
              "Okay is completely valid. Hopefully something in the archive adds a little curiosity to the day."
            );

          }


          if (feeling === "rough") {

            addChatMessage(
              "Rough day",
              "user"
            );

            addChatMessage(
              "Sorry today's been heavy. Take whatever pace feels comfortable while exploring the archive."
            );

          }


          resetChatOptions();

        }
      );

    }
  );

}


/* WEBSITE SUGGESTION */

function startSuggestionFlow() {

  addChatMessage(
    "Website Suggestion",
    "user"
  );


  addChatMessage(
    "What would make The Tainted Archive clearer, stronger, stranger, prettier, easier to explore, or more interesting?"
  );


  chatOptions.innerHTML = `
    <textarea
      class="suggestion-box"
      id="suggestionText"
      placeholder="Write a suggestion..."
    ></textarea>

    <button id="sendSuggestion">
      SEND SUGGESTION VIA EMAIL
    </button>

    <button id="cancelSuggestion">
      CANCEL
    </button>
  `;


  const sendSuggestion =
    document.getElementById(
      "sendSuggestion"
    );

  const cancelSuggestion =
    document.getElementById(
      "cancelSuggestion"
    );


  sendSuggestion.addEventListener(
    "click",
    () => {

      const suggestion =
        document.getElementById(
          "suggestionText"
        ).value.trim();


      if (!suggestion) {

        addChatMessage(
          "Write a suggestion first and the archive assistant can prepare the email."
        );

        return;

      }


      addChatMessage(
        suggestion,
        "user"
      );


      addChatMessage(
        "Thanks for helping improve the archive. An email window will open so the suggestion can be sent."
      );


      const subject =
        encodeURIComponent(
          "The Tainted Archive Website Suggestion"
        );


      const body =
        encodeURIComponent(
          suggestion
        );


      window.location.href =
        `mailto:niyatghiorghis@gmail.com?subject=${subject}&body=${body}`;


      resetChatOptions();

    }
  );


  cancelSuggestion.addEventListener(
    "click",
    () => {

      resetChatOptions();

    }
  );

}


/* RESET CHAT OPTIONS */

function resetChatOptions() {

  if (!chatOptions) return;


  chatOptions.innerHTML = `
    <button data-chat="wellness">
      WELLNESS CHECK
    </button>

    <button data-chat="suggestion">
      WEBSITE SUGGESTION
    </button>
  `;

}