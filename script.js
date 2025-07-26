    document.getElementById('menu-toggle').addEventListener('click', () => {
      document.getElementById('menu').classList.toggle('show');
    });

    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const loader = document.getElementById('loader');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      successMessage.style.display = 'none';
      loader.innerHTML = '⏳ Sending...';

      const formData = new FormData(form);
      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        loader.innerHTML = '';
        if (response.ok) {
          successMessage.style.display = 'block';
          form.reset();
        } else {
          alert("❌ Oops! Something went wrong. Try again.");
        }
      }).catch(error => {
        loader.innerHTML = '';
        alert("❌ Error submitting the form.");
      });
    });

    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
      // Theme Toggle Logic
    const toggleSwitch = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;

    // Load saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
      rootElement.classList.add('dark-mode');
      toggleSwitch.checked = true;
    }

    toggleSwitch.addEventListener('change', () => {
      if (toggleSwitch.checked) {
        rootElement.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        rootElement.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    });