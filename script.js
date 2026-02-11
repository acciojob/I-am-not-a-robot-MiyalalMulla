//your code here
const imageContainer = document.getElementById("images");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("h");
const result = document.getElementById("para");

let selected = [];

// Base images
const baseImages = [
  "https://via.placeholder.com/100?text=1",
  "https://via.placeholder.com/100?text=2",
  "https://via.placeholder.com/100?text=3",
  "https://via.placeholder.com/100?text=4",
  "https://via.placeholder.com/100?text=5"
];

// Shuffle helper
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Initialize page
function init() {
  imageContainer.innerHTML = "";
  selected = [];
  result.innerText = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
  message.innerText =
    "Please click on the identical tiles to verify that you are not a robot.";

  // Pick random image to duplicate
  const duplicateIndex = Math.floor(Math.random() * baseImages.length);
  const images = [...baseImages, baseImages[duplicateIndex]];

  shuffle(images);

  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.id = src;

    img.addEventListener("click", () => handleImageClick(img));
    imageContainer.appendChild(img);
  });
}

// Image click handler
function handleImageClick(img) {
  if (selected.includes(img) || selected.length === 2) return;

  img.classList.add("selected");
  selected.push(img);

  resetBtn.style.display = "inline-block";

  if (selected.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// Reset button
resetBtn.addEventListener("click", () => {
  init();
});

// Verify button
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  const [img1, img2] = selected;

  if (img1.dataset.id === img2.dataset.id) {
    result.innerText = "You are a human. Congratulations!";
  } else {
    result.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// Load on page start
init();
