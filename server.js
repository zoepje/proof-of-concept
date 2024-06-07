console.log('Hier komt je server voor Sprint 12.')
import express from 'express'
import fetchJson from './helpers/fetch-json.js'

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

// get routes
app.get('/', function(request, response) {
  response.render('index');
});

app.get('/dashboard', function(request, response) {
  response.render('dashboard');
});

