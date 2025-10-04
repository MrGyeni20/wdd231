// ========== MEMBER DIRECTORY ==========
function getMembershipLevel(level) {
  switch (level) {
    case 3: return "Gold";
    case 2: return "Silver";
    default: return "Member";
  }
}

async function getMembers() {
  const membersContainer = document.getElementById("members-container");
  if (!membersContainer) return;

  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members, membersContainer);
  } catch (error) {
    console.error("Error loading members:", error);
    membersContainer.innerHTML = "<p>Unable to load members at this time.</p>";
  }
}

function displayMembers(members, container) {
  container.innerHTML = "";
  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    const membershipLevel = getMembershipLevel(member.membership);
    const membershipClass = membershipLevel.toLowerCase();

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="membership-level ${membershipClass}">Membership: ${membershipLevel}</p>
    `;

    container.appendChild(card);
  });
}

// ========== GRID / LIST TOGGLE ==========
function setupViewToggle() {
  const gridBtn = document.getElementById("grid-view");
  const listBtn = document.getElementById("list-view");
  const container = document.getElementById("members-container");

  if (!gridBtn || !listBtn || !container) return;

  gridBtn.addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
    gridBtn.setAttribute("aria-pressed", "true");
    listBtn.setAttribute("aria-pressed", "false");
  });

  listBtn.addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
    listBtn.setAttribute("aria-pressed", "true");
    gridBtn.setAttribute("aria-pressed", "false");
  });
}

// ========== WEATHER ==========
async function getWeather() {
  const apiKey = 'bd4809ef1d510416ed6de8998bbb9686';
  const city = 'Takoradi';
  const weatherContainer = document.getElementById('current-weather');
  const forecastContainer = document.getElementById('forecast');

  if (!weatherContainer || !forecastContainer) return;

  try {
    const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
    const current = await currentRes.json();

    weatherContainer.innerHTML = `
      <p><strong>Temp:</strong> ${current.main.temp}°F</p>
      <p><strong>Conditions:</strong> ${current.weather[0].description}</p>
    `;

    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`);
    const forecastData = await forecastRes.json();

    const forecastDays = [forecastData.list[7], forecastData.list[15], forecastData.list[23]];

    forecastContainer.innerHTML = "<h3>3-Day Forecast</h3>";
    forecastDays.forEach(day => {
      forecastContainer.innerHTML += `
        <p>${new Date(day.dt_txt).toLocaleDateString()}: ${day.main.temp}°F</p>
      `;
    });

  } catch (error) {
    console.error("Error loading weather:", error);
    weatherContainer.innerHTML = `<p>Error loading weather data</p>`;
  }
}

// ========== SPOTLIGHT MEMBERS ==========
async function loadSpotlights() {
  const spotlightContainer = document.getElementById("spotlight-container");
  if (!spotlightContainer) return;

  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    const eligible = members.filter(m => {
      const level = getMembershipLevel(m.membership);
      return level === "Gold" || level === "Silver";
    });

    const selected = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);

    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p class="membership">${getMembershipLevel(member.membership)} Member</p>
      `;

      spotlightContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading spotlight members:", error);
    spotlightContainer.innerHTML = "<p>Unable to load spotlight members.</p>";
  }
}

// ========== SLIDESHOW ==========
function startSlideshow() {
  const slides = document.querySelectorAll(".hero-slideshow .slide");
  if (!slides.length) return;

  let currentSlide = 0;
  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  };

  showSlide(currentSlide);
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
}

// ========== THANK YOU PAGE DATA ==========
function populateConfirmationData() {
  const params = new URLSearchParams(window.location.search);

  const fields = ["firstName", "lastName", "email", "phone", "orgName", "timestamp"];
  fields.forEach(field => {
    const el = document.getElementById(field);
    if (el) el.textContent = params.get(field) || "N/A";
  });
}

// ========== FORM PAGE TIMESTAMP ==========
function setTimestampInput() {
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput && timestampInput.tagName === "INPUT") {
    timestampInput.value = new Date().toISOString();
  }
}

// ========== MODALS ==========
function setupModals() {
  document.querySelectorAll('.card a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const modalId = link.getAttribute('href').substring(1);
      const modal = document.getElementById(modalId);
      if (modal && typeof modal.showModal === "function") {
        modal.showModal();
      }
    });
  });
}


// ========== FOOTER INFO ==========
function updateFooterInfo() {
  const yearEl = document.getElementById("year");
  const lastModifiedEl = document.getElementById("lastModified");

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified;
}

// ========== INITIALIZER ==========
window.addEventListener("load", () => {
  getMembers();
  setupViewToggle();
  getWeather();
  loadSpotlights();
  startSlideshow();
  setTimestampInput();
  populateConfirmationData();
  setupModals();
  updateFooterInfo();
});
