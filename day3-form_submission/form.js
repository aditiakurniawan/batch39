function submitData() {
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let phone = document.getElementById("input-phone").value;
  let subject = document.getElementById("input-subject").value;
  let massage = document.getElementById("massage").value;

  if (name == "") {
    return alert("nama harus diisi");
  } else if (email == "") {
    return alert("email harus diisi");
  } else if (phone == "") {
    return alert("nomor harus diisi");
  } else if (subject == "") {
    return alert("pilih subject");
  } else if (massage == "") {
    return alert("massage harus diisi");
  }
  console.log(name);
  console.log(email);
  console.log(phone);
  console.log(subject);
  console.log(massage);

  const emailRecever = "aditiakurniawanx@gmail.com";
  let a = document.createElement("a");
  a.href = `mailto:${emailRecever}?subject=${subject}&body=halo saya ${name} \n ${massage} \n hubungi saya ${phone} `;
  a.click();
}
