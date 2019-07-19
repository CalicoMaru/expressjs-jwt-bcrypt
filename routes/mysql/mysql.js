const express = require("express");
const router = express.Router();

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "192.168.99.100",
  user: "root",
  password: "root",
  database: "product"
});

//Body Parser Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  //connection.connect();

  connection.query("SELECT * FROM product", function(err, rows, fields) {
    if (err) throw err;
    res.json({
      msg: "ojbk",
      rows
    });
  });

  //connection.end();
});

module.exports = router;
