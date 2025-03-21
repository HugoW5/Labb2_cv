document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkmode-toggle");

  const savedTheme = localStorage.getItem("darkmode");

  if (savedTheme === "enabled") {
    toggle.checked = true;
    document.body.classList.add("darkmode");
  } else if (savedTheme === "disabled") {
    toggle.checked = false;
    document.body.classList.remove("darkmode");
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) {
      toggle.checked = true;
      document.body.classList.add("darkmode");
    }
  }
  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      localStorage.setItem("darkmode", "enabled");
      document.body.classList.add("darkmode");
    } else {
      localStorage.setItem("darkmode", "disabled");
      document.body.classList.remove("darkmode");
    }
  });
});

const sequense = "1337";
let sequenseIndex = 0;
document.body.addEventListener("keydown", (e) => {
  if (e.key == sequense[sequenseIndex]) {
    console.log(e.key);
    sequenseIndex++;
    if (sequenseIndex == 4) {
      alert("Elit");
      sequenseIndex = 0;
    }
  } else {
    sequenseIndex = 0;
  }
});

document.getElementById("footer_heading").addEventListener("click", () => {
  document.body.style.backgroundColor = "green";
});

async function templateResume() {
  try {
    await fetch("./resume.json")
      .then((res) => res.json())
      .then((data) => {
        if (data != null) {
          document.getElementById("name_header").innerHTML = data.name;
          document.getElementById("info").innerHTML = data.info;

          if (data.github != undefined) {
            let a = document.createElement("a");
            a.target = "_blank";
            a.id = "github_link";
            a.href = data.github;
            a.ariaLabel = "Github";
            let i = document.createElement("i");
            i.className = "fa-brands fa-github icon";
            i.ariaHidden = true;
            a.appendChild(i);
            document.getElementById("container-header").appendChild(a);
          }
          if (data.linkedin != undefined) {
            let a = document.createElement("a");
            a.target = "_blank";
            a.id = "linkedin_link";
            a.href = data.linkedin;
            a.ariaLabel = "Linkedin";
            let i = document.createElement("i");
            i.className = "fa-brands fa-linkedin icon";
            i.ariaHidden = true;
            a.appendChild(i);
            document.getElementById("container-header").appendChild(a);
          }
          if (data.email != undefined) {
            let a = document.createElement("a");
            a.target = "_blank";
            a.id = "email_link";
            a.href = "mailto:" + data.email;
            a.ariaLabel = "Epost";
            let i = document.createElement("i");
            i.className = "fa-solid fa-envelope icon";
            i.ariaHidden = true;
            a.appendChild(i);
            document.getElementById("container-header").appendChild(a);
          }

          data.education.forEach((element) => {
            if (element != undefined) {
              console.log(element);
              let li = document.createElement("li");
              li.innerText = element.name;
              let span = document.createElement("span");
              span.className = "time-span";
              span.innerText = element.span;
              li.appendChild(span);
              document.getElementById("educations").appendChild(li);
            }
          });

          data.workplaces.forEach((element) => {
            if (element != undefined) {
              console.log(element);
              let li = document.createElement("li");
              li.innerText = element.name;
              let span = document.createElement("span");
              span.className = "time-span";
              span.innerText = element.span;
              li.appendChild(span);
              document.getElementById("workplaces").appendChild(li);
            }
          });
        }
      });
  } catch (err) {
    //console.log(err);
    document.getElementById("loading").style.display = "none";
    return null;
  }
  document.getElementById("loading").style.display = "none";
}

templateResume();
