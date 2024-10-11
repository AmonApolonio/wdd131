const products = [
    {
      id: "fc-1888",
      name: "flux capacitor",
      averagerating: 4.5
    },
    {
      id: "fc-2050",
      name: "power laces",
      averagerating: 4.7
    },
    {
      id: "fs-1987",
      name: "time circuits",
      averagerating: 3.5
    },
    {
      id: "ac-2000",
      name: "low voltage reactor",
      averagerating: 3.9
    },
    {
      id: "jj-1969",
      name: "warp equalizer",
      averagerating: 5.0
    }
  ];
  
  const productSelect = document.getElementById('product-select');
  
  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.name;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
  
  const form = document.getElementById('review-form');
  
  form.addEventListener('submit', (e) => {
    const featuresChecked = document.querySelectorAll('.features input[type="checkbox"]:checked');
  
    if (featuresChecked.length === 0) {
      e.preventDefault();
      alert('Please select at least one feature from the list');
      return;
    }
  
    let reviewCount = localStorage.getItem('reviewCount') || 0;
    reviewCount = parseInt(reviewCount) + 1;
    localStorage.setItem('reviewCount', reviewCount);
  });