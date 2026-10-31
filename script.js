const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

function showPage(id) {
  const knownPages = ["home", "global", "malaysia", "impacts", "actions", "feedback"];
  const pageId = knownPages.includes(id) ? id : "home";

  pages.forEach((page) => {
    page.hidden = page.id !== pageId;
  });

  navLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${pageId}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  menuToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", () => {
  showPage(window.location.hash.slice(1));
});
showPage(window.location.hash.slice(1));

menuToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

const malaysiaRates = {
  2014: 13.20, 2015: 15.70, 2016: 17.50,
  2017: 20.90, 2018: 24.06, 2019: 28.10,
  2020: 30.70, 2021: 31.52, 2022: 33.17,
  2023: 35.38, 2024: 37.90
};

const yearSelect = document.querySelector("#year-select");
const rateOutput = document.querySelector("#rate-output");
const yearOutput = document.querySelector("#year-output");
const rateBar = document.querySelector("#rate-bar");

function updateRecyclingChart() {
  const year = yearSelect.value;
  const rate = malaysiaRates[year];
  rateOutput.textContent = `${rate.toFixed(2).replace(/0$/, "").replace(/\.$/, "")}%`;
  yearOutput.textContent = year;
  rateBar.style.width = `${rate}%`; // Chart scale: 0 to 100%
}
yearSelect.addEventListener("change", updateRecyclingChart);
updateRecyclingChart();

const tips = {
  paper: "Keep recyclable paper clean and dry; food-soiled paper may not be accepted.",
  plastic: "Check the plastic type and your local collector's rules. Not every plastic item is accepted.",
  metal: "Empty and rinse cans when appropriate, then follow your local collection instructions.",
  glass: "Separate glass only if your local collection programme accepts it. Never put broken glass into a bin that prohibits it."
};

const materialButtons = document.querySelectorAll(".material-button");
const materialTip = document.querySelector("#material-tip");

materialButtons.forEach((button) => {
  button.addEventListener("click", () => {
    materialButtons.forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    materialTip.textContent = tips[button.dataset.material];
  });
});

const feedbackForm = document.querySelector("#feedback-form");
const feedbackMessage = document.querySelector("#feedback-message");

feedbackForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const feedback = {
    name: document.querySelector("#visitor-name").value.trim(),
    rating: document.querySelector("#visitor-rating").value,
    comment: document.querySelector("#visitor-comment").value.trim()
  };

  if (feedback.comment.length < 10) {
    feedbackMessage.textContent = "Please write at least 10 characters.";
    return;
  }
  try {
    localStorage.setItem("wasteSiteFeedback", JSON.stringify(feedback));
    feedbackMessage.textContent = "Feedback saved in this browser. Thank you!";
    feedbackForm.reset();
  } catch (error) {
    feedbackMessage.textContent = "Local saving is unavailable in this browser.";
  }
});
