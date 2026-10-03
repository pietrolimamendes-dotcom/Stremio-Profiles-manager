/* Stremio Perfis + Temas  —  um único arquivo, sem dependências.
 * Como usar: veja as instruções na resposta (tag <script> no HTML, ou userscript).
 */
(function () {
  'use strict';
  if (window.__spLoaded) return;
  window.__spLoaded = true;

  var KP = 'sp_profiles_v1', KA = 'sp_active_v1', KS = 'sp_session_v1';

  // ---------- TEMAS ----------
  function stars(c1, c2) {
    return 'radial-gradient(1.5px 1.5px at 20% 30%,' + c1 + ',transparent),' +
      'radial-gradient(1px 1px at 70% 20%,' + c2 + ',transparent),' +
      'radial-gradient(2px 2px at 40% 80%,' + c1 + ',transparent),' +
      'radial-gradient(1px 1px at 85% 65%,' + c2 + ',transparent),' +
      'radial-gradient(1.5px 1.5px at 10% 70%,' + c2 + ',transparent),' +
      'radial-gradient(1px 1px at 55% 45%,' + c1 + ',transparent)';
  }
  var THEMES = {
    padrao:   { n: 'Padrão',        e: '🎬', bg: '#0c0b11', fg: '#ffffff', ac: '#7b5bf5', g: 'linear-gradient(135deg,#0c0b11,#1a1830)' },
    galaxia:  { n: 'Galáxia',       e: '🌌', bg: '#05010f', fg: '#f3eaff', ac: '#8b5cf6', g: 'radial-gradient(ellipse at 20% 10%,#3b1d78 0,transparent 55%),radial-gradient(ellipse at 80% 90%,#0f3b7a 0,transparent 50%),#05010f', fx: stars('#fff', '#c4b5fd') },
    cinema:   { n: 'Cinema',        e: '🍿', bg: '#120405', fg: '#fff4e0', ac: '#e11d48', g: 'linear-gradient(160deg,#2a0508,#120405 60%,#3a2a05)' },
    series:   { n: 'Séries',        e: '📺', bg: '#071225', fg: '#e6f0ff', ac: '#3b82f6', g: 'linear-gradient(135deg,#071225,#14234d 60%,#2b1b5a)' },
    anime:    { n: 'Anime',         e: '🌸', bg: '#1a0b1f', fg: '#fff0fa', ac: '#ff4fa3', g: 'linear-gradient(135deg,#2a0f33,#0f2a3a)', fx: stars('#ffb3d9', '#9ff3ff') },
    terror:   { n: 'Terror',        e: '🩸', bg: '#060606', fg: '#e8e8e8', ac: '#b91c1c', g: 'radial-gradient(ellipse at 50% 0,#3a0000 0,#060606 70%)' },
    cyberpunk:{ n: 'Cyberpunk',     e: '🤖', bg: '#0a0614', fg: '#e0fffe', ac: '#00f0ff', g: 'linear-gradient(135deg,#1a0536,#06202e 60%,#2e0620)' },
    ficcao:   { n: 'Ficção',        e: '🚀', bg: '#04121a', fg: '#e0f7ff', ac: '#22d3ee', g: 'linear-gradient(160deg,#04121a,#0b3040)', fx: stars('#a5f3fc', '#fff') },
    fantasia: { n: 'Fantasia',      e: '🐉', bg: '#0b1a10', fg: '#f0ffe8', ac: '#84cc16', g: 'linear-gradient(135deg,#0b1a10,#2a2308)' },
    oceano:   { n: 'Oceano',        e: '🌊', bg: '#031521', fg: '#e3f6ff', ac: '#0ea5e9', g: 'linear-gradient(180deg,#031521,#06486b)' },
    por_do_sol:{ n: 'Pôr do sol',   e: '🌅', bg: '#1d0b16', fg: '#fff1e6', ac: '#fb923c', g: 'linear-gradient(160deg,#4a1942,#1d0b16 60%,#7c2d12)' },
    claro:    { n: 'Claro',         e: '☀️', bg: '#f4f4f8', fg: '#16161d', ac: '#6d4aff', g: 'linear-gradient(135deg,#f4f4f8,#e3e6f5)' }
  };

  // ---------- ARMAZENAMENTO ----------
  function load() {
    try { var p = JSON.parse(localStorage.getItem(KP)); if (p && p.length) return p; } catch (e) {}
    return [{ id: uid(), name: 'Perfil 1', img: '', theme: 'padrao' }];
  }
  function save() { try { localStorage.setItem(KP, JSON.stringify(profiles)); } catch (e) {} }
  function uid() { return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  var profiles = load(); save();
  function byId(id) { return profiles.filter(function (p) { return p.id === id; })[0]; }

  // ---------- CSS ----------
  var css = document.createElement('style');
  css.textContent =
    '#sp-ov{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:system-ui,Segoe UI,Roboto,sans-serif;background:var(--spbg);color:var(--spfg);overflow:auto}' +
    '#sp-ov h1{font-size:2.2rem;margin:0 0 2rem;font-weight:600}' +
    '.sp-row{display:flex;flex-wrap:wrap;gap:2rem;justify-content:center;max-width:90vw}' +
    '.sp-card{display:flex;flex-direction:column;align-items:center;gap:.6rem;width:130px}' +
    '.sp-av{width:120px;height:120px;border-radius:14px;background:#333 center/cover no-repeat;display:flex;align-items:center;justify-content:center;font-size:3rem;font-weight:700;color:#fff;cursor:pointer;border:3px solid transparent;transition:.15s;box-sizing:border-box}' +
    '.sp-card:hover .sp-av,.sp-av:focus{border-color:var(--spac);transform:scale(1.07);outline:none}' +
    '.sp-nm{font-size:1.05rem;max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.sp-gear{background:none;border:1px solid currentColor;color:inherit;opacity:.7;border-radius:50%;width:34px;height:34px;font-size:1.1rem;cursor:pointer}' +
    '.sp-gear:hover,.sp-gear:focus{opacity:1;color:var(--spac);outline:none}' +
    '.sp-add .sp-av{background:transparent;border:3px dashed currentColor;opacity:.6;font-size:3.5rem}' +
    '.sp-add:hover .sp-av{opacity:1}' +
    '#sp-ed{position:fixed;inset:0;z-index:2147483100;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;font-family:system-ui,Segoe UI,Roboto,sans-serif}' +
    '.sp-box{background:var(--spbg);color:var(--spfg);border:1px solid var(--spac);border-radius:16px;padding:1.5rem;width:min(560px,92vw);max-height:90vh;overflow:auto;box-sizing:border-box}' +
    '.sp-box h2{margin:0 0 1rem}.sp-box label{display:block;margin:.8rem 0 .3rem;opacity:.8;font-size:.9rem}' +
    '.sp-box input[type=text]{width:100%;padding:.6rem;border-radius:8px;border:1px solid #888;background:rgba(255,255,255,.08);color:inherit;font-size:1rem;box-sizing:border-box}' +
    '.sp-prev{display:flex;align-items:center;gap:1rem}.sp-prev .sp-av{width:80px;height:80px;font-size:2rem;cursor:default}' +
    '.sp-themes{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:.6rem}' +
    '.sp-th{border:2px solid transparent;border-radius:10px;padding:.7rem .3rem;text-align:center;cursor:pointer;color:#fff;font-size:.9rem;text-shadow:0 1px 3px #000}' +
    '.sp-th.on,.sp-th:hover{border-color:#fff}' +
    '.sp-btns{display:flex;gap:.6rem;justify-content:flex-end;margin-top:1.2rem;flex-wrap:wrap}' +
    '.sp-b{padding:.6rem 1.1rem;border-radius:8px;border:0;cursor:pointer;font-size:1rem;background:rgba(128,128,128,.35);color:inherit}' +
    '.sp-b.pri{background:var(--spac);color:#fff}.sp-b.del{background:#b91c1c;color:#fff;margin-right:auto}' +
    '#sp-sw{position:fixed;left:12px;bottom:12px;z-index:2147482000;width:44px;height:44px;border-radius:50%;border:2px solid var(--spac);background:#000a center/cover no-repeat;color:#fff;cursor:pointer;font-weight:700;opacity:.55}' +
    '#sp-sw:hover{opacity:1}';
  document.head.appendChild(css);

  var themeStyle = document.createElement('style');
  themeStyle.id = 'sp-theme';
  document.head.appendChild(themeStyle);

  // ---------- APLICAR TEMA ----------
  function applyTheme(key) {
    var t = THEMES[key] || THEMES.padrao;
    var r = document.documentElement.style;
    r.setProperty('--spbg', t.g); r.setProperty('--spfg', t.fg); r.setProperty('--spac', t.ac);
    themeStyle.textContent =
      ':root{--primary-background-color:' + t.bg + '!important;--secondary-background-color:' + t.bg + 'cc!important;' +
      '--primary-foreground-color:' + t.fg + '!important;--primary-accent-color:' + t.ac + '!important;' +
      '--secondary-accent-color:' + t.ac + '!important}' +
      'html,body{background:' + t.g + '!important;background-attachment:fixed!important;color:' + t.fg + '}' +
      (t.fx ? 'body::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:1;opacity:.45;' +
        'background-image:' + t.fx + ';background-size:420px 420px;animation:spmove 90s linear infinite}' +
        '@keyframes spmove{to{background-position:420px 420px}}' : '');
  }

  // ---------- UI ----------
  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    for (var k in (attrs || {})) {
      if (k === 'text') e.textContent = attrs[k];
      else if (k.slice(0, 2) === 'on') e[k] = attrs[k];
      else if (k === 'style') e.style.cssText = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }
  function paintAvatar(el, p) {
    if (p.img) { el.style.backgroundImage = 'url(' + p.img + ')'; el.textContent = ''; }
    else {
      var t = THEMES[p.theme] || THEMES.padrao;
      el.style.backgroundImage = 'none';
      el.style.background = t.ac;
      el.textContent = (p.name || '?').trim().charAt(0).toUpperCase();
    }
  }

  var ov = null;
  function openSelector() {
    closeSelector();
    var active = byId(localStorage.getItem(KA)) || profiles[0];
    applyTheme(active.theme);
    ov = h('div', { id: 'sp-ov' });
    ov.appendChild(h('h1', { text: 'Quem está assistindo?' }));
    var row = h('div', { 'class': 'sp-row' });
    profiles.forEach(function (p) {
      var av = h('div', { 'class': 'sp-av', tabindex: '0', onclick: function () { choose(p.id); },
        onkeydown: function (e) { if (e.key === 'Enter') choose(p.id); } });
      paintAvatar(av, p);
      row.appendChild(h('div', { 'class': 'sp-card' }, [
        av,
        h('div', { 'class': 'sp-nm', text: p.name }),
        h('button', { 'class': 'sp-gear', title: 'Editar perfil', text: '⚙', onclick: function () { openEditor(p.id); } })
      ]));
    });
    var add = h('div', { 'class': 'sp-card sp-add' }, [
      h('div', { 'class': 'sp-av', tabindex: '0', text: '+', onclick: newUser,
        onkeydown: function (e) { if (e.key === 'Enter') newUser(); } }),
      h('div', { 'class': 'sp-nm', text: 'Novo usuário' })
    ]);
    row.appendChild(add);
    ov.appendChild(row);
    document.body.appendChild(ov);
  }
  function closeSelector() { if (ov && ov.parentNode) ov.parentNode.removeChild(ov); ov = null; }

  function choose(id) {
    localStorage.setItem(KA, id);
    sessionStorage.setItem(KS, '1');
    applyTheme(byId(id).theme);
    closeSelector();
    updateSwitch();
  }
  function newUser() {
    var p = { id: uid(), name: 'Novo usuário', img: '', theme: 'padrao' };
    profiles.push(p); save();
    openEditor(p.id, true);
  }

  function openEditor(id, isNew) {
    var p = byId(id); if (!p) return;
    var draft = { name: p.name, img: p.img, theme: p.theme };
    var ed = h('div', { id: 'sp-ed' });
    var box = h('div', { 'class': 'sp-box' });
    var av = h('div', { 'class': 'sp-av' });
    function repaint() { paintAvatar(av, draft); applyTheme(draft.theme); }
    var nameIn = h('input', { type: 'text', maxlength: '20' });
    nameIn.value = draft.name;
    nameIn.oninput = function () { draft.name = nameIn.value; repaint(); };
    var file = h('input', { type: 'file', accept: 'image/*', style: 'display:none' });
    file.onchange = function () {
      var f = file.files[0]; if (!f) return;
      var fr = new FileReader();
      fr.onload = function () {
        var im = new Image();
        im.onload = function () {
          var s = 160, c = document.createElement('canvas'); c.width = c.height = s;
          var m = Math.min(im.width, im.height);
          c.getContext('2d').drawImage(im, (im.width - m) / 2, (im.height - m) / 2, m, m, 0, 0, s, s);
          draft.img = c.toDataURL('image/jpeg', 0.85); repaint();
        };
        im.src = fr.result;
      };
      fr.readAsDataURL(f);
    };
    box.appendChild(h('h2', { text: isNew ? 'Novo usuário' : 'Editar perfil' }));
    box.appendChild(h('div', { 'class': 'sp-prev' }, [av, h('div', {}, [
      h('button', { 'class': 'sp-b', text: '🖼 Escolher imagem', onclick: function () { file.click(); } }),
      h('button', { 'class': 'sp-b', text: 'Remover', style: 'margin-left:.4rem', onclick: function () { draft.img = ''; repaint(); } }),
      file
    ])]));
    box.appendChild(h('label', { text: 'Nome' }));
    box.appendChild(nameIn);
    box.appendChild(h('label', { text: 'Tema' }));
    var grid = h('div', { 'class': 'sp-themes' });
    Object.keys(THEMES).forEach(function (k) {
      var t = THEMES[k];
      var d = h('div', { 'class': 'sp-th' + (k === draft.theme ? ' on' : ''), style: 'background:' + t.g, text: t.e + ' ' + t.n,
        onclick: function () {
          draft.theme = k;
          Array.prototype.forEach.call(grid.children, function (x) { x.classList.remove('on'); });
          d.classList.add('on'); repaint();
        } });
      grid.appendChild(d);
    });
    box.appendChild(grid);
    var btns = h('div', { 'class': 'sp-btns' });
    if (profiles.length > 1) btns.appendChild(h('button', { 'class': 'sp-b del', text: 'Excluir', onclick: function () {
      if (!confirm('Excluir este perfil?')) return;
      profiles = profiles.filter(function (x) { return x.id !== id; }); save();
      if (localStorage.getItem(KA) === id) localStorage.setItem(KA, profiles[0].id);
      done();
    } }));
    btns.appendChild(h('button', { 'class': 'sp-b', text: 'Cancelar', onclick: function () {
      if (isNew) { profiles = profiles.filter(function (x) { return x.id !== id; }); save(); }
      done();
    } }));
    btns.appendChild(h('button', { 'class': 'sp-b pri', text: 'Salvar', onclick: function () {
      p.name = (draft.name || '').trim() || 'Perfil'; p.img = draft.img; p.theme = draft.theme; save(); done();
    } }));
    box.appendChild(btns);
    ed.appendChild(box);
    document.body.appendChild(ed);
    repaint();
    function done() { ed.parentNode.removeChild(ed); openSelector(); }
  }

  // ---------- Botão flutuante p/ trocar de perfil ----------
  var sw = null;
  function updateSwitch() {
    if (!sw) {
      sw = h('button', { id: 'sp-sw', title: 'Trocar de perfil', onclick: openSelector });
      document.body.appendChild(sw);
    }
    var p = byId(localStorage.getItem(KA)) || profiles[0];
    paintAvatar(sw, p);
  }

  // ---------- INÍCIO ----------
  function start() {
    var p = byId(localStorage.getItem(KA)) || profiles[0];
    applyTheme(p.theme);
    updateSwitch();
    if (!sessionStorage.getItem(KS)) openSelector();
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
