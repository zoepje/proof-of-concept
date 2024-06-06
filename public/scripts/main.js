const ingredientList = document.querySelector('.ingredient-list'),
      noItems = document.createElement('li');

// Function update de gekozen ingredienten
function updateCheckedIngredients() {
  const checkboxes = document.querySelectorAll('input[name="ingredients"]:checked');

  // Haal alle lijst items weg
  ingredientList.innerHTML = '';

  // For elke checked ingredient maak een li aan in de resutatenlijst
  checkboxes.forEach(checkbox => {
    const listItem = document.createElement('li');
    listItem.textContent = checkbox.id;
    ingredientList.appendChild(listItem);
  });

  // Als er geen ingredienten zijn laat dan deze text zien
  if (checkboxes.length === 0) {
    noItems.textContent = 'Start putting ingrediënts together';
    ingredientList.appendChild(noItems);
  }
}

// Doe een eventListener op elke checkbox wanneer er iets veranderd aan de input
document.querySelectorAll('input[name="ingredients"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateCheckedIngredients);
});

// Voor het begin van het laden
updateCheckedIngredients();