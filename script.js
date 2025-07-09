// =====================
// AOS Animation
// =====================
AOS.init();

// =====================
// Load nav.html
// =====================
fetch('nav.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('nav-container').innerHTML = data;

    // === Toggle Tema Setelah Nav Dimuat ===
    const toggle = document.getElementById("themeToggle");
    const body = document.body;

    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-mode");
      toggle.textContent = "🌞";
    }

    toggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");
      toggle.textContent = isDark ? "🌞" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  });

// =====================
// Load prestasi.html dan jalankan prestasi.js
// =====================
fetch('prestasi.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('prestasi-container').innerHTML = data;
    const script = document.createElement('script');
    script.src = 'prestasi.js';
    document.body.appendChild(script);
  });

// =====================
// Saat Halaman Dimuat
// =====================
document.addEventListener("DOMContentLoaded", function () {
  // === Efek Ketik Nama ===
  const typingEl = document.getElementById("typing");
  if (typingEl) {
    const teks = "Fahmi Fadilah Purba";
    let i = 0;

    function ketik() {
      if (i < teks.length) {
        typingEl.textContent += teks.charAt(i);
        i++;
        setTimeout(ketik, 100);
      }
    }

    ketik();
  }

  // === Efek Ketik Loop ===
  const el = document.getElementById("typing-loop");
  if (el) {
    const texts = [
      "Seorang Junior Engineer 🚀",
      "Web Developer 💻",
      "IoT & Robotics Enthusiast 🤖",
      "Tech Explorer 🌐"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let typingForward = true;

    function typeLoop() {
      const currentText = texts[textIndex];
      if (typingForward) {
        el.textContent = currentText.slice(0, charIndex++);
        if (charIndex > currentText.length) {
          typingForward = false;
          setTimeout(typeLoop, 1000);
          return;
        }
      } else {
        el.textContent = currentText.slice(0, --charIndex);
        if (charIndex === 0) {
          typingForward = true;
          textIndex = (textIndex + 1) % texts.length;
        }
      }
      setTimeout(typeLoop, typingForward ? 100 : 50);
    }

    typeLoop();
  }

  // === Validasi & Kirim Form ===
  const form = document.getElementById("contactForm");
  if (form) {
    const emailInput = document.querySelector("input[type='email']");
    const nameInput = document.querySelector("input[name='name']");
    const messageInput = document.querySelector("textarea");
    const messageDiv = document.getElementById("formMessage");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let valid = true;
      let errorMsg = "";

      if (nameInput.value.trim() === "") {
        valid = false;
        errorMsg += "Nama harus diisi.\n";
      }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(emailInput.value)) {
        valid = false;
        errorMsg += "Email tidak valid.\n";
      }

      if (messageInput.value.trim() === "") {
        valid = false;
        errorMsg += "Pesan tidak boleh kosong.\n";
      }

      if (!valid) {
        alert(errorMsg);
        return;
      }

      fetch("https://formspree.io/f/xkgrngjb", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value
        })
      })
      .then(response => {
        if (response.ok) {
          messageDiv.textContent = "Formulir sudah terkirim!";
          messageDiv.style.color = "green";
          form.reset();
        } else {
          return response.json().then(data => {
            throw new Error(data.error || "Terjadi kesalahan.");
          });
        }
      })
      .catch(error => {
        messageDiv.textContent = "Gagal mengirim: " + error.message;
        messageDiv.style.color = "red";
      });
    });
  }
});
