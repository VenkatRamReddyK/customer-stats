var express = require('express');
var router = express.Router();

//
module.exports = router;
router.get('/details', function(req, res, next) {
  con.query('SELECT * from students', function (error, results, fields) {
    console.log(results);
    if (error) throw error;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
