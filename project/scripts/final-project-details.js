export const Legends = [
  { 
    id: 1, 
    legendName: "Boitata", 
    imageUrl: "images/boitata.jpg",
    details: "Boitata is a legendary creature in Brazilian folklore, depicted as a giant snake or lizard that is said to protect the forests and rivers."
  },
  { 
    id: 2, 
    legendName: "Curupira", 
    imageUrl: "images/curupira.jpg",
    details: "Curupira is known for its bright red hair and backward feet, making it difficult to track. It is a protector of the forest."
  },
  { 
    id: 3, 
    legendName: "Vitoria Régia", 
    imageUrl: "images/vitoria_regia.jpg",
    details: "Vitoria Régia is a mythical flower that blooms in the Amazon. It is associated with love and beauty."
  },
  { 
    id: 4, 
    legendName: "Saci", 
    imageUrl: "images/saci.jpg",
    details: "Saci is a mischievous one-legged boy who wears a red cap. He is known for causing trouble and playing pranks."
  },
  { 
    id: 5, 
    legendName: "Pisadeira", 
    imageUrl: "images/pisadeira.jpg",
    details: "Pisadeira is a female spirit who sits on the chests of people while they sleep, causing them to have nightmares."
  },
  { 
    id: 6, 
    legendName: "Cuca", 
    imageUrl: "images/cuca.jpg",
    details: "Cuca is a witch with a crocodile-like head, known for capturing children and is often associated with fear."
  },
  { 
    id: 7, 
    legendName: "Homem do Saco", 
    imageUrl: "images/homem-do-saco.jpg",
    details: "Homem do Saco is a figure who is said to carry a sack to capture naughty children, teaching them to behave."
  }
];

let currentLegendIndex = 0;


// Get URL query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Find legend by its ID
function findLegendIndexById(legendId) {
  return Legends.findIndex(item => item.id == legendId);
}

// Load legend details based on the ID from the URL
function loadLegendDetails(index) {
  const legend = Legends[index];

  if (legend) {
    document.getElementById('legendImage').src = legend.imageUrl;
    document.getElementById('legendName').textContent = legend.legendName;
    document.getElementById('legendDetails').textContent = legend.details;
    document.getElementById('detailsContainer').style.display = 'flex';
    currentLegendIndex = index;

    // This will update the URL to reflect the current legend ID
    const newUrl = `${window.location.pathname}?id=${legend.id}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  } else {
    document.getElementById('detailsContainer').style.display = 'none';
  }
}

window.onload = function () {
  // Get the legend ID from the URL
  const legendId = getQueryParam('id');
  if (legendId) {
    const index = findLegendIndexById(legendId);
    if (index !== -1) {
      loadLegendDetails(index);
    } else {
      loadLegendDetails(0);
    }
  } else {
    loadLegendDetails(0);
  }

  updateActiveLink('details');

  // Here I am attaching event listeners for navigation arrows after DOM is loaded
  document.getElementById('prevLegend').addEventListener('click', () => {
    // Circular navigation to the last legend if at the first
    const newIndex = currentLegendIndex === 0 ? Legends.length - 1 : currentLegendIndex - 1;
    loadLegendDetails(newIndex);
  });

  document.getElementById('nextLegend').addEventListener('click', () => {
    const newIndex = currentLegendIndex === Legends.length - 1 ? 0 : currentLegendIndex + 1;
    loadLegendDetails(newIndex);
  });
};

// This sets the active navigation link just for a better look in the navigation
function updateActiveLink(activeId) {
  const links = document.querySelectorAll('.navigation a');
  links.forEach(link => link.classList.remove('active'));
  document.getElementById(activeId).classList.add('active');
}