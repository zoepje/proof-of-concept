const ingredientList = document.querySelector('.ingredient-list'),
      noItems = document.createElement('li'),
      form = document.querySelector('#ingredient-form'),
      cauldron = document.querySelector(".container img");

// #region List
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

// Doe een eventListener op elke checkbox wanneer er iets veranderd aan de input
document.querySelectorAll('input[name="ingredients"]').forEach(checkbox => {
    checkbox.addEventListener('change', listIngredients);
});

// Voor het begin van het laden
listIngredients();
// #endregion List

// #region Alert
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
// #endregion Alert

// #region Animation
function animateIngredient(checkbox, cauldron) {
  const label = checkbox.nextElementSibling;
  const img = label.querySelector("img");
  const clonedImg = img.cloneNode(true);

  document.body.appendChild(clonedImg)
  clonedImg.classList.add("ingredient-duplicate");

  // #region Paths
  const ingredientRect = img.getBoundingClientRect();
  const cauldronRect = cauldron.getBoundingClientRect();

  const startX = ingredientRect.width / 2;
  const startY = ingredientRect.height / 2;

  const deltaX = cauldronRect.x - ingredientRect.x - (ingredientRect.width - cauldronRect.width) / 2;
  const deltaY = cauldronRect.y - ingredientRect.y - (ingredientRect.height - cauldronRect.height) / 2;

  const distance = Math.hypot(deltaX, deltaY);

  const firstControlPointX = max(deltaX * .5, Math.sqrt(distance) * 4);
  const firstControlPointY = deltaX * -.25;

  const secondControlPointX = max(deltaX * .9, Math.sqrt(distance) * 6);
  const secondControlPointY = deltaY * .5;

  const path = `'m${startX},${startY} c${firstControlPointX},${firstControlPointY} ${secondControlPointX},${secondControlPointY} ${deltaX},${deltaY}'`;
  clonedImg.style.setProperty("--path", path);
  clonedImg.style.setProperty("--distance", distance);
  // #endregion Paths
  
  // Zodat ze vanuit het label komen
  clonedImg.style.left = ingredientRect.left + window.scrollX + ingredientRect.width / 2 + "px";
  clonedImg.style.top = ingredientRect.top + window.scrollY + ingredientRect.height / 2 + "px";

  clonedImg.addEventListener("animationend", function() {
    clonedImg.remove();
  })
}

function max(a, b) {
	if (a > b) {
		return a;
	} else {
		return b;
	}
}

form.addEventListener("change", function(event) {
  const checkbox = event.target;
  if (checkbox.type === "checkbox" && checkbox.checked) {
    animateIngredient(checkbox, cauldron);
  }
});
// #endregion Animation