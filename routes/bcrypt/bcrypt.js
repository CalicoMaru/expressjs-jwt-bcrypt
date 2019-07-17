const express = require("express");
const router = express.Router();

//Bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

//Body Parser Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//Bcrypt Hash
router.get("/", (req, res) => {
  bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    if (!err) {
      res.status(200).json({
        msg: hash
      });
    } else {
      res.status(400).json({
        msg: "Error"
      });
    }
  });
});

router.get("/c", (req, res) => {
  bcrypt.compare(
    myPlaintextPassword,
    "$2b$10$Pzu/7b6SCLSd/TnXRSOQd.7DsfSjvhbc53ul1WJdKC8r7e7LhZ0I6",
    function(err, result) {
      if (!err) {
        res.status(200).json({
          msg: result
        });
      } else {
        res.status(400).json({
          msg: "Error"
        });
      }
    }
  );
});

module.exports = router;
