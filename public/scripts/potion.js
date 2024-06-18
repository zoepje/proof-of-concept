const ingredientColorsElement = document.querySelector('.ingredient-colors'),
      ingredientColors = JSON.parse(ingredientColorsElement.textContent.trim());
let colorIndex = 0;

// Funtie verander soep kleur per .1s
function changeColor() {
  if (ingredientColors.length > 0) {
    soup.setAttribute('fill', ingredientColors[colorIndex]);
    soup.setAttribute('stroke', ingredientColors[colorIndex]);
    colorIndex = (colorIndex + 1) % ingredientColors.length;
  }
}

setInterval(changeColor, 500);