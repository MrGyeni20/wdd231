// ========== INITIAL LOAD ==========
getMembers();
getWeather();
loadSpotlights();


// ========== MEMBER DIRECTORY ==========
const membersContainer = document.getElementById("members-container");


// Map membership level number to string
function getMembershipLevel(level) {
  switch (level) {
    case 3:
      return "Gold";
    case 2:
      return "Silver";
    case 1:
    default:
      return "Member";
  }
}

// Load members from JSON
async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);
    if (membersContainer) {
      membersContainer.innerHTML = "<p>Unable to load members at this time.</p>";
    }
  }
}

// Display member cards
function displayMembers(members) {
  if (!membersContainer) return;
  membersContainer.innerHTML = ""; // Clear previous content

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    const membershipLevel = getMembershipLevel(member.membership);
    const membershipClass = membershipLevel.toLowerCase(); // e.g., gold, silver, member

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="membership-level ${membershipClass}">Membership: ${membershipLevel}</p>
    `;

    membersContainer.appendChild(card);
  });
}


// ========== GRID / LIST TOGGLE ==========
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");

if (gridBtn && listBtn && membersContainer) {
  gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");

    gridBtn.setAttribute("aria-pressed", "true");
    listBtn.setAttribute("aria-pressed", "false");
  });

  listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");

    listBtn.setAttribute("aria-pressed", "true");
    gridBtn.setAttribute("aria-pressed", "false");
  });
}


// ========== FOOTER YEAR & LAST MODIFIED ==========
const yearEl = document.getElementById("year");
const lastModifiedEl = document.getElementById("lastModified");

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified;

// ========== WEATHER ==========
const apiKey = 'bd4809ef1d510416ed6de8998bbb9686'; // Replace with your actual API key
const city = 'Takoradi';
const weatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast');

async function getWeather() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
    const data = await response.json();

    if (weatherContainer) {
      weatherContainer.innerHTML = `
        <p><strong>Temp:</strong> ${data.main.temp}°F</p>
        <p><strong>Conditions:</strong> ${data.weather[0].description}</p>
      `;
    }

    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`);
    const forecastData = await forecastRes.json();
    const forecastDays = [forecastData.list[7], forecastData.list[15], forecastData.list[23]];

    if (forecastContainer) {
      forecastContainer.innerHTML = '<h3>3-Day Forecast</h3>';
      forecastDays.forEach(day => {
        forecastContainer.innerHTML += `
          <p>${new Date(day.dt_txt).toLocaleDateString()}: ${day.main.temp}°F</p>
        `;
      });
    }
  } catch (error) {
    console.error("Error loading weather:", error);
    if (weatherContainer) {
      weatherContainer.innerHTML = `<p>Error loading weather data</p>`;
    }
  }
}

// ========== SPOTLIGHTS ==========
const spotlightContainer = document.getElementById("spotlight-container");

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    const eligible = members.filter(member => {
      const level = getMembershipLevel(member.membership);
      return level === "Gold" || level === "Silver";
    });

    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");

      const membershipLevel = getMembershipLevel(member.membership);

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p class="membership">${membershipLevel} Member</p>
      `;

      spotlightContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading spotlight members:", error);
    if (spotlightContainer) {
      spotlightContainer.innerHTML = `<p>Unable to load spotlight members at this time.</p>`;
    }
  }
}

// ========== HERO SLIDESHOW ==========
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slideshow .slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function startSlideshow() {
  if (slides.length === 0) return;
  showSlide(currentSlide);
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000); // Change slide every 5 seconds
}

// ========== INITIAL LOAD ==========
window.addEventListener("load", () => {
  getMembers();
  getWeather();
  loadSpotlights();
  startSlideshow();
});
