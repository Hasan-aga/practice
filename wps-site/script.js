const heroTitle = document.querySelector(".hero-title");
console.log(heroTitle.textContent.length);
document.documentElement.style.setProperty(
  "--steps",
  heroTitle.textContent.length
);
// elements
const pc = document.querySelector(".pc");
const pcWrapper = document.querySelector(".pc-wrapper");
// detect animation end on pc element
pc.addEventListener("animationend", (event) => {
  console.log("animation ended");
});

// create top bar of pc
const topBar = document.createElement("div");
topBar.classList.add("pc-top-bar", "centered-container");

// display the top bar
pc.prepend(topBar);
