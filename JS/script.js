
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
       autoplay: {
    delay: 3000, 
    disableOnInteraction: false
  },
      breakpoints: {
        0: { slidesPerView: 1.15, spaceBetween: 16 },
        768:{ slidesPerView: 2.1,  spaceBetween: 24 },
        1200:{ slidesPerView: 3.1, spaceBetween: 32 }
      }
    });




// Categorias de produtos/Logica

document.querySelectorAll('.categoria').forEach(cat => {
  cat.addEventListener('click', () => {
    const faixa = cat.dataset.faixa;
    const container = document.getElementById('produtos-filtrados');
    container.innerHTML = ''; // limpa produtos anteriores

    document.querySelectorAll('.produto').forEach(prod => {
      const preco = parseFloat(prod.dataset.preco);

      if (
        (faixa === 'ate199' && preco <= 199) ||
        (faixa === 'ate299' && preco > 199 && preco <= 299) ||
        (faixa === 'ate399' && preco > 299 && preco <= 399) ||
        (faixa === 'acima499' && preco > 499)
      ) {
        container.appendChild(prod.cloneNode(true)); // clona produto e adiciona
      }
    });
  });
});




  const rootHtml = document.documentElement;
    const btnToggle = document.getElementById('themeToggle');
    btnToggle.addEventListener('click', ()=>{
      const current = rootHtml.getAttribute('data-bs-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      rootHtml.setAttribute('data-bs-theme', next);
      try { localStorage.setItem('theme', next); } catch(e){}
      btnToggle.setAttribute('aria-pressed', String(next === 'dark'));
    });