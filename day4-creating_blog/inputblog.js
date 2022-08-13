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
  console.log(data);

  let dt = new Date();
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
    <h4>durasi : ${dataBlog[i].start} bulan</h4>
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
console.log(display);
