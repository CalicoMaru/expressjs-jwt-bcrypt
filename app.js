const express = require("express");
const app = express();
const path = require("path");
const PORT = 5000;

const bcryptRouter = require("./routes/bcrypt/bcrypt");
const jwtRouter = require("./routes/jwt/jwt");
const mysqlRouter = require("./routes/mysql/mysql");
const fsRouter = require("./routes/fs/fs");

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/jwt", jwtRouter);
app.use("/bcrypt", bcryptRouter);
//app.use("/mysql", mysqlRouter);
app.use("/fs", fsRouter);

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

//Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
