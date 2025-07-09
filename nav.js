// Ambil isi nav.html dan masukkan ke #nav-container
fetch('nav.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('nav-container').innerHTML = data;

    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
      // Toggle menu saat hamburger diklik
      hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // cegah bubbling
        navMenu.classList.toggle('show');
      });

      // Klik link = tutup menu
      const links = navMenu.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('show');
        });
      });

      // Klik di luar nav dan tombol = tutup menu
      document.addEventListener('click', (e) => {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickHamburger = hamburger.contains(e.target);

        if (!isClickInsideMenu && !isClickHamburger) {
          navMenu.classList.remove('show');
        }
      });
    }
  });

// DARK MODE TOGGLE
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("themeToggle");
  const body = document.body;

  // Muat tema tersimpan
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    if (toggle) toggle.textContent = "🌞";
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");
      toggle.textContent = isDark ? "🌞" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }
});
