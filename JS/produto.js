const thumbs = document.querySelectorAll('.thumb');
const mainImg = document.getElementById('mainImg');
const cards = document.querySelectorAll('.buy-card');

function showCard(productName) {
  cards.forEach(card => {
    const cardName = card.querySelector('h1').textContent.trim().toLowerCase();
    if (cardName === productName.trim().toLowerCase()) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

// inicializa mostrando só o primeiro card
showCard('Air Sprint Pro');

thumbs.forEach(t => {
  t.addEventListener('click', () => {
    mainImg.src = t.dataset.img;
    thumbs.forEach(th => th.classList.remove('active'));
    t.classList.add('active');
    showCard(t.dataset.product);
  });
});


