/*** Express setup & start ***/
import fetchJson from './helpers/fetch-json.js'

import express, { request, response } from 'express'

const app = express()

app.set('view engine', 'ejs')

app.set('views', './views')

app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

const apiUrl = "https://potion-api-jet.vercel.app/",
      potionsUrl = `${apiUrl}potions`,
      ingredientsUrl = `${apiUrl}ingredients`;

app.get('/', (request, response) => {
  Promise.all([
    fetchJson(`${potionsUrl}`),
    fetchJson(`${ingredientsUrl}`)
  ]).then(([potions, ingredients]) => {

  response.render('index', {potions, ingredients });
  })
})

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
    const ingredients = request.body.ingredients.map(Number);

    function areEqual(arr1, arr2) {
        let N = arr1.length;
        let M = arr2.length;
 
        // If lengths of array are not equal means
        // array are not equal
        if (N != M)
            return false;
 
        // Sort both arrays
        arr1.sort();
        arr2.sort();
 
        // Linearly compare elements
        for (let i = 0; i < N; i++)
            if (arr1[i] != arr2[i])
                return false;
 
        // If all elements were same.
        return true;
    }

    for (let i = 0; i < potions.length; i++){
      if (areEqual(ingredients, potions[i].ingredients)){
        response.redirect(301, '/')
      } 
    }
    
    // } else if (areEqual(ingredients, potions[1].ingredients)){
    //   response.redirect(301, '/brew')
    // } else {
    //   response.status(500).send('Internal Server Error');
    // }  
  })
})

app.get('/potions', (request, response) => {
  Promise.all([
    fetchJson(`${potionsUrl}`),
    fetchJson(`${ingredientsUrl}`)
  ]).then(([potions, ingredients]) => {

  response.render('potions', {potions, ingredients });
  })
})