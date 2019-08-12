var express = require("express");
var router = express.Router();

var burgers = require("../models/burger.js");
var routeapi = "/api/burgers/"
// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  burgers.all(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});


router.get(routeapi + ":id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition)
  burgers.one(
    condition, function(result) {
      res.json(result)

    })
});

router.post(routeapi, function (req, res) {
  burgers.create([
    "burger_name", "devoured"
  ], [
      req.body.burger_name, req.body.devoured
    ], function (result) {

      res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burgers.update({
    burger_name: req.body.burger_name
  }, condition, function (result) {
    if (result.changedRows == 0) {

      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition)
  burgers.delete(
    condition, function(result) {
      if(result.affectedRows == 0){
        return res.status(400).end();
      }else{
        res.status(200).end();
      }
    }
  )
})

module.exports = router;