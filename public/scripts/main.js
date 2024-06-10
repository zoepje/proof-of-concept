const ingredientList = document.querySelector('.ingredient-list'),
      noItems = document.createElement('li'),
      form = document.querySelector('#ingredient-form');

// Function update de gekozen ingredienten
function listIngredients() {
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

// Functie check of er 2 of meer checkboxes gecheckd zijn
function checked() {
  const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  const checkedCount = checkboxes.length;

  if(checkedCount < 1){
    alert("You don't have any ingrediënts selected");
    return false;
  }

  if(checkedCount < 2){
    alert("What a boring potion, try adding one more ingrediënt");
    return false;
  }

  return true;
}

form.addEventListener('submit', function(event) {
  if (!checked()) {
    event.preventDefault(); 
  }
});

// Doe een eventListener op elke checkbox wanneer er iets veranderd aan de input
document.querySelectorAll('input[name="ingredients"]').forEach(checkbox => {
    checkbox.addEventListener('change', listIngredients);
});

// Voor het begin van het laden
listIngredients();