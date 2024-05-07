﻿function changeLabelColor(val) {
  let labels = document.querySelectorAll(".labela");

  labels.forEach(function (label) {
    if (label.getAttribute("for") === val) {
      let radio = document.getElementById(val);

      if (radio.checked) {
        label.style.backgroundColor = "#ead7bb";
        label.style.color = "#113946";
      } else {
        label.style.backgroundColor = "#113946";
        label.style.color = "#ead7bb";
      }
    } else {
      label.style.backgroundColor = "#113946";
      label.style.color = "#ead7bb";
    }
  });
}

function redirectToPage(url) {
  window.location.href = url;
}

function logUser(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = {
    email: email,
    password: password,
  };

  fetch("/api/auth/Login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then((data) => {
      // Čuvanje JWT tokena u lokalnom skladištu (LocalStorage)
      //localStorage.setItem("jwtToken", data.data);
      //alert("Uspjesno");
      localStorage.setItem("jwtToken", data.data); //ISPRAVNO JE OVO
      console.log(data);
      console.log(data.data);

      //localStorage.setItem("jwtttToken", "ivana");
      // console.log(data);
      window.location = "index.html";
    })
    .catch((error) => console.error("Unable to log user.", error));
}

function regUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const title = document.getElementById("title").value;
  // const type = document.querySelector('input[type="radio"]:checked').value;
  const date = document.getElementById("dateofbirth").value;

  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="type"]'
  );

  let selectedType = null;

  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      selectedType = radioButton.value;
    }
  });
  let type = "";

  if (selectedType == 1) {
    type = "Admin";
  } else if (selectedType == 0) type = "User";

  console.log(type);
  //console.log(email, password, firstname, lastname, title, selectedType, date);

  const user = {
    email: email,
    password: password,
    type: type,
    firstname: firstname,
    lastname: lastname,
    dateofbirth: date,
    title: title,
  };

  if (
    email !== "" &&
    password !== "" &&
    type !== "" &&
    firstname !== "" &&
    lastname !== "" &&
    dateofbirth !== "" &&
    title !== ""
  ) {
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Pređi na log.html samo ako je registracija uspješna
        window.location = "log.html";
      })
      .catch((error) => console.error("Unable to register user.", error));
  } else {
    alert("Popuni sva polja");
    event.preventDefault();
  }
}

function checkUserRole() {
  let userRole;
  fetch("/api/course/user", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Uzmite ime korisnika iz podataka koje ste dobili
      //console.log(data);
      userRole = data.data.userType;
      // Prikazivanje imena korisnika u HTML elementu
      console.log(userRole);
      if (userRole != "Admin") {
        const el1 = document.getElementById("adminEl1");
        const el2 = document.getElementById("adminEl2");

        el1.style.display = "none";
        el2.style.display = "none";
      }
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function displayName() {
  checkUserRole();
  fetch("/api/course/user", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Uzmite ime korisnika iz podataka koje ste dobili
      //console.log(data);
      const userName = data.data.firstName;
      // Prikazivanje imena korisnika u HTML elementu
      let usernameElement = document.getElementById("logUserName");
      usernameElement.innerHTML = "Welcome, " + userName + "!";
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function inputInfo() {
  fetch("/api/course/user", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const fname = data.data.firstName;
      const lname = data.data.lastName;
      const type = data.data.userType;
      const email = data.data.email;
      const title = data.data.title;
      const datepre = data.data.dateOfBirth;

      let fnameElement = document.getElementById("firstname");
      let emailElement = document.getElementById("email");
      let lnameElement = document.getElementById("lastname");
      let usertypeElement = document.getElementById("usertype");
      let titleElement = document.getElementById("title");
      let dateElement = document.getElementById("birth");

      let date = new Date(datepre);

      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let formattedDate = `${day}-${month}-${year}`;

      fnameElement.innerHTML = fname;
      lnameElement.innerHTML = lname;
      emailElement.innerHTML = email;
      usertypeElement.innerHTML = type;
      titleElement.innerHTML = title;
      dateElement.innerHTML = formattedDate;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}
