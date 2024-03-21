var express = require("express");
var path = require("path");

var indexRouter = require("./routes/index");
const app = express();
const port = process.env.PORT || "8888";
app.use(express.static("public"));
//set up server listening

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = app;
