const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const axios = require("axios");

//Body Parser Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const url =
  "https://g37simulator.webapp.163.com/get_hero_attr?heroid=315&awake=0&level=1&star=2";

const getShiki = () => {
  axios
    .get(url)
    .then(response => {
      //console.log(response.data, "Get/Then");
      createFolderAndFile(
        "/shikis",
        "shiki.txt",
        JSON.stringify(response.data)
      );
    })
    .catch(error => {
      console.log(error);
    });
};

const getShiki1 = async () => {
  try {
    const response = await axios.get(url);
    console.log(response.data, "Async/Await");
  } catch (error) {
    console.error(error);
  }
};

const createFolderAndFile = (folderName, fileName, fileData) => {
  fs.stat(path.join(__dirname, folderName), err => {
    if (err && err.code === "ENOENT") {
      fs.mkdir(path.join(__dirname, folderName), {}, err => {
        if (err) throw err;
        console.log("Folder created...");
      });
    } else {
      console.log("Folder existed");
    }
  });
  fs.stat(path.join(__dirname, folderName, fileName), err => {
    if (err && err.code === "ENOENT") {
      fs.writeFile(
        path.join(__dirname, folderName, fileName),
        fileData,
        err => {
          if (err) throw err;
          console.log("File created...");
        }
      );
    } else {
      console.log("File existed");
    }
  });
};

const checkTestFolderExisted = () => {
  fs.stat(path.join(__dirname, "/test"), err => {
    if (err && err.code === "ENOENT") {
      fs.mkdir(path.join(__dirname, "/test"), {}, err => {
        if (err) throw err;
        console.log("Folder created...");
      });
    }
  });
};

const checkTestFileExisted = () => {
  fs.stat(path.join(__dirname, "/test", "test.txt"), err => {
    if (err && err.code === "ENOENT") {
      fs.writeFile(path.join(__dirname, "/test", "test.txt"), "Test", err => {
        if (err) throw err;
        console.log("File created...");
      });
    } else {
      console.log("File existed");
    }
  });
};

getShiki();
//getShiki1();

//router.get("/", (req, res) => {});

//module.exports = router;
