const images = [
    'url("/photos/Angkor Wat .jpg")',
    'url("/photos/prey korng kang.jpg")',
    'url("/photos/beachsihanoukville.jpg")', 
    'url("/photos/Sunset-at-Angkor-Wat-Siem-Reap-Cambodia.jpg")',
    'url("/photos/beachsihanoukville.jpg")'
];

let currentIndex = 0;
const content = document.querySelector('.content');

function changeBackground() {
    content.style.backgroundImage = images[currentIndex];
    currentIndex = (currentIndex + 1) % images.length;
    setTimeout(changeBackground, 5000);
}

changeBackground();
