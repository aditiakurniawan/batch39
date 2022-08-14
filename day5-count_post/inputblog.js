let dataBlog = [];
function addBlog(event) {
  event.preventDefault();
  let title = document.getElementById("title").value;
  let start = document.getElementById("start").value;
  let end = document.getElementById("end").value;
  let description = document.getElementById("description").value;
  let upload = document.getElementById("upload").files[0];
  upload = URL.createObjectURL(upload);

  let tech = document.getElementsByName("checkboxProject");
  let cek = [];
  for (a = 0; a < tech.length; a++) {
    if (tech[a].checked == true) {
      cek.push(tech[a].value);
    }
  }
  let data = cek.length;

  let dt = new Date(start);
  let year = dt.getFullYear();

  let blog = {
    title,
    start,
    end,
    description,
    cek,
    upload,
    year,
  };

  dataBlog.push(blog);
  renderBlog();
}

function renderBlog() {
  document.getElementById("container-project").innerHTML = "";
  for (let i = 0; i < dataBlog.length; i++) {
    document.getElementById(
      "container-project"
    ).innerHTML += `<div class="project-card">
    <img src="${dataBlog[i].upload}" alt="" />
    <a href="detail.html"><h3>${dataBlog[i].title} - ${
      dataBlog[i].year
    } </h3></a>
    <h4>durasi : ${getDistenceTime(dataBlog[i].start, dataBlog[i].end)}</h4>
    <br />
    <h5>
    ${dataBlog[i].description}
    </h5>
    <br />
    <div class="logo">
    ${(function icon() {
      let display = "";
      for (let j = 0; j < dataBlog[i].cek.length; j++) {
        display += `<img src="assets/${dataBlog[i].cek[j]}.png"/>`;
      }
      return display;
    })()}
    
    </div>
    <div class="button">
      <button class="bt-edit">edit</button>
      <button class="bt-delete">delete</button>
    </div>
  </div>`;
  }
}

function getDistenceTime(start, end) {
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
  //
  // let distenceInHours = Math.floor(destance / (milisecon * 60 * 60));
  // let distenceInMenites = Math.floor(destance / (milisecon * 60));
  // let distenceseconds = Math.floor(destance / milisecon);
  // //
  console.log(distenYear);

  if (distenYear > 0) {
    return `${distenYear} Year`;
  } else if (distenMount > 0) {
    return `${distenMount} Hour`;
  }
  // else if (distenWeek > 0) {
  //   return `${distenWeek} Week`;
  // }
  else {
    return `${distenDay} Day`;
  }
}
