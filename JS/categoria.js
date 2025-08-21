
/* ========= Carrinho (localStorage) ========= */
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



  // ===== Tema (persistência)
  (function(){try{const s=localStorage.getItem('theme');if(s)document.documentElement.setAttribute('data-bs-theme',s)}catch(e){}})();
  const root=document.documentElement, toggle=document.getElementById('themeToggle');
  toggle.addEventListener('click',()=>{
    const cur=root.getAttribute('data-bs-theme')||'dark';
    const next=cur==='dark'?'light':'dark';
    root.setAttribute('data-bs-theme',next);
    try{localStorage.setItem('theme',next)}catch(e){}
    toggle.setAttribute('aria-pressed',String(next==='dark'));
  });

  // ===== Mock de produtos (com imagens reais PNG transparente)
  const ITEMS = [
    {id:1, title:'Air Sprint Pro', cat:'Corrida • Unissex', price:699.9, sport:'Running', img:'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5819.png'},
    {id:2, title:'Air Sprint Neon', cat:'Corrida • Unissex', price:729.9, sport:'Running', img:'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5821.png'},
    {id:3, title:'Air Sprint Graphite', cat:'Corrida • Unissex', price:749.9, sport:'Training', img:'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5822.png'},
    {id:4, title:'Air Sprint LTD', cat:'Corrida • Unissex', price:799.9, sport:'Lifestyle', img:'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5826.png'},
    {id:5, title:'Velocity X', cat:'Basquete • Unissex', price:659.9, sport:'Training', img:'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5820.png'},
    {id:6, title:'Street Glide', cat:'Casual • Unissex', price:349.9, sport:'Lifestyle', img:'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5818.png'},
    {id:7, title:'Road Runner', cat:'Corrida • Unissex', price:559.9, sport:'Running', img:'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5817.png'},
    {id:8, title:'Urban Flex', cat:'Casual • Unissex', price:299.9, sport:'Lifestyle', img:'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5816.png'},
    {id:9, title:'Court Master', cat:'Basquete • Unissex', price:579.9, sport:'Training', img:'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5827.png'},
    {id:10, title:'Trail Grip', cat:'Corrida • Unissex', price:629.9, sport:'Running', img:'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5819.png'},
    {id:11, title:'Daylight', cat:'Casual • Unissex', price:269.9, sport:'Lifestyle', img:'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5821.png'},
    {id:12, title:'Pulse 2', cat:'Corrida • Unissex', price:389.9, sport:'Running', img:'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5822.png'},
  ];

  // ===== Estado de filtros e paginação
  const state = {
    filtros: {}, // {categoria:'Corrida', esporte:'Running', preco:'R$ 300–600'}
    sort: 'relevancia',
    page: 1,
    perPage: 8
  };

  const grid = document.getElementById('grid');
  const chipsWrap = document.getElementById('chips');
  const pager = document.getElementById('pager');
  const sortSel = document.getElementById('sort');

  // ===== Util: aplicar filtros
  function applyFilters(items){
    let out = items.slice();

    if(state.filtros.categoria){
      const mapCat = {
        'Corrida':'Corrida',
        'Casual':'Casual',
        'Basquete':'Basquete'
      };
      out = out.filter(i => i.cat.startsWith(mapCat[state.filtros.categoria]));
    }

    if(state.filtros.esporte){
      out = out.filter(i => i.sport === state.filtros.esporte);
    }

    if(state.filtros.preco){
      const f = state.filtros.preco;
      out = out.filter(i=>{
        if(f==='Até R$ 300') return i.price <= 300;
        if(f==='R$ 300–600') return i.price > 300 && i.price <= 600;
        if(f==='Acima de R$ 600') return i.price > 600;
        return true;
      });
    }

    // sort
    if(state.sort === 'preco-asc') out.sort((a,b)=>a.price-b.price);
    if(state.sort === 'preco-desc') out.sort((a,b)=>b.price-a.price);
    if(state.sort === 'novidades') out.sort((a,b)=>b.id-a.id); // mock
    // relevância mantém a ordem original

    return out;
  }

  // ===== Render chips
  function renderChips(){
    chipsWrap.innerHTML = '';
    Object.entries(state.filtros).forEach(([key,val])=>{
      const chip = document.createElement('span');
      chip.className='chip';
      chip.innerHTML = `${val} <span class="remove" aria-label="Remover filtro" data-key="${key}">×</span>`;
      chipsWrap.appendChild(chip);
    });
    if(Object.keys(state.filtros).length){
      const clear = document.createElement('button');
      clear.className='btn btn-sm btn-outline-contrast';
      clear.textContent='Limpar filtros';
      clear.addEventListener('click',()=>{ state.filtros={}; state.page=1; render(); });
      chipsWrap.appendChild(clear);
    }
    chipsWrap.querySelectorAll('.remove').forEach(el=>{
      el.addEventListener('click',()=>{
        const k = el.getAttribute('data-key');
        delete state.filtros[k];
        state.page=1;
        render();
      });
    });
  }

  // ===== Render grid
  function renderGrid(list){
    grid.innerHTML = '';
    const start = (state.page-1)*state.perPage;
    const pageItems = list.slice(start, start+state.perPage);

    if(!pageItems.length){
      grid.innerHTML = `<div class="col-12"><div class="p-5 text-center border rounded-4" style="border-color:var(--border)">Nenhum produto encontrado.</div></div>`;
      return;
    }

    pageItems.forEach(item=>{
      const col = document.createElement('div');
      col.className='col-12 col-sm-6 col-lg-3';

      col.innerHTML = `
        <div class="product-card p-3 h-100">
          <img src="${item.img}" alt="${item.title}" class="w-100 mb-3" loading="lazy">
          <h3 class="h6 mb-1">${item.title}</h3>
          <p class="text-secondary mb-2">${item.cat}</p>
          <div class="d-flex justify-content-between align-items-center">
            <strong class="price">R$ ${item.price.toFixed(2).replace('.',',')}</strong>
            <div class="btn-group">
              <a href="produto.html" class="btn btn-sm btn-outline-contrast">Ver</a>
              <button class="btn btn-sm btn-accent qv-btn" data-id="${item.id}">Quick</button>
            </div>
          </div>
        </div>
      `;
      grid.appendChild(col);
    });

    // bind quick view
    grid.querySelectorAll('.qv-btn').forEach(btn=>{
      btn.addEventListener('click',()=>openQuickView(+btn.getAttribute('data-id')));
    });
  }

  // ===== Render paginação
  function renderPager(total){
    pager.innerHTML = '';
    const pages = Math.max(1, Math.ceil(total/state.perPage));
    const mk = (label, page, disabled=false, active=false)=>{
      const li = document.createElement('li');
      li.className = `page-item ${disabled?'disabled':''} ${active?'active':''}`;
      li.innerHTML = `<a class="page-link" href="#">${label}</a>`;
      if(!disabled){
        li.addEventListener('click',(e)=>{e.preventDefault(); state.page = page; render();});
      }
      return li;
    };
    pager.appendChild(mk('Anterior', Math.max(1,state.page-1), state.page===1));
    for(let p=1;p<=pages;p++){
      pager.appendChild(mk(p, p, false, p===state.page));
    }
    pager.appendChild(mk('Próximo', Math.min(pages,state.page+1), state.page===pages));
  }

  // ===== Quick View
  const qvModal = new bootstrap.Modal('#quickView');
  const qvImg = document.getElementById('qvImg');
  const qvTitle = document.getElementById('qvTitle');
  const qvCat = document.getElementById('qvCat');
  const qvPrice = document.getElementById('qvPrice');
  const qvThumbs = document.getElementById('qvThumbs');
  const qvLink = document.getElementById('qvLink');

  function openQuickView(id){
    const it = ITEMS.find(x=>x.id===id);
    if(!it) return;
    qvTitle.textContent = it.title;
    qvCat.textContent = it.cat + ' • ' + it.sport;
    qvPrice.textContent = 'R$ ' + it.price.toFixed(2).replace('.',',');
    qvImg.src = it.img;
    qvLink.href = 'produto.html';

    // Thumbs (variações mock)
    const altImgs = [
      it.img,
      'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5821.png',
      'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5822.png',
      'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5826.png'
    ];
    qvThumbs.innerHTML = '';
    altImgs.forEach(src=>{
      const b = document.createElement('button');
      b.className='btn btn-outline-contrast btn-sm';
      b.textContent='Ver';
      b.addEventListener('click',()=>{ qvImg.src = src; });
      qvThumbs.appendChild(b);
    });

    qvModal.show();
  }

  // ===== Eventos
  document.querySelectorAll('.filter-item').forEach(el=>{
    el.addEventListener('click',()=>{
      const key = el.getAttribute('data-key');
      const val = el.getAttribute('data-value');
      state.filtros[key] = val; // substitui o valor do mesmo filtro
      state.page = 1;
      render();
    });
  });

  sortSel.addEventListener('change',()=>{
    state.sort = sortSel.value;
    state.page = 1;
    render();
  });

  // ===== Render principal
  function render(){
    const list = applyFilters(ITEMS);
    renderChips();
    renderGrid(list);
    renderPager(list.length);
  }

  // init
  render();
