var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var fs = require('fs')
var express = require('express');
var router = express.Router();
var querystring = require('querystring');

var data = JSON.parse(fs.readFileSync('./data/nyc.json'));

router.get('/', function(req, res, next) {
  return res.json(data)
});

router.get('/set', async (req, res, next) => {
  var hood = req.query.hood
  var coords = JSON.parse("[" + req.query.coords.split()[0] + "]")
  var coordsUse = [...coords[0], coords[0][0]]
  data.features.map((target) => {
    if (target.properties.Name === hood) {
      target.geometry.coordinates = [coordsUse]
    }
  })

  await fs.writeFileSync('./data/nyc.json', JSON.stringify(data));

  return res.json({
    success: true,
    message: 'You have successfully reset your password! Now you should be able to log in.'
  });
})

module.exports = router
