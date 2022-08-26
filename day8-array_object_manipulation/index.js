const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.urlencoded({ extended: false }));

let dataBlog = [];
let islogin = true;

app.get("/", (req, res) => {
  let data = dataBlog.map(function (item) {
    return {
      ...item,
      islogin,
      duration: getDistanceTime(new Date(item.start), new Date(item.end)),
      sDate: getFullTime(new Date(item.start)),
      eDate: getFullTime(new Date(item.end)),
    };
  });
  res.render("index", { islogin, data });
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/myproject", (req, res) => {
  res.render("myproject");
});

app.get("/detail/:index", (req, res) => {
  let index = req.params.index;
  let data = dataBlog[index];

  data.duration = getDistanceTime(new Date(data.start), new Date(data.end));
  data.startDate = getFullTime(new Date(data.start));
  data.endDate = getFullTime(new Date(data.end));
  console.log(data);
  res.render("detail", { data });
});

app.get("/delete-myproject/:index", (req, res) => {
  let index = req.params.index;
  dataBlog.splice(index, 1);

  res.redirect("/");
});

app.get("/editproject/:index", (req, res) => {
  let index = req.params.index;

  let data = {
    title: dataBlog[index].title,
    description: dataBlog[index].description,
    start: dataBlog[index].start,
    end: dataBlog[index].end,
    node: dataBlog[index].node,
    next: dataBlog[index].next,
    type: dataBlog[index].type,
    react: dataBlog[index].react,
    image: dataBlog[index].image,
  };

  res.render("editproject", { index, data });
});

app.post("/editproject/:index", (req, res) => {
  let index = req.params.index;

  dataBlog[index].title = req.body.InputName;
  dataBlog[index].description = req.body.description;
  dataBlog[index].start = req.body.startdate;
  dataBlog[index].end = req.body.enddate;
  dataBlog[index].node = req.body.nodejs;
  dataBlog[index].next = req.body.nextjs;
  dataBlog[index].type = req.body.typeScript;
  dataBlog[index].react = req.body.reactjs;
  dataBlog[index].image = req.body.uploadimage;

  res.redirect("/");
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

function getFullTime(time) {
  let month = [
    "Januari",
    "Febuari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "Nopember",
    "Desember",
  ];

  let date = time.getDate();
  let monthIndex = time.getMonth();
  let year = time.getFullYear();

  let hours = time.getHours();
  let minutes = time.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  } else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  // 12 Agustus 2022 09.04
  let fullTime = `${date} ${month[monthIndex]} ${year}`;
  // console.log(fullTime);
  return fullTime;
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
