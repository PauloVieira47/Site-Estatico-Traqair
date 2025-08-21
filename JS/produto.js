
/* ========= Carrinho (localStorage) ========= */

// Botão "Adicionar ao carrinho"
const addToCartBtn = document.getElementById('addToCartBtn');
addToCartBtn.addEventListener('click', () => {
  if (!selectedColor || !selectedSize) {
    alert('Escolha cor e tamanho antes de adicionar ao carrinho.');
    return;
  }

  Cart.add({
    id: 'air-sprint-pro',
    title: 'Air Sprint Pro',
    color: selectedColor,
    size: selectedSize,
    price: 499.90,
    img: mainImg.getAttribute('src'),
    qty: 1
  });
});

const Cart = (() => {
  const KEY = 'shortkicks_cart';
  const fmt = n => 'R$ ' + n.toFixed(2).replace('.', ',');

  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)) || []; }catch(e){ return []; } }
  function save(items){ localStorage.setItem(KEY, JSON.stringify(items)); render(); }

  function add(item){
    const items = load();
    const idx = items.findIndex(i => i.id===item.id && i.color===item.color && i.size===item.size);
    if(idx>=0){ items[idx].qty += item.qty||1; }
    else{ items.push({...item, qty:item.qty||1}); }
    save(items);
    toast('Adicionado ao carrinho!');
  }

  function remove(index){
    const items = load(); items.splice(index,1); save(items);
  }

  function setQty(index, qty){
    const items = load();
    items[index].qty = Math.max(1, qty|0);
    save(items);
  }

  function clear(){ save([]); }

  function subtotal(){ return load().reduce((s,i)=> s + i.price * i.qty, 0); }

  // Render UI
  function render(){
    const items = load();
    // badge
    const badge = document.getElementById('cartBadge');
    if(badge){ badge.textContent = items.reduce((s,i)=>s+i.qty,0); }

    // list
    const list = document.getElementById('cartItems');
    if(list){
      list.innerHTML = '';
      items.forEach((it, idx)=>{
        const row = document.createElement('div');
        row.className = 'd-flex gap-3 align-items-center';
        row.innerHTML = `
          <img src="${it.img}" alt="${it.title}" style="width:72px;height:72px;object-fit:contain;background:var(--bg-soft);border:1px solid var(--border);border-radius:12px;padding:6px">
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between">
              <strong>${it.title}</strong>
              <button class="btn btn-sm btn-outline-contrast" data-remove="${idx}">Remover</button>
            </div>
            <div class="small text-secondary">${it.cat||''} ${it.color?('• '+it.color):''} ${it.size?('• '+it.size):''}</div>
            <div class="d-flex align-items-center gap-2 mt-1">
              <span class="small text-secondary">Qtd.</span>
              <input type="number" min="1" value="${it.qty}" data-qty="${idx}" class="form-control form-control-sm" style="width:80px;background:var(--bg);border-color:var(--border);color:var(--txt)">
              <span class="ms-auto fw-semibold">${fmt(it.price * it.qty)}</span>
            </div>
          </div>
        `;
        list.appendChild(row);
      });

      // bind qty/remove
      list.querySelectorAll('[data-remove]').forEach(btn=>{
        btn.addEventListener('click',()=> remove(+btn.getAttribute('data-remove')));
      });
      list.querySelectorAll('[data-qty]').forEach(inp=>{
        inp.addEventListener('input',()=> setQty(+inp.getAttribute('data-qty'), +inp.value));
      });
    }

    // subtotal
    const sub = document.getElementById('cartSubtotal');
    if(sub){ sub.textContent = fmt(subtotal()); }
  }

  // Toast simples
  function toast(msg){
    try{
      const t = document.createElement('div');
      t.textContent = msg;
      t.style.position='fixed'; t.style.right='16px'; t.style.bottom='70px';
      t.style.background='var(--bg-soft)'; t.style.color='var(--txt)';
      t.style.border='1px solid var(--border)'; t.style.borderRadius='12px';
      t.style.padding='.6rem .9rem'; t.style.boxShadow='0 10px 30px rgba(0,0,0,.35)';
      t.style.zIndex='2000';
      document.body.appendChild(t);
      setTimeout(()=>{ t.remove(); }, 1500);
    }catch(e){}
  }

  // Botões do offcanvas
  window.addEventListener('DOMContentLoaded', ()=>{
    const clearBtn = document.getElementById('clearCartBtn');
    if(clearBtn) clearBtn.addEventListener('click', ()=> clear());
    const checkoutBtn = document.getElementById('checkoutBtn');
    if(checkoutBtn) checkoutBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      alert('Checkout fictício: aqui você integraria com sua página de pagamento.');
    });
    render();
  });

  return { add, load, render, clear };
})();



  // Restaurar tema salvo (mesma lógica do index)
  (function(){
    try{const saved=localStorage.getItem('theme');if(saved)document.documentElement.setAttribute('data-bs-theme',saved)}catch(e){}
  })();

  // Toggle tema
  const rootHtml=document.documentElement, btnToggle=document.getElementById('themeToggle');
  btnToggle.addEventListener('click',()=>{
    const current=rootHtml.getAttribute('data-bs-theme')||'dark';
    const next=current==='dark'?'light':'dark';
    rootHtml.setAttribute('data-bs-theme',next);
    try{localStorage.setItem('theme',next)}catch(e){}
    btnToggle.setAttribute('aria-pressed',String(next==='dark'));
  });

  // Galeria - troca imagem
  const mainImg=document.getElementById('mainImg');
  document.querySelectorAll('.thumb').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.thumb').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const src=btn.getAttribute('data-img');
      mainImg.setAttribute('src',src);
    });
  });

  // Mapear cores -> imagem principal
  const colorMap={
    red:"https://pngimg.com/uploads/running_shoes/running_shoes_PNG5819.png",
    blue:"https://pngimg.com/uploads/running_shoes/running_shoes_PNG5821.png",
    graphite:"https://pngimg.com/uploads/running_shoes/running_shoes_PNG5822.png",
    neon:"https://pngimg.com/uploads/running_shoes/running_shoes_PNG5826.png"
  };

  // Seletor de cor
  let selectedColor=null, selectedSize=null;
  const colorGroup=document.getElementById('colorGroup');
  colorGroup.querySelectorAll('.swatch').forEach(s=>{
    s.addEventListener('click',()=>{
      colorGroup.querySelectorAll('.swatch').forEach(x=>x.classList.remove('active'));
      s.classList.add('active');
      selectedColor=s.getAttribute('data-color');
      // troca imagem principal e marca thumb correspondente
      const src=colorMap[selectedColor];
      mainImg.setAttribute('src',src);
      document.querySelectorAll('.thumb').forEach(b=>{
        b.classList.toggle('active', b.getAttribute('data-img')===src);
      });
      checkBuyReady();
    });
  });

  // Seletor de tamanho
  const sizeGroup=document.getElementById('sizeGroup');
  sizeGroup.querySelectorAll('.size-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      sizeGroup.querySelectorAll('.size-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active'); selectedSize=btn.textContent.trim(); checkBuyReady();
    });
  });

  // Habilitar compra quando cor + tamanho escolhidos
  const buyBtn=document.getElementById('buyBtn');
  function checkBuyReady(){ buyBtn.disabled=!(selectedColor && selectedSize); }

  buyBtn.addEventListener('click',()=>{
    const msg=`Comprado: Air Sprint Pro | Cor: ${selectedColor} | Tamanho: ${selectedSize}`;
    alert(msg);
  });

  // Scrollytelling leve: entra com efeito
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.18});
  document.querySelectorAll('.tech-card').forEach(el=>io.observe(el));
