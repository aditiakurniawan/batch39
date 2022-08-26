const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.urlencoded({ extended: false }));

const db = require("./connection/db");

let islogin = true;
app.get("/", (req, res) => {
  db.connect(function (err, client, done) {
    if (err) throw err; // tampilkan eror connection db
    client.query("SELECT * FROM public.tb_projects", function (err, result) {
      if (err) throw err; // eror query
      //console.log(result);
      let data = result.rows;
      let dataBlog = data.map(function (item) {
        return {
          ...item,
          islogin,
          duration: getDistanceTime(
            new Date(item.start_date),
            new Date(item.end_date)
          ),
        };
      });
      res.render("index", { islogin, dataBlog });
    });
  });
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/myproject", (req, res) => {
  res.render("myproject");
});

app.get("/detail/:index", (req, res) => {});

app.get("/delete-myproject/:index", (req, res) => {});

app.get("/editproject/:index", (req, res) => {});

app.post("/editproject/:index", (req, res) => {});

app.post("/myproject", (req, res) => {
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
  console.log(`app listening on port ${port}`);
});
