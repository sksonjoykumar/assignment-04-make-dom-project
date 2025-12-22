// Select DOM Elements
const productDiv = document.getElementById('parent-products');
const loader = document.getElementById('loader');

//  html modal elements
const modal = document.getElementById('product-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModal = document.getElementById('close-modal');
const modalImg = document.getElementById('modal-img');

// search html elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// get all product data
const allProducts = async (query = '') => {
  try {
    // show loader
    loader.classList.remove('hidden');
    productDiv.innerHTML = '';

    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    let data = await res.json();
    const meals = data.meals;
    console.log(data);

    // const filterProduct = data.filter(item =>
    //   item.strMeal.toLowerCase().includes(searchInput.toLowerCase())
    // );

    // error message
    if (!res.ok) {
      console.log(`Http error ${res.status}`);
    }

    // hidden loader
    loader.classList.add('hidden');

    if (meals) {
      meals.forEach(meal => {
        const template = document.getElementById('product-card-template');
        const cardClone = template.content.cloneNode(true);
        // html elements
        const img = cardClone.querySelector('.meal-img');
        const title = cardClone.querySelector('.meal-name');
        const desc = cardClone.querySelector('.meal-info');
        const btn = cardClone.querySelector('.view-details-btn');

        //  set api data
        img.src = meal.strMealThumb;
        img.alt = meal.strMeal;
        title.textContent = meal.strMeal;
        desc.textContent = meal.strInstructions.slice(0, 90) + '...';

        // add click event btn
        btn.addEventListener('click', () => {
          openModal(meal);
        });
        productDiv.appendChild(cardClone);
      });
    } else {
      productDiv.innerHTML =
        '<p class="text-center w-full">No meals found.</p>';
    }
    // forEach
  } catch (error) {
    console.log(error.message);
    // hidden
    loader.classList.add('hidden');
  }
};

/**
 * Modal Logic Functions
 */
const openModal = meal => {
  modalImg.src = meal.strMealThumb;
  modalImg.alt = meal.strMeal;
  modalTitle.textContent = meal.strMeal;
  modalDesc.textContent = meal.strInstructions.slice(0, 550) + '...';

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

const hideModal = () => {
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
};

// Event Listeners
closeModal.addEventListener('click', hideModal);

window.addEventListener('click', event => {
  // Check if the click was on the backdrop (the element with ID 'product-modal')
  if (event.target === modal) {
    hideModal();
  }
});

// search logic
// handleSearch function
// const handleSearch = () => {
//   const value = searchInput.value.trim();
//   allProducts(value);
//   console.log(value);
// };

// // search button click
// searchBtn.addEventListener('click', handleSearch);

// // trigger on enter press
// searchInput.addEventListener('keypress', e => {
//   if (e.key === 'Enter') {
//     handleSearch();
//   }
// });

// allProducts function call
allProducts();

// scrollToTop
const topBtn = document.getElementById('scroll-top');

window.onscroll = function () {
  scrollFunction();
};
window.scrollTo({ top: 0, behavior: 'smooth' });

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topBtn.style.display = 'block';
  } else {
    topBtn.style.display = 'none';
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
