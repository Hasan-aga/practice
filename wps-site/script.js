const heroTitle = document.querySelector(".hero-title");
console.log(heroTitle.textContent.length);
document.documentElement.style.setProperty(
  "--steps",
  heroTitle.textContent.length
);
// elements
const pc = document.querySelector(".pc");
const pcWrapper = document.querySelector(".pc-wrapper");

// create top bar of pc
const topBar = document.createElement("div");
topBar.classList.add("pc-top-bar", "centered-container");

// display the top bar
pc.prepend(topBar);

// trigger animation on scroll
function pcObserverCallback(entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    console.log("intersection");
    pc.classList.add("pc-animation");
    topBar.remove();
  }
}

const pcObserverOptions = {
  root: null,
  threshold: 0.5,
};
const pcObserver = new IntersectionObserver(
  pcObserverCallback,
  pcObserverOptions
);
pcObserver.observe(pcWrapper);
