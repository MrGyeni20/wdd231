const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true },
  { code: "CSE 121b", name: "JavaScript Language", credits: 3, completed: false },
  { code: "WDD 231", name: "Frontend Development I", credits: 3, completed: false },
  // Add more courses
];

const courseContainer = document.getElementById("coursesContainer");
const totalCredits = document.getElementById("totalCredits");

function displayCourses(list) {
  courseContainer.innerHTML = "";
  let credits = 0;
  list.forEach(course => {
    const card = document.createElement("div");
    card.className = `course-card ${course.completed ? "completed" : ""}`;
    card.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p><p>${course.credits} Credits</p>`;
    courseContainer.appendChild(card);
    credits += course.credits;
  });
  totalCredits.textContent = credits;
}

// Filters
document.getElementById("showAll").addEventListener("click", () => {
  displayCourses(courses);
});

document.getElementById("showWDD").addEventListener("click", () => {
  displayCourses(courses.filter(course => course.code.startsWith("WDD")));
});

document.getElementById("showCSE").addEventListener("click", () => {
  displayCourses(courses.filter(course => course.code.startsWith("CSE")));
});

window.addEventListener("load", () => {
  displayCourses(courses); // Show all on load
});
