// Handle localStorage visit message
const visitMessage = document.getElementById("visitMessage");
const today = Date.now();
const lastVisit = Number(localStorage.getItem("lastVisit")) || 0;

if (lastVisit === 0) {
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysBetween = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));
  if (daysBetween < 1) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else if (daysBetween === 1) {
    visitMessage.textContent = "You last visited 1 day ago.";
  } else {
    visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
  }
}
localStorage.setItem("lastVisit", today);

// Load cards from JSON
const cardContainer = document.getElementById("cardContainer");

fetch("data/discover.json")
  .then(res => res.json())
  .then(data => {
    data.items.forEach(item => {
      const card = document.createElement("article");
      card.classList.add("card");

      card.innerHTML = `
        <h2>${item.title}</h2>
        <figure>
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;

      cardContainer.appendChild(card);
    });
  })
  .catch(err => console.error("Error loading JSON:", err));