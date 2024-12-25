// Selectors
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Global variables
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const api = 'T3RLfY9OB1dS4YpkjGFAvRT7mS_Yq3AM620TZnNstCk';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${api}&count=${count}`;

// Check if all images are loaded
const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
    count = 30;
  }
};

// Helper function to set attributes on DOM elements
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Create Elements for links & photos, add to DOM
const displayPhotos = () => {
  // Reset the variable so it starts from 0 eatch time we display photos so the 'imageLoaded()'work properly
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // create <a> element
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // create <img> element
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listener, check when each img is finished loading
    img.addEventListener('load', imageLoaded);
    // put <img> inside <a> element, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Get photos from Unsplash API
async function unsplashPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (err) {
    console.log('something gone wrong!!!', err);
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    unsplashPhotos();
  }
});
// onload
unsplashPhotos();
