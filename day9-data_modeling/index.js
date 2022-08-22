const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.urlencoded({ extended: false }));

const db = require("./connection/db");
////////////////////////////////

let islogin = true;
// let dataBlog = [];
app.get("/", (req, res) => {
  db.connect(function (err, client, done) {
    if (err) throw err; // tampilkan eror connection db
    client.query("SELECT * FROM public.tb_blog", function (err, result) {
      if (err) throw err; // eror query
      //console.log(result);
      let data = result.rows;
      // let dataBlog = [];
      // console.log(dataBlog);
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

app.get("/detail/:index", (req, res) => {
  // let index = req.params.index;
  // let data = dataBlog[index];
  // data.duration = getDistanceTime(new Date(data.start), new Date(data.end));
  // console.log(data);
  // res.render("detail", {
  //   data,
  // });
});

app.get("/delete-myproject/:index", (req, res) => {
  // let index = req.params.index;
  // dataBlog.splice(index, 1);
  //  res.redirect("/");
});

app.get("/editproject/:index", (req, res) => {
  // let index = req.params.index;
  // let data = {
  //   title: dataBlog[index].title,
  //   description: dataBlog[index].description,
  //   start: dataBlog[index].start,
  //   end: dataBlog[index].end,
  //   node: dataBlog[index].node,
  //   next: dataBlog[index].next,
  //   type: dataBlog[index].type,
  //   react: dataBlog[index].react,
  //   image: dataBlog[index].image,
  // };
  // res.render("editproject", { index, data });
});

app.post("/editproject/:index", (req, res) => {
  // let index = req.params.index;
  // dataBlog[index].title = req.body.InputName;
  // dataBlog[index].description = req.body.description;
  // dataBlog[index].start = req.body.startdate;
  // dataBlog[index].end = req.body.enddate;
  // dataBlog[index].node = req.body.nodejs;
  // dataBlog[index].next = req.body.nextjs;
  // dataBlog[index].type = req.body.typeScript;
  // dataBlog[index].react = req.body.reactjs;
  // dataBlog[index].image = req.body.uploadimage;
  // res.redirect("/");
});

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
