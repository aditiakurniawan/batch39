const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const upload = require("./middlewares/fileUpload");
const app = express();
const port = 3000;

app.use(flash());

app.use(
  session({
    secret: "bebasapaaja",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000, // 2 JAM
    },
  })
);

app.set("view engine", "hbs");
app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.urlencoded({ extended: false }));

const db = require("./connection/db");

let islogin = true;
app.get("/", (req, res) => {
  db.connect(function (err, client, done) {
    if (err) throw err; // tampilkan eror connect db
    client.query(
      `SELECT * FROM public.tb_projects ORDER BY id DESC`,
      function (err, result) {
        if (err) throw err; // eror query
        let data = result.rows;
        let dataBlog = data.map(function (item) {
          item.technologies = item.technologies.map((check) => {
            if (check != "undefined") {
              return check;
            } else {
              check = undefined;
            }
          });
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
      }
    );
  });
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/myproject", (req, res) => {
  res.render("myproject");
});

app.post("/myproject", (req, res) => {
  let add = req.body;
  // console.log(add);
  let queryAdd = `INSERT INTO tb_projects(
    name, start_date, end_date, description, technologies, image) VALUES ('${add.InputName}','${add.startdate}','${add.enddate}','${add.description}','{"${add.nodejs}","${add.reactjs}","${add.angular}","${add.vuejs}"}','${add.uploadimage}');`;
  db.connect(function (err, client, done) {
    if (err) throw err;
    client.query(queryAdd, function (err, result) {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

app.get("/detail/:id", (req, res) => {
  let id = req.params.id;
  let query = `SELECT * FROM tb_projects WHERE id=${id}`;
  db.connect(function (err, client, done) {
    if (err) throw err; // tampilkan eror connect db
    client.query(query, function (err, result) {
      if (err) throw err; // eror query

      let data = result.rows;
      let dataBlog = data.map(function (item) {
        item.technologies = item.technologies.map((check) => {
          if (check != "undefined") {
            return check;
          } else {
            check = undefined;
          }
        });
        return {
          ...item,
          islogin,
          duration: getDistanceTime(
            new Date(item.start_date),
            new Date(item.end_date)
          ),
          start_date: getFullTime(new Date(item.start_date)),
          end_date: getFullTime(new Date(item.end_date)),
        };
      });
      res.render("detail", { islogin, dataBlog: dataBlog[0] });
    });
  });
});

app.get("/delete-myproject/:id", (req, res) => {
  let id = req.params.id;
  let queryDelete = `DELETE FROM tb_projects WHERE id=${id}`;
  db.connect(function (err, client, done) {
    if (err) throw err; // tampilkan eror connect db
    client.query(queryDelete, function (err, result) {
      if (err) throw err; // eror query
      res.redirect("/");
    });
  });
});

app.get("/editproject/:id", (req, res) => {
  let id = req.params.id;
  let queryEdit = `SELECT * FROM tb_projects WHERE id=${id}`;
  db.connect(function (err, client, done) {
    if (err) throw err; // tampilkan eror connect db
    client.query(queryEdit, function (err, result) {
      if (err) throw err; // eror query
      let data = result.rows;
      let dataBlog = data.map(function (item) {
        item.technologies = item.technologies.map((check) => {
          if (check != "undefined") {
            return check;
          } else {
            check = undefined;
          }
        });
        return {
          ...item,
          start_date: timeDate(new Date(item.start_date)),
          end_date: timeDate(new Date(item.end_date)),
        };
      });
      res.render("editproject", { data: dataBlog[0] });
    });
  });
});

app.post("/editproject/:id", (req, res) => {
  let id = req.params.id;
  let edit = req.body;
  let queryEdit = `UPDATE tb_projects 
  SET name='${edit.InputName}',start_date='${edit.startdate}',end_date='${edit.enddate}',description='${edit.description}',technologies='{"${edit.nodejs}","${edit.reactjs}","${edit.angular}","${edit.vuejs}"}',image='${edit.image}' 
  WHERE "id"='${id}';`;
  db.connect(function (err, client, done) {
    if (err) throw err;
    client.query(queryEdit, function (err, result) {
      if (err) throw err;
      res.redirect("/");
    });
  });
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

function timeDate(time) {
  let date = time.getDate();
  let month = time.getMonth();
  let year = time.getFullYear();

  let hours = time.getHours();
  let minutes = time.getMinutes();

  if (month < 10) {
    month = "0" + month;
  } else {
    month = month;
  }

  if (date < 10) {
    date = "0" + date;
  } else {
    date = date;
  }
  // 12 Agustus 2022 09.04
  let fullTime = `${year}-${month}-${date}`;

  return fullTime;
}

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
