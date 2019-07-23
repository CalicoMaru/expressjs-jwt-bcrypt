const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const { promisify } = require("util");
const readdir = promisify(fs.readdir);
const rmdir = promisify(fs.rmdir);
const unlink = promisify(fs.unlink);

//Body Parser Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const url =
  "https://g37simulator.webapp.163.com/get_hero_attr?heroid=315&awake=0&level=1&star=2";

const dir = path.join(__dirname, "/test");

const rmdirs = async dir => {
  let entries = await readdir(dir, { withFileTypes: true });
  await Promise.all(
    entries.map(entry => {
      let fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? rmdirs(fullPath) : unlink(fullPath);
    })
  );
  await rmdir(dir);
};

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

const getShikiAsync = async () => {
  try {
    const response = await axios.get(url);
    console.log(response.data, "Async/Await");
    return response;
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

const readFile = (folderName, fileName) => {
  fs.stat(path.join(__dirname, folderName, fileName), err => {
    if (err && err.code === "ENOENT") {
      console.log("File no existed");
    } else {
      fs.readFile(
        path.join(__dirname, folderName, fileName),
        "utf8",
        (err, data) => {
          if (err) throw err;
          console.log(JSON.stringify(data));
        }
      );
    }
  });
};

const readFileRes = (folderName, fileName, res) => {
  fs.stat(path.join(__dirname, folderName, fileName), err => {
    if (err && err.code === "ENOENT") {
      console.log("File no existed");
      res.status(404).json({
        msg: "Error"
      });
    } else {
      fs.readFile(
        path.join(__dirname, folderName, fileName),
        "utf8",
        (err, data) => {
          if (err) throw err;
          //console.log(JSON.stringify(data));
          res.status(200).send(data);
        }
      );
    }
  });
};

//checkTestFolderExisted();
//checkTestFileExisted();
//rmdirs(dir);
//getShiki();
//readFile("/shikis", "shiki.txt");
//getShikiAsync();

router.get("/", (req, res) => {
  readFileRes("/shikis", "shiki.txt", res);
});

module.exports = router;
