const express = require("express");
const router = express.Router();

//Jsonwebtoken
const jwt = require("jsonwebtoken");
const jwtSecrect = "xswl";

//Body Parser Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//Jsonwebtoken Implementation
router.get("/", (req, res) => {
  jwt.sign(
    {
      name: "cxk"
    },
    jwtSecrect,
    (err, token) => {
      if (!err) {
        res.status(200).json({
          token
        });
      } else {
        res.status(400).json({
          msg: "Error jwt"
        });
      }
    }
  );
});

router.get("/v", (req, res) => {
  const token = jwt.sign(
    {
      name: "cxk"
    },
    jwtSecrect
  );

  jwt.verify(token, jwtSecrect, (err, decoded) => {
    if (!err) {
      res.status(200).json({
        msg: decoded
      });
    } else {
      res.status(404).json({
        msg: "Error jwt"
      });
    }
  });
});

module.exports = router;
