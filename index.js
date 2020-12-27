const express = require('express')
const path = require('path');
const apiController = require('./api/controller');

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.send('pages/index');
});

app.get('/api', apiController.welcome);
app.get('/api/q/', apiController.listStates);
app.get('/api/q/:state/', apiController.listDistricts);
app.get('/api/q/:state/:DistrictsName/', apiController.listCity);
app.get('/api/q/:state/:DistrictsName/:city', apiController.listPostOffice);
app.get('/api/pin/:Pincode', apiController.findPostOffice);

app.get('*', function (req, res) {
  res.json({
    'message': 'Invalid Route'
  }).status(404);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
