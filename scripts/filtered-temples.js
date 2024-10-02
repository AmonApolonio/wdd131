const filters = document.querySelectorAll('.navigation a');
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

document.addEventListener("DOMContentLoaded", function() {
    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            resetFilters();
            filter.classList.toggle('active');
            applyFilter(filter.id.toLowerCase());
        });
    });

    createTempleCards(temples);
});

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
      },
      {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
      },
      {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
      },
      {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
      },
      {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
      },
      {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
      },
      {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
      },
    {
        templeName: "Campinas Brazil",
        location: "Campinas, Brazil",
        dedicated: "2002, May, 17",
        area: 269194,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/c9a81a6f86750d7d9ade3499d3df52e2f7f726a7/full/320%2C/0/default"
    },
    {
        templeName: "Sapporo Japan",
        location: "Sapporo, Japan",
        dedicated: "2016, August, 21",
        area: 4268880,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/c917995588e9c8d3ce881ebd32405150f9109fa7/full/320%2C/0/default"
    },
    {
        templeName: "Newport Beach California",
        location: "Newport Beach, California, United States",
        dedicated: "2005, August, 28",
        area: 383327,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/5288eedbc6e58a3ad9d586eb850d926a7d30ab5a/full/320%2C/0/default"
    },
    {
        templeName: "Salt Lake",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 435600,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/92c33bcbf9cf85483e008d6871f8ced5f6d7b661/full/320%2C/0/default"
    }
];

function resetFilters() {
    filters.forEach(filter => {
        filter.classList.remove('active');
    });
}

function applyFilter(filterId) {
    let filteredTemples = [];

    switch (filterId) {
        case 'home':
            filteredTemples = temples;
            break;
        case 'old':
            filteredTemples = temples.filter(temple => new Date(temple.dedicated).getFullYear() < 1900);
            break;
        case 'new':
            filteredTemples = temples.filter(temple => new Date(temple.dedicated).getFullYear() > 2000);
            break;
        case 'small':
            filteredTemples = temples.filter(temple => temple.area < 10000);
            break;
        case 'large':
            filteredTemples = temples.filter(temple => temple.area > 90000);
            break;
        default:
            filteredTemples = temples;
            break;
    }

    createTempleCards(filteredTemples);
}

function createTempleCards(temples) {
    const grid = document.querySelector('.res-grid');
    grid.innerHTML = '';

    temples.forEach(temple => {
        const card = document.createElement('section');
        const name = document.createElement('h3');
        const location = document.createElement('p');
        const dedication = document.createElement('p');
        const area = document.createElement('p');
        const img = document.createElement('img');

        name.textContent = temple.templeName;
        location.innerHTML = `<span class='label'>Location: </span> ${temple.location}`;
        dedication.innerHTML = `<span class='label'>Dedicated: </span> ${temple.dedicated}`;
        area.innerHTML = `<span class='label'>Size: </span> ${temple.area} sq ft.`;
        img.src = temple.imageUrl;
        img.alt = `${temple.templeName} Temple`;
        img.loading = 'lazy';

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedication);
        card.appendChild(area);
        card.appendChild(img);

        grid.appendChild(card);
    });
}