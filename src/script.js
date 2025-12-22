// Select DOM Elements
const productDiv = document.getElementById('parent-products');
const loader = document.getElementById('loader');

//  html modal elements
const modal = document.getElementById('product-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModal = document.getElementById('close-modal');
const modalImg = document.getElementById('modal-img');

// get all product data
const allProducts = async () => {
  try {
    // show loader
    loader.classList.remove('hidden');

    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    // error message
    if (!res.ok) {
      console.log(`Http error ${res.status}`);
    }

    let data = await res.json();
    const meals = data.meals;
    console.log(data);

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

allProducts();
