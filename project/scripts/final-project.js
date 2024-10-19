const Legends = [
  { id: 1, legendName: "Boitata", imageUrl: "images/boitata.jpg" },
  { id: 2, legendName: "Curupira", imageUrl: "images/curupira.jpg" },
  { id: 3, legendName: "Vitoria Régia", imageUrl: "images/vitoria_regia.jpg" },
  { id: 4, legendName: "Saci", imageUrl: "images/saci.jpg" },
  { id: 5, legendName: "Pisadeira", imageUrl: "images/pisadeira.jpg" },
  { id: 6, legendName: "Cuca", imageUrl: "images/cuca.jpg" },
  { id: 7, legendName: "Homem do Saco", imageUrl: "images/homem-do-saco.jpg" }
];

// Function to filter legends based on search query
function filterLegends(query) {
  const filteredLegends = Legends.filter(legend =>
    legend.legendName.toLowerCase().includes(query.toLowerCase())
  );
  createLegendCards(filteredLegends);

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('view') === 'favorites') {
    urlParams.delete('view');
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, '', newUrl);
    showAllLegends();
    updateActiveLink('home');
  }
}

// Function to load favorites from local storage
function loadFavorites() {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

// Function to save favorites to local storage
function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Function to toggle favorite
function toggleFavorite(legendId, isFavoritesView = false) {
  let favorites = loadFavorites();
  if (favorites.includes(legendId)) {
    favorites = favorites.filter(id => id !== legendId);
  } else {
    favorites.push(legendId);
  }
  saveFavorites(favorites);

  if (isFavoritesView) {
    showFavorites();
  }
}

// Function to check if a legend is a favorite
function isFavorite(legendId) {
  const favorites = loadFavorites();
  return favorites.includes(legendId);
}

// Function to create the legend cards and add the heart click behavior
function createLegendCards(legends) {
  const grid = document.querySelector('.res-grid');
  grid.innerHTML = '';

  legends.forEach(legend => {
    const card = document.createElement('section');
    const name = document.createElement('h3');
    const img = document.createElement('img');

    name.textContent = legend.legendName;
    img.src = legend.imageUrl;
    img.alt = `${legend.legendName}`;
    img.loading = 'lazy';

    card.addEventListener('click', () => {
      window.location.href = `final-project-details.html?id=${legend.id}`;
    });

    const heartContainer = document.createElement('div');
    heartContainer.classList.add('heart-container');

    const heartIcon = document.createElement('span');
    heartIcon.classList.add('heart-icon');
    
    heartIcon.style.color = isFavorite(legend.id) ? 'red' : 'gray';
    heartIcon.innerHTML = '❤';

    heartContainer.appendChild(heartIcon);

    heartContainer.addEventListener('click', (event) => {
      event.stopPropagation(); 
      const isFavoritesView = new URLSearchParams(window.location.search).get('view') === 'favorites';
      toggleFavorite(legend.id, isFavoritesView);
      heartIcon.style.color = isFavorite(legend.id) ? 'red' : 'gray';
    });

    const nameHeartContainer = document.createElement('div');
    nameHeartContainer.classList.add('name-heart-container');

    nameHeartContainer.appendChild(name);
    nameHeartContainer.appendChild(heartContainer);

    card.appendChild(img);
    card.appendChild(nameHeartContainer);
    grid.appendChild(card);
  });
}

// Function to show a message when there are no favorite legends
function showNoFavoritesMessage() {
  const messageContainer = document.querySelector('.no-favorites-message');
  messageContainer.innerHTML = `
    <p>No favorites selected yet. Click the heart icon on a legend to mark it as favorite.</p>
    <p><a id="backToHome" href="#">Go back to Home</a></p>
  `;
  messageContainer.style.display = 'block';

  // Event listener to the "Go back to Home" link
  document.getElementById('backToHome').addEventListener('click', (event) => {
    event.preventDefault();
    showAllLegends();
    updateActiveLink('home');
    window.history.pushState({}, '', 'final-project.html');
  });
}

// Function to show only favorite legends
function showFavorites() {
  const favorites = loadFavorites();
  const favoriteLegends = Legends.filter(legend => favorites.includes(legend.id));

  if (favoriteLegends.length > 0) {
    createLegendCards(favoriteLegends);
    document.querySelector('.no-favorites-message').style.display = 'none';
  } else {
    createLegendCards(favoriteLegends);
    showNoFavoritesMessage();
  }
}

// Function to show all legends
function showAllLegends() {
  createLegendCards(Legends);
  document.querySelector('.no-favorites-message').style.display = 'none';
}

// Function to update active link
function updateActiveLink(activeId) {
  const links = document.querySelectorAll('.navigation a');
  links.forEach(link => link.classList.remove('active'));
  document.getElementById(activeId).classList.add('active');
}

// Function to handle URL changes and update content accordingly based on the view parameter
function handleUrlChange() {
  const urlParams = new URLSearchParams(window.location.search);
  const view = urlParams.get('view');

  if (view === 'favorites') {
    showFavorites();
    updateActiveLink('favorites');
  } else {
    showAllLegends();
    updateActiveLink('home');
  }
}

// This I added to listen for URL changes
window.addEventListener('popstate', handleUrlChange);

// Event listener for "Favorites" link
document.getElementById('favorites').addEventListener('click', (event) => {
  event.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('view', 'favorites');
  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  window.history.pushState({}, '', newUrl);
  showFavorites();
  updateActiveLink('favorites');
});

// Event listener for "Home" link
document.getElementById('home').addEventListener('click', (event) => {
  event.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete('view');
  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  window.history.pushState({}, '', newUrl);
  showAllLegends()
  updateActiveLink('home');
});

// Event listener for search input
document.getElementById('searchBar').addEventListener('input', (event) => {
  const query = event.target.value;
  filterLegends(query);
});

// Load legends and set state based on current URL on page load
window.onload = () => {
  handleUrlChange();
};