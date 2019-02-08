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
  console.log(req)
  var hood = req.hood
  var coords = req.coords
  var updatedData = await data.features.map((target) => {
    if (target.properties.name === hood) {
      target.geometry.coordinates = coords
    }
  })

  await fs.writeFileSync('./data/nyc.json', JSON.stringify(updatedData));

  return res.json({
    success: true,
    message: 'You have successfully reset your password! Now you should be able to log in.'
  });
})

module.exports = router
