document.getElementById("load_more").addEventListener("click", () => {
  fetch("https://api.github.com/users/HugoW5/repos")
    .then((response) => {
      document.getElementById("loading_gif").style.display = "block";

      if (!response.ok) {
        document.getElementById("loading_gif").style.display = "none";
        alert("Fel vid hämtning av projekt");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((repos) => {
      repos.forEach((repo) => {
        let projectDiv = document.createElement("div");
        projectDiv.className = "project";
        let titleDiv = document.createElement("div");
        titleDiv.className = "title";
        let h2 = document.createElement("h2");
        h2.innerText = repo.name;
        titleDiv.appendChild(h2);
        projectDiv.appendChild(titleDiv);

        if (repo.description != null) {
          let p = document.createElement("p");
          p.className = "description";
          p.innerText = repo.description;
          projectDiv.appendChild(p);
        }

        let stackDiv = document.createElement("div");
        stackDiv.className = "stack";
        let languageH3 = document.createElement("h3");
        languageH3.innerText = repo.language;
        stackDiv.appendChild(languageH3);
        projectDiv.appendChild(stackDiv);

        let link = document.createElement("a");
        link.href = repo.html_url;

        link.className = "example-label";

        let icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-arrow-up-right-from-square");

        link.textContent = "Läs mer på Github ";
        link.target = "_blank";
        link.appendChild(icon);

        projectDiv.appendChild(link);

        document.getElementById("projects-container").appendChild(projectDiv);
      });

      document.getElementById("loading_gif").style.display = "none";
      document.getElementById("load_more").style.display = "none";
    })
    .catch((error) => console.error("Error fetching repositories", error));
});
