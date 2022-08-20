const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/myproject", (req, res) => {
  res.render("myproject");
});
app.get("/detail", (req, res) => {
  res.render("detail");
});
app.post("/myproject", (req, res) => {
  console.log(req.body);
  let title = req.body.InputName;
  let start = req.body.startdate;
  let end = req.body.enddate;
  let description = req.body.description;
  let node = req.body.flexCheckDefault;
  let react = req.body.flexCheckDefault;
  let next = req.body.flexCheckDefault;
  let type = req.body.flexCheckDefault;
  let image = req.body.uploadimage;

  console.log(title);
  console.log(start);
  console.log(end);
  console.log(description);
  console.log(node);
  console.log(react);
  console.log(next);
  console.log(type);
  console.log(image);

  res.redirect("/myproject");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
