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

// getAllMeals function
const getAllMeals = async () => {
  try {
    loader.classList.remove('hidden');
    productDiv.innerHTML = '';

    const res = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s='
    );
    const data = await res.json();

    loader.classList.add('hidden');

    if (!data.meals) {
      productDiv.innerHTML =
        '<p class="text-center w-full">No meals found.</p>';
      return;
    }

    renderMeals(data.meals);
  } catch (error) {
    console.log(error);
    loader.classList.add('hidden');
  }
};

// searchMeal function
const searchMeals = async foodName => {
  try {
    loader.classList.remove('hidden');
    productDiv.innerHTML = '';

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
    );
    const data = await res.json();

    loader.classList.add('hidden');

    if (!data.meals) {
      productDiv.innerHTML =
        '<p class="text-center w-full">No meals found.</p>';
      return;
    }
    renderMeals(data.meals);
  } catch (error) {
    console.log(error);
    loader.classList.add('hidden');
  }
};

const getMealById = async id => {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();

    if (data.meals) {
      openModal(data.meals[0]);
    }
  } catch (error) {
    console.log(error);
  }
};

// renderMeals function
const renderMeals = meals => {
  meals.forEach(meal => {
    const template = document.getElementById('product-card-template');
    const cardClone = template.content.cloneNode(true);

    cardClone.querySelector('.meal-img').src = meal.strMealThumb;
    cardClone.querySelector('.meal-img').alt = meal.strMeal;
    cardClone.querySelector('.meal-name').textContent = meal.strMeal;
    cardClone.querySelector('.meal-info').textContent =
      meal.strInstructions.slice(0, 110) + '...';
    cardClone
      .querySelector('.view-details-btn')
      .addEventListener('click', () => getMealById(meal.idMeal));
    productDiv.appendChild(cardClone);
  });
};

// openModal function
const openModal = meal => {
  modalImg.src = meal.strMealThumb;
  modalImg.alt = meal.strMeal;
  modalTitle.textContent = meal.strMeal;
  modalDesc.textContent = meal.strInstructions.slice(0, 550) + '...';

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

// hideModal function
const hideModal = () => {
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
};

closeModal.addEventListener('click', hideModal);

window.addEventListener('click', e => {
  if (e.target === modal) {
    hideModal();
  }
});

// handleSearch function
const handleSearch = () => {
  const value = searchInput.value.trim();

  if (!value) {
    getAllMeals();
  } else {
    searchMeals(value);
  }
};

searchBtn.addEventListener('click', handleSearch);

searchInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});

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

// getAllMeals function call
getAllMeals();
