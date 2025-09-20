// ========== MEMBER DIRECTORY ==========
const membersContainer = document.getElementById("members");

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
    membersContainer.innerHTML = "<p>Unable to load members at this time.</p>";
  }
}

// Display member cards
function displayMembers(members) {
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
document.getElementById("grid-view").addEventListener("click", () => {
  membersContainer.classList.add("grid-view");
  membersContainer.classList.remove("list-view");
});

document.getElementById("list-view").addEventListener("click", () => {
  membersContainer.classList.add("list-view");
  membersContainer.classList.remove("grid-view");
});

// ========== FOOTER YEAR & LAST MODIFIED ==========
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ========== WEATHER ==========
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const city = 'Rexburg';
const weatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast');

async function getWeather() {
  try {
    // Current weather
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
    const data = await response.json();

    weatherContainer.innerHTML = `
      <p><strong>Temp:</strong> ${data.main.temp}°F</p>
      <p><strong>Conditions:</strong> ${data.weather[0].description}</p>
    `;

    // 3-day forecast
    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`);
    const forecastData = await forecastRes.json();
    const forecastDays = [forecastData.list[7], forecastData.list[15], forecastData.list[23]];

    forecastContainer.innerHTML = '<h3>3-Day Forecast</h3>';
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

// ========== SPOTLIGHTS ==========
const spotlightContainer = document.getElementById("spotlight-container");

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    // Filter only Gold and Silver members
    const eligible = members.filter(member => {
      const level = getMembershipLevel(member.membership);
      return level === "Gold" || level === "Silver";
    });

    // Shuffle and select 3
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
    spotlightContainer.innerHTML = `<p>Unable to load spotlight members at this time.</p>`;
  }
}

// ========== INITIAL LOAD ==========
getMembers();
getWeather();
loadSpotlights();