/*** Express setup & start ***/
import fetchJson from './helpers/fetch-json.js'

import express, { request, response } from 'express'

/*** Variablen ***/
const apiUrl = "https://potion-api-jet.vercel.app/",
      potionsUrl = `${apiUrl}potions`,
      ingredientsUrl = `${apiUrl}ingredients`,
      app = express();

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

/*** Routes ***/
// Index
app.get('/', (request, response) => {
  Promise.all([
    fetchJson(`${potionsUrl}`),
    fetchJson(`${ingredientsUrl}`)
  ]).then(([potions, ingredients]) => {
    response.render('index', {potions, ingredients });
  })
})

// Brew
app.get('/brew', (request, response) => {
  Promise.all([
    fetchJson(`${potionsUrl}`),
    fetchJson(`${ingredientsUrl}`)
  ]).then(([potions, ingredients]) => {
    response.render('brew', {potions, ingredients });
  })
})

app.post('/brew', (request, response) => {
  fetchJson(`${potionsUrl}`).then((potions) => {
    let ingredients = request.body.ingredients;
    let matchFound = false;
    let matchedPotionId = null;

    // Check if there are multiple inputs
    if (!Array.isArray(ingredients)) {
      return response.status(400).send('Thats just one ingredient silly. Try again.');
    }

    ingredients = ingredients.map(Number);

    function sortArray(arr) {
      return arr.map(Number).sort((a, b) => a - b); // Sort numerically
    }

    for (let i = 0; i < potions.length; i++){
      const sortPotionIngredients = sortArray(potions[i].ingredients);
      if (JSON.stringify(ingredients) === JSON.stringify(sortPotionIngredients)){
        matchFound = true;
        matchedPotionId = potions[i].id;
      } 
    }
    
    if (matchFound) {
      response.redirect(301, `/potion/${matchedPotionId}`)
    } else {
      response.redirect(301, '/nasty-potion')
    }
  })
})

// Potion
app.get('/potion/:id', (request, response) =>{
  Promise.all([
    fetchJson(`${potionsUrl}/${request.params.id}`),
    fetchJson(`${ingredientsUrl}`)
  ]).then(([potion, ingredients]) => {
    let filterIngredients = ingredients.filter(ingredient => {
      return potion.ingredients.includes(ingredient.id);
    })
    
    response.render('potion', {potion, ingredients: filterIngredients});
  })
})

app.get('/nasty-potion', (request, response) =>{
  response.render('nasty-potion')
})

app.get('/potions', (request, response) => {
  Promise.all([
    fetchJson(`${potionsUrl}`),
    fetchJson(`${ingredientsUrl}`)
  ]).then(([potions, ingredients]) => {
    response.render('book', {potions, ingredients });
  })
})
