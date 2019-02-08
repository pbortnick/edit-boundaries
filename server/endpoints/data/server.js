var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var fs = require('fs')
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let endpoint = 'https://pbortnick.github.io/server/data/nyc.json';

  fetch(endpoint).then(function(res) {
    return res.json();
  }).then(function(json) {
    res.json(json)
  });
});

router.get('/set', async (req, res, next) => {
  var data = JSON.parse(fs.readFileSync('./data/nyc.json'));
  console.log(req.query.hood, req.query.coords)
  var hood = req.query.hood
  var coords = req.query.coords
  data.features.map((target) => {
    if (target.properties.Name === hood) {
      target.geometry.coordinates = coords
    }
  })

  await fs.writeFileSync('./data/nyc.json', JSON.stringify(data));

  return res.json({
    success: true,
    message: 'You have successfully reset your password! Now you should be able to log in.'
  });
})

module.exports = router
