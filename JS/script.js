
    // Restaurar tema salvo
    (function(){
      try {
        const saved = localStorage.getItem('theme');
        if(saved) document.documentElement.setAttribute('data-bs-theme', saved);
      } catch(e){}
    })();

    // Submenu abre no hover em desktop, clique em mobile
    document.querySelectorAll('.dropdown-submenu').forEach(function(item){
      item.addEventListener('mouseenter', function(){
        if (window.matchMedia('(pointer:fine)').matches) {
          const menu = item.querySelector('.dropdown-menu');
          if(menu) menu.classList.add('show');
        }
      });
      item.addEventListener('mouseleave', function(){
        const menu = item.querySelector('.dropdown-menu');
        if(menu) menu.classList.remove('show');
      });
    });

    // Swiper coverflow 3D
    const swiper = new Swiper('.mySwiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      initialSlide: 1,
      coverflowEffect: { rotate: 0, stretch: 0, depth: 180, modifier: 2.2, slideShadows: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        0: { slidesPerView: 1.15, spaceBetween: 16 },
        768:{ slidesPerView: 2.1,  spaceBetween: 24 },
        1200:{ slidesPerView: 3.1, spaceBetween: 32 }
      }
    });

    // Toggle Dark/Light com persistência
    const rootHtml = document.documentElement;
    const btnToggle = document.getElementById('themeToggle');
    btnToggle.addEventListener('click', ()=>{
      const current = rootHtml.getAttribute('data-bs-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      rootHtml.setAttribute('data-bs-theme', next);
      try { localStorage.setItem('theme', next); } catch(e){}
      btnToggle.setAttribute('aria-pressed', String(next === 'dark'));
    });



    //Validação formulário

(function () {
  'use strict'

  const signupForm = document.getElementById('signupForm');
  const password = document.getElementById('signupPassword');
  const confirmPassword = document.getElementById('signupConfirmPassword');
  const emailInputs = document.querySelectorAll('.email-validate');

  // Regex para validar e-mail: apenas minúsculas + @ + .
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  signupForm.addEventListener('submit', function (event) {
    let valid = signupForm.checkValidity();

    // valida senha confirmada
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("As senhas não coincidem");
      valid = false;
    } else {
      confirmPassword.setCustomValidity("");
    }

    // valida email
    emailInputs.forEach(input => {
      if (!emailRegex.test(input.value)) {
        input.setCustomValidity("E-mail inválido");
        valid = false;
      } else {
        input.setCustomValidity("");
      }
    });

    if (!valid) {
      event.preventDefault();
      event.stopPropagation();
    }

    signupForm.classList.add('was-validated');
  }, false);

  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (input.type === "password") {
        input.type = "text";
        btn.textContent = "🙈";
      } else {
        input.type = "password";
        btn.textContent = "👁️";
      }
    });
  });

})();