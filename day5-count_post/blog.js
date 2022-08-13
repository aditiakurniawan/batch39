function addBlog(event) {
  event.preventDefault();
  let title = document.getElementById("input-name").Value;
  let content = document.getElementById("input-email").Value;
  let image = document.getElementById("input-phone").file;
  //tampilkan gambar
  image = URL.createObjectURL(image[0]);

  let blog = {
    title,
    content,
    image,
    author: "adit",
    postAt: getFullTime(),
    postTime: getDistenceTime(),
  };

  let dataBlog = [];
  dataBlog.push(blog);
  //log.console(blog);
  renderBlog();
}
function renderBlog() {
  document.getElementById("contents").innerHTML = "";
  for (let i = 0; 1 < dataBlog.length; i++) {
    //console.log(dataBlog[i]);
    // getDistenceTime(),
    // getFullTime()
    document.getElementById("contents").innerHTML += `<div class="card">
        <img
      src="${dataBlog[i].image}"
      alt="profi"
    />
    <h2>${dataBlog[i].title}</h2>
    <p>${dataBlog[i].content}</p>
    <p>${dataBlog[i].postAt}</p>
    <p>${dataBlog[i].author}</p>
    <p>${dataBlog[i].postTime}</p>
  </div>`;
  }
  // getFullTime(dataBlog[i].postA)
  let blog = dataBlog[0].title;
}

// waktu
function getFullTime(waktu) {
  let month = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // let waktu = new Date();

  let date = waktu.getDate();
  let monthindex = waktu.getMonth();
  let year = waktu.getFullYear();
  console.log(month[monthindex]);

  hours = waktu.getHours();
  minutes = waktu.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let fullTime = `${date} ${month[monthindex]}${year}${hours}:${minutes} WIB`;
  return fullTime;
}
function getDistenceTime(time) {
  // function getDistenceTime(star,end)
  // let start = new date (startdate)

  let timeNow = new date();
  let timePost = time;

  let destance = timeNow - timePost; //milisecon

  let milisecon = 1000;
  let seconInHours = 3600;
  let hoursInDay = 24;
  // let dayInWeek = 7;
  // let dayInMount = 30;

  let distenDay = Math.floor(disten / (milisecon * seconInHours * hoursInDay));
  // console.log(destanceDay);
  let distenceInHours = Math.floor(disten / (milisecon * 60 * 60));
  // console.log(distenceInHours);
  let distenceInMenites = Math.floor(disten / (milisecon * 60));
  // console.log(distenceInMenites);
  let distenceseconds = Math.floor(disten / milisecon);
  // console.log(distenceseconds, detik);

  if (distenDay > 0) {
    // console.log(destanceDay);
    return `${distenDay} day ago`;
  } else if (distenceInHours > 0) {
    // console.log(distenceInHours);
    return `${distenceInHours} hours ago`;
  } else if (distenceInMenites > 0) {
    // console.log(distenceInMenites);
    return `${distenceInMenites} Minutes ago`;
  } else {
    // console.log(distenceseconds, detik);
    return `${distenceseconds} seconds ago`;
  }
}
// setInterval(() => {
//   renderBlog(), 3000;
// }); //waktu menjalan fungsi
