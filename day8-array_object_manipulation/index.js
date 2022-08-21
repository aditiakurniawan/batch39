const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.urlencoded({ extended: false }));

let dataBlog = [];
console.log(dataBlog);
app.get("/", (req, res) => {
  let data = dataBlog.map(function (item) {
    return {
      ...item,
      duration: getDistanceTime(new Date(item.start), new Date(item.end)),
    };
  });
  res.render("index", { dataBlog: data });
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/myproject", (req, res) => {
  res.render("myproject");
});
app.get("/detail/:id", (req, res) => {
  let id = request.params.id;
  res.render("detail", {
    id,
    title: judul,
    description: deskripsi,
  });
});
app.post("/myproject", (req, res) => {
  let title = req.body.InputName;
  let start = req.body.startdate;
  let end = req.body.enddate;
  let description = req.body.description;
  let node = req.body.nodejs;
  let react = req.body.reactjs;
  let next = req.body.nextjs;
  let type = req.body.typeScript;
  let image = req.body.uploadimage;

  let blog = {
    title,
    description,
    start,
    end,
    node,
    react,
    next,
    type,
    image,
  };

  dataBlog.push(blog);

  res.redirect("/");
});
// durasi

function getDistanceTime(start, end) {
  let startDate = new Date(start);
  let endDate = new Date(end);

  let destance = endDate - startDate; //milisecon

  let milisecon = 1000;
  let seconInHours = 3600;
  let hoursInDay = 24;
  let dayInWeek = 7;
  let weekInMount = 4;
  let mountInYear = 12;

  let distenYear = Math.floor(
    destance /
      (milisecon *
        seconInHours *
        hoursInDay *
        dayInWeek *
        weekInMount *
        mountInYear)
  );
  let distenMount = Math.floor(
    destance / (milisecon * seconInHours * hoursInDay * dayInWeek * weekInMount)
  );
  let distenWeek = Math.floor(
    destance / (milisecon * seconInHours * hoursInDay * dayInWeek)
  );
  let distenDay = Math.floor(
    destance / (milisecon * seconInHours * hoursInDay)
  );

  if (distenYear > 0) {
    return `${distenYear} Year`;
  } else if (distenMount > 0) {
    return `${distenMount} Mount`;
  } else {
    return `${distenDay} Day`;
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
