console.log('Hier komt je server voor Sprint 12.')
import express from 'express'
import fetchJson from './helpers/fetch-json.js'

/**
 * TODO(developer): Uncomment this variable and replace with your
 *   Google Analytics 4 property ID before running the sample.
 */
let propertyId = '301922918';

// Imports the Google Analytics Data API client library.
import {BetaAnalyticsDataClient} from '@google-analytics/data';

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient();

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

app.get('/dashboard', async function(request, response) {

  const [apiResponse] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: '2024-03-31',
        endDate: 'today',
      },
    ],
    dimensions: [
      {
        name: 'country',
      },
    ],
    metrics: [
      {
        name: 'activeUsers',
      },
    ],
  });

  response.render('dashboard', {data: apiResponse});
});

app.get('/google', async function(request, response) {
	let propertyId = '301922918';

	// Using a default constructor instructs the client to use the credentials
	// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
	const analyticsDataClient = new BetaAnalyticsDataClient();

	// Runs a simple report.
	const [res] = await analyticsDataClient.runReport({
		property: `properties/${propertyId}`,
		dateRanges: [
		{
			startDate: '2024-06-01',
			endDate: 'today',
		},
		],
		dimensions: [
		{
			name: 'country',
		},
		],
		metrics: [
		{
			name: 'activeUsers',
		},
		],
	});
	response.render('google', {
		rows: res.rows,
	})
})

app.get('/linkedin', function(request, response) {

  response.render('linkedin');
});

app.get('/hotjar', function(request, response) {

  response.render('hotjar');
});