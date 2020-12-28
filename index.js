const express = require('express')
const path = require('path');
const apiController = require('./api/controller');

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile('views/index.html', { root: __dirname });
});

app.get('/about', function (req, res) {
  res.sendFile('views/about.html', { root: __dirname });
});

app.get('/api', apiController.welcome);
app.get('/api/pin/find/:Pincode', apiController.findPostOffice);

app.get('/api/pin/', apiController.listStates);
app.get('/api/pin/:state/', apiController.listDistricts);
app.get('/api/pin/:state/:DistrictsName/', apiController.listCity);
app.get('/api/pin/:state/:DistrictsName/:city', apiController.listPostOffice);

app.get('*', function (req, res) {
  res.json({
    'message': 'Invalid Route'
  }).status(404);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
