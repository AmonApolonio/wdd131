const reviewsDisplay = document.querySelector(".reviews");

let numreviews = Number(window.localStorage.getItem("reviewCount"));

reviewsDisplay.textContent = numreviews;