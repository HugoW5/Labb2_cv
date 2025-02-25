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


