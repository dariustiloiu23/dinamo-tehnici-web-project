
var root = document.getElementById("js-contact");
init();

function init() {
  root.innerHTML =
    '<details>' +
      '<summary>Autentificare (opțional)</summary>' +
      '<input id="user" placeholder="Username">' +
      '<input id="pass" type="password" placeholder="Parolă">' +
      '<button id="login" type="button">Login</button>' +
      '<button id="logout" type="button" disabled>Logout</button>' +
      '<p id="who">Neautentificat</p>' +
    '</details>' +

    '<h3>Trimite un mesaj</h3>' +
    '<input id="nume" placeholder="Nume">' +
    '<input id="email" placeholder="Email">' +
    '<select id="topic">' +
      '<option>Bilete</option>' +
      '<option>Meciuri</option>' +
      '<option>Magazin</option>' +
      '<option>Altele</option>' +
    '</select>' +
    '<input id="prio" type="range" min="1" max="5" value="3">' +
    '<textarea id="text" placeholder="Mesaj"></textarea>' +
    '<p>Caractere: <span id="count">0</span></p>' +
    '<button id="add" type="button">Trimite</button>' +
    '<input id="filter" placeholder="Caută mesaj">' +
    '<ul id="list"></ul>';

  var user = document.getElementById("user");
  var pass = document.getElementById("pass");
  var loginBtn = document.getElementById("login");
  var logoutBtn = document.getElementById("logout");
  var who = document.getElementById("who");

  var nume = document.getElementById("nume");
  var email = document.getElementById("email");
  var topic = document.getElementById("topic");
  var prio = document.getElementById("prio");
  var text = document.getElementById("text");
  var count = document.getElementById("count");
  var addBtn = document.getElementById("add");
  var filter = document.getElementById("filter");
  var list = document.getElementById("list");

  console.log(getComputedStyle(root).backgroundColor);

  afiseazaSesiune();

  loginBtn.addEventListener("click", function () {
    var u = user.value;
    var p = pass.value;
    fetch("users.json", { cache: "no-store" })
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        var ok = false;
        for (var i = 0; i < data.users.length; i++) {
          if (data.users[i].username === u && data.users[i].password === p) {
            ok = true;
          }
        }

        if (ok) {
          sessionStorage.setItem("user", u);
          afiseazaSesiune();
          pass.value = "";
        } else {
          alert("Date greșite");
        }
      });
  });

  logoutBtn.addEventListener("click", function () {
    sessionStorage.removeItem("user");
    afiseazaSesiune();
  });

  function afiseazaSesiune() {
    var u = sessionStorage.getItem("user");
    if (u) {
      who.textContent = "Logat ca: " + u;
      logoutBtn.disabled = false;
    } else {
      who.textContent = "Neautentificat";
      logoutBtn.disabled = true;
    }
  }

  var LS = "mesaje";
  afiseazaMesaje(citesteMesaje());

  function citesteMesaje() {
    var s = localStorage.getItem(LS);
    if (s) {
      return JSON.parse(s);
    }
    return [];
  }

  function salveazaMesaje(arr) {
    localStorage.setItem(LS, JSON.stringify(arr));
  }

  text.addEventListener("input", function (e) {
    count.textContent = e.target.value.length;
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      filter.value = "";
      afiseazaMesaje(citesteMesaje());
    }
  });


  addBtn.addEventListener("click", function () {
    var n = nume.value;
    var em = email.value;
    var msg = text.value;

    var reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!reEmail.test(em)) {
      alert("Email invalid");
      return;
    }

    var arr = citesteMesaje();
    arr.push({
      id: Date.now(),
      nume: n,
      text: msg,
      topic: topic.value,
      prio: prio.value,
      data: new Date().toLocaleString()
    });

    salveazaMesaje(arr);
    afiseazaMesaje(arr);

    text.value = "";
    count.textContent = "0";
  });


  filter.addEventListener("input", function (e) {
    var q = e.currentTarget.value.toLowerCase();
    var arr = citesteMesaje();
    var rez = [];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].text.toLowerCase().includes(q)) {
        rez.push(arr[i]);
      }
    }

    afiseazaMesaje(rez);
  });

  function afiseazaMesaje(arr) {
    list.innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
      var m = arr[i];
      var li = document.createElement("li");
      li.setAttribute("data-id", m.id);
      li.addEventListener("click", function (e) {
        e.currentTarget.classList.toggle("selected");
      });

      var span = document.createElement("span");
      span.textContent = m.nume + ": " + m.text + " (" + m.data + ")";
      var del = document.createElement("button");
      del.textContent = "Șterge";
      del.classList.add("del");

      del.addEventListener("click", function (e) {
        e.stopPropagation();

        var liCurent = e.target.parentNode;
        var id = Number(liCurent.getAttribute("data-id"));

        var all = citesteMesaje();
        var nou = [];

        for (var j = 0; j < all.length; j++) {
          if (all[j].id !== id) {
            nou.push(all[j]);
          }
        }

        salveazaMesaje(nou);
        liCurent.remove();
      });

      li.appendChild(span);
      li.appendChild(del);
      list.appendChild(li);
    }
  }

  root.style.border = "2px solid red";
  setInterval(function () {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    root.style.borderColor = "rgb(" + r + "," + g + "," + b + ")";
  }, 2000);
}
