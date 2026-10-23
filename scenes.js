/* Original animated genre scenes, drawn live on <canvas>. One shared animation loop,
   only canvases that are on screen are drawn (cheap on battery). */
(function () {
  const TAU = Math.PI * 2;
  const PERIOD = { thriller: 1600, crime: 1200, music: 1400, reality: 1500, documentary: 5000, history: 5000, western: 5000, drama: 4200, war: 4200 };
  const items = new Set();
  const visible = new WeakSet();
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target))) : null;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function seeds(key) { let h = 0; for (const c of key) h = (h * 31 + c.charCodeAt(0)) | 0; return Array.from({ length: 12 }, (_, i) => (((h * 31 + i * 7919) & 0xffff) / 65535)); }
  const sin = Math.sin, cos = Math.cos, abs = Math.abs;
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; };
  function circle(c, x, y, r, fill) { c.beginPath(); c.arc(x, y, Math.max(r, .1), 0, TAU); c.fillStyle = fill; c.fill(); }
  function ring(c, x, y, r, stroke, lw) { c.beginPath(); c.arc(x, y, Math.max(r, .1), 0, TAU); c.strokeStyle = stroke; c.lineWidth = lw; c.stroke(); }
  function line(c, x1, y1, x2, y2, col, lw) { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.stroke(); }
  function oval(c, x, y, w, h, fill, stroke) { c.beginPath(); c.ellipse(x + w / 2, y + h / 2, Math.max(w / 2, .1), Math.max(h / 2, .1), 0, 0, TAU); if (stroke) { c.strokeStyle = fill; c.lineWidth = stroke; c.stroke(); } else { c.fillStyle = fill; c.fill(); } }
  function heart(c, x, y, s, fill) { c.beginPath(); c.moveTo(x, y + s * .35); c.bezierCurveTo(x - s * .9, y - s * .25, x - s * .45, y - s * .95, x, y - s * .45); c.bezierCurveTo(x + s * .45, y - s * .95, x + s * .9, y - s * .25, x, y + s * .35); c.fillStyle = fill; c.fill(); }
  function sparkle(c, x, y, r, fill) { c.beginPath(); c.moveTo(x, y - r); c.quadraticCurveTo(x, y, x + r, y); c.quadraticCurveTo(x, y, x, y + r); c.quadraticCurveTo(x, y, x - r, y); c.quadraticCurveTo(x, y, x, y - r); c.fillStyle = fill; c.fill(); }

  const S = {
    action(c, w, h, v, s) {
      for (let k = 0; k < 3; k++) {
        const q = (v + k / 3) % 1, x = w * (.45 + .5 * s[k]), y = h * (.15 + .5 * s[k + 3]);
        const r = Math.min(w, h) * .55 * ease(q), a = 1 - q;
        const g = c.createRadialGradient(x, y, 0, x, y, Math.max(r, 1));
        g.addColorStop(0, `rgba(255,243,176,${a})`); g.addColorStop(.6, `rgba(255,122,0,${a * .6})`); g.addColorStop(1, 'rgba(255,122,0,0)');
        circle(c, x, y, r, g);
        for (let i = 0; i < 8; i++) { const an = i / 8 * TAU + k; line(c, x + cos(an) * r * .6, y + sin(an) * r * .6, x + cos(an) * r * 1.15, y + sin(an) * r * 1.15, `rgba(255,224,138,${a})`, 2.5); }
      }
    },
    adventure(c, w, h, v) {
      circle(c, w * .78, h * (.32 + .05 * sin(v * TAU)), h * .16, 'rgba(255,226,154,.8)');
      c.beginPath(); c.moveTo(0, h); c.lineTo(w * .22, h * .45); c.lineTo(w * .38, h * .7); c.lineTo(w * .6, h * .3); c.lineTo(w * .85, h * .75); c.lineTo(w, h * .55); c.lineTo(w, h); c.fillStyle = 'rgba(0,0,0,.35)'; c.fill();
      c.beginPath(); c.moveTo(w * .6, h * .3); c.lineTo(w * .53, h * .42); c.lineTo(w * .67, h * .42); c.fillStyle = 'rgba(255,255,255,.7)'; c.fill();
      for (let k = 0; k < 2; k++) oval(c, ((v + k * .5) % 1) * w * 1.4 - w * .2, h * (.12 + .15 * k), w * .22, h * .1, 'rgba(255,255,255,.35)');
      const bx = w * (.1 + .8 * v), by = h * (.25 + .06 * sin(v * TAU * 3)), f = 4 * sin(v * TAU * 8);
      line(c, bx - 6, by - f, bx, by, '#fff', 2); line(c, bx + 6, by - f, bx, by, '#fff', 2);
    },
    comedy(c, w, h, v) {
      const hop = abs(sin(v * Math.PI * 2)), r = h * .26, x = w * .72, y = h * .72 - hop * h * .4;
      const sq = hop < .12 ? (.12 - hop) / .12 * .2 : 0;
      c.save(); c.translate(x, y); c.scale(1 + sq, 1 - sq);
      circle(c, 0, 0, r, '#FFE066');
      const bl = (v * 3) % 1 > .9 ? .15 : 1;
      oval(c, -r * .45, -r * .35, r * .22, r * .3 * bl, '#5C4A00'); oval(c, r * .23, -r * .35, r * .22, r * .3 * bl, '#5C4A00');
      c.beginPath(); c.ellipse(0, r * .18, r * .55, r * .47, 0, .17, 2.97); c.strokeStyle = '#5C4A00'; c.lineWidth = r * .14; c.lineCap = 'round'; c.stroke();
      c.restore();
    },
    drama(c, w, h, v) {
      [[.15, 1], [.85, -1]].forEach(([x, d]) => {
        c.save(); c.translate(w * x, -h * .1); c.rotate((d * (20 + 25 * sin(v * TAU))) * Math.PI / 180);
        const g = c.createLinearGradient(0, 0, 0, h * 1.2); g.addColorStop(0, 'rgba(255,255,255,.45)'); g.addColorStop(1, 'rgba(255,255,255,0)');
        c.beginPath(); c.moveTo(-4, 0); c.lineTo(4, 0); c.lineTo(w * .22, h * 1.2); c.lineTo(-w * .22, h * 1.2); c.fillStyle = g; c.fill(); c.restore();
      });
      oval(c, w * .25, h * .82, w * .5, h * .18, `rgba(255,255,255,${.15 + .1 * sin(v * TAU * 2)})`);
    },
    scifi(c, w, h, v, s) {
      for (let i = 0; i < 12; i++) { const sp = .6 + s[i], x = w - ((v * sp * 2 + s[(i + 5) % 12]) % 1) * w * 1.2, y = h * s[(i + 3) % 12]; line(c, x, y, x + 10 * sp, y, `rgba(255,255,255,${.4 + .5 * s[i]})`, 1.6); }
      const x = w * .78, y = h * .38, g = c.createLinearGradient(x - 10, y - 10, x + 10, y + 10); g.addColorStop(0, '#9BE7FF'); g.addColorStop(1, '#1B6CA8');
      circle(c, x, y, h * .2, g);
      c.save(); c.translate(x, y); c.rotate((-18 + 6 * sin(v * TAU)) * Math.PI / 180); oval(c, -h * .36, -h * .07, h * .72, h * .14, 'rgba(255,255,255,.75)', 2.5); c.restore();
    },
    horror(c, w, h, v) {
      const fl = v > .08 && v < .12 ? .55 : v > .16 && v < .19 ? .3 : 0;
      if (fl) { c.fillStyle = `rgba(255,255,255,${fl})`; c.fillRect(0, 0, w, h); }
      const gx = w * .72 + w * .05 * sin(v * TAU), gy = h * .42 + h * .08 * sin(v * TAU * 2), r = h * .22;
      c.beginPath(); c.moveTo(gx - r, gy + r); c.lineTo(gx - r, gy); c.arc(gx, gy, r, Math.PI, 0); c.lineTo(gx + r, gy + r);
      for (let k = 0; k < 4; k++) { const x0 = gx + r - (k + 1) * r / 2; c.quadraticCurveTo(x0 + r / 4, gy + r * (k % 2 ? 1.25 : .7), x0, gy + r); }
      c.fillStyle = 'rgba(255,255,255,.85)'; c.fill();
      oval(c, gx - r * .45, gy - r * .2, r * .28, r * .38, '#000'); oval(c, gx + r * .15, gy - r * .2, r * .28, r * .38, '#000');
      for (let k = 0; k < 3; k++) oval(c, ((v + k / 3) % 1) * w * 1.3 - w * .3, h * (.78 + k * .06), w * .45, h * .14, 'rgba(255,255,255,.12)');
    },
    thriller(c, w, h, v) {
      const mid = h * .45; c.beginPath();
      for (let i = 0; i <= 60; i++) {
        const x = i / 60 * w, ph = ((i / 60) - v + 1) % 1;
        const y = ph > .4 && ph < .44 ? mid - (ph - .4) / .04 * h * .35 : ph >= .44 && ph < .48 ? mid - h * .35 + (ph - .44) / .04 * h * .55 : ph >= .48 && ph < .52 ? mid + h * .2 - (ph - .48) / .04 * h * .2 : mid;
        i ? c.lineTo(x, y) : c.moveTo(x, y);
      }
      c.lineJoin = c.lineCap = 'round'; c.strokeStyle = 'rgba(255,77,77,.25)'; c.lineWidth = 7; c.stroke(); c.strokeStyle = '#FF4D4D'; c.lineWidth = 2.5; c.stroke();
    },
    anime(c, w, h, v, s) {
      for (let i = 0; i < 9; i++) {
        const q = (v + s[i]) % 1, x = w * (s[(i + 2) % 12] + .15 * sin(q * TAU + i)), y = q * h * 1.2 - h * .1;
        c.save(); c.translate(x, y); c.rotate(q * TAU * (i % 2 ? -1 : 1)); oval(c, -5, -3, 10, 6, 'rgba(255,193,218,.9)'); c.restore();
      }
    },
    animation(c, w, h, v) {
      c.globalCompositeOperation = 'screen';
      ['#7CFFCB', '#FFD166', '#4CC9F0'].forEach((col, k) => { const a = v * TAU + k * 2.1; circle(c, w * (.68 + .16 * cos(a)), h * (.42 + .18 * sin(a)), h * (.22 + .07 * sin(a * 2)), rgba(col, .6)); });
      c.globalCompositeOperation = 'source-over';
    },
    family(c, w, h, v) {
      ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF'].forEach((col, i) => {
        const q = (v + i / 4) % 1, x = w * (.45 + .13 * i) + 4 * sin(q * TAU * 2), y = h * 1.2 - q * h * 1.6;
        line(c, x, y + 9, x + 3 * sin(q * TAU * 3), y + 24, 'rgba(255,255,255,.6)', 1.2);
        oval(c, x - 7, y - 9, 14, 18, col); circle(c, x - 3, y - 4, 2, 'rgba(255,255,255,.5)');
      });
    },
    romance(c, w, h, v, s) {
      for (let i = 0; i < 6; i++) { const q = (v + s[i]) % 1; heart(c, w * (.35 + .6 * s[(i + 4) % 12]) + 6 * sin(q * TAU), h * (1.1 - q * 1.2), 7 + 7 * s[(i + 1) % 12], `rgba(255,143,171,${(1 - q) * .95})`); }
    },
    crime(c, w, h, v) {
      const red = v < .5, p = sin((v % .5) / .5 * Math.PI);
      [[.15, '255,45,45', red], [.85, '45,107,255', !red]].forEach(([x, col, on]) => {
        const g = c.createRadialGradient(w * x, 0, 0, w * x, 0, w * .6); g.addColorStop(0, `rgba(${col},${on ? .75 * p : .1})`); g.addColorStop(1, `rgba(${col},0)`);
        c.fillStyle = g; c.fillRect(0, 0, w, h);
      });
    },
    mystery(c, w, h, v) {
      const a = v * TAU, x = w * (.65 + .18 * sin(a)), y = h * (.42 + .15 * sin(a * 2)), r = h * .2;
      circle(c, x, y, r, 'rgba(255,255,255,.18)'); ring(c, x, y, r, '#fff', 3);
      c.beginPath(); c.arc(x, y, r * .7, 3.49, 4.54); c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 2; c.stroke();
      line(c, x + r * .7, y + r * .7, x + r * 1.5, y + r * 1.5, '#fff', 5);
    },
    fantasy(c, w, h, v, s) {
      const mx = w * .8, my = h * .32, mr = h * .18;
      circle(c, mx, my, mr, '#FFF4C2'); circle(c, mx + mr * .45, my - mr * .2, mr, 'rgba(34,3,58,.85)');
      for (let i = 0; i < 7; i++) { const t = (sin((v + s[i]) * TAU * 2) + 1) / 2; sparkle(c, w * (.3 + .65 * s[(i + 3) % 12]), h * (.1 + .7 * s[(i + 6) % 12]), 2 + 5 * t, `rgba(255,255,255,${.3 + .7 * t})`); }
    },
    documentary(c, w, h, v) {
      const x = w * .75, y = h * .45, r = h * .3;
      circle(c, x, y, r, 'rgba(127,224,212,.25)'); ring(c, x, y, r, 'rgba(255,255,255,.8)', 1.8);
      for (let k = 0; k < 4; k++) { const wd = abs(cos(((v + k / 4) % 1) * Math.PI)) * r; oval(c, x - wd, y - r, wd * 2, r * 2, 'rgba(255,255,255,.55)', 1.2); }
      [-.5, 0, .5].forEach(f => { const yy = y + f * r, hf = Math.sqrt(1 - f * f) * r; line(c, x - hf, yy, x + hf, yy, 'rgba(255,255,255,.5)', 1.2); });
    },
    war(c, w, h, v, s) {
      [[.3, 1], [.8, -1]].forEach(([x, d]) => {
        c.save(); c.translate(w * x, h); c.rotate((d * 30 * sin(v * TAU) + d * 10) * Math.PI / 180);
        const g = c.createLinearGradient(0, -h, 0, 0); g.addColorStop(0, 'rgba(255,246,213,.45)'); g.addColorStop(1, 'rgba(255,246,213,0)');
        c.beginPath(); c.moveTo(-3, 0); c.lineTo(3, 0); c.lineTo(18, -h - 10); c.lineTo(-18, -h - 10); c.fillStyle = g; c.fill(); c.restore();
      });
      for (let i = 0; i < 6; i++) { const q = (v * 1.5 + s[i]) % 1; circle(c, w * s[(i + 7) % 12], h * (1 - q), 1.6, `rgba(255,179,71,${1 - q})`); }
    },
    history(c, w, h, v) {
      const x = w * .76, y = h * .45, hh = h * .32, hw = hh * .65, flip = v > .88, rot = flip ? (v - .88) / .12 * Math.PI : 0, fill = flip ? 1 : v / .88;
      c.save(); c.translate(x, y); c.rotate(rot);
      c.beginPath(); c.moveTo(-hw, -hh); c.lineTo(hw, -hh); c.lineTo(-hw, hh); c.lineTo(hw, hh); c.closePath(); c.fillStyle = 'rgba(255,255,255,.18)'; c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 2; c.stroke();
      const top = (1 - fill) * hh * .85;
      if (top > 1) { c.beginPath(); c.moveTo(-hw * top / hh, -top); c.lineTo(hw * top / hh, -top); c.lineTo(0, 0); c.fillStyle = '#FFC46B'; c.fill(); }
      const bot = fill * hh * .85;
      c.beginPath(); c.moveTo(-hw, hh); c.lineTo(hw, hh); c.lineTo(hw * (1 - bot / hh), hh - bot); c.lineTo(-hw * (1 - bot / hh), hh - bot); c.fillStyle = '#FFC46B'; c.fill();
      if (!flip) line(c, 0, 0, 0, hh - bot, '#FFC46B', 1.5);
      c.restore();
    },
    western(c, w, h, v) {
      const g = c.createRadialGradient(w * .8, h * .55, 0, w * .8, h * .55, h * .45); g.addColorStop(0, '#FFD27F'); g.addColorStop(1, 'rgba(255,140,66,0)');
      circle(c, w * .8, h * .55, h * .45, g); circle(c, w * .8, h * .6, h * .18, '#FFB347');
      c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(0, h * .78, w, h * .22);
      const x = v * w * 1.3 - w * .15, r = h * .12, y = h * .78 - r - abs(sin(v * TAU * 3)) * h * .1;
      c.save(); c.translate(x, y); c.rotate(v * TAU * 3);
      ring(c, 0, 0, r, '#C8A26B', 1.5); oval(c, -r, -r * .5, r * 2, r, '#C8A26B', 1.5);
      for (let k = 0; k < 4; k++) { c.rotate(Math.PI / 4); line(c, -r, 0, r, 0, '#C8A26B', 1.5); }
      c.restore();
    },
    music(c, w, h, v) {
      const bw = w * .05;
      for (let i = 0; i < 6; i++) { const hg = h * (.2 + .45 * abs(sin((v + i * .17) * TAU))); c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); (c.roundRect ? c.roundRect(w * .52 + i * bw * 1.6, h * .85 - hg, bw, hg, bw / 2) : c.rect(w * .52 + i * bw * 1.6, h * .85 - hg, bw, hg)); c.fill(); }
      const ny = h * (.35 - .1 * sin(v * TAU)), nx = w * .42; oval(c, nx - 6, ny + 8, 9, 7, '#fff'); line(c, nx + 2.5, ny + 11, nx + 2.5, ny - 6, '#fff', 2);
    },
    reality(c, w, h, v) {
      const m = 6, l = h * .2;
      [[m, m, 1, 1], [w - m, m, -1, 1], [m, h - m, 1, -1], [w - m, h - m, -1, -1]].forEach(([x, y, dx, dy]) => { line(c, x, y, x + l * dx, y, 'rgba(255,255,255,.8)', 2); line(c, x, y, x, y + l * dy, 'rgba(255,255,255,.8)', 2); });
      if (v < .6) circle(c, w - m - h * .25, m + h * .2, h * .07, '#FF3B30');
    },
    kids(c, w, h, v) {
      ['#FF6B6B', '#FFD93D', '#6BCB77'].forEach((col, i) => { const hop = abs(sin((v + i * .22) * Math.PI * 2)), r = h * .12; circle(c, w * (.55 + i * .15), h * .85 - r - hop * h * .45, r, col); });
    },
  };

  function frame(now) {
    for (const it of items) {
      if (!it.canvas.isConnected) { items.delete(it); continue; }
      if (io && !visible.has(it.canvas)) continue;
      const { canvas: cv } = it, dpr = Math.min(devicePixelRatio || 1, 2);
      const w = cv.clientWidth, h = cv.clientHeight;
      if (!w || !h) continue;
      if (cv.width !== Math.round(w * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
      const c = it.ctx; c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, w, h);
      const v = reduce ? .3 : (((now + it.offset) % it.period) / it.period);
      try { S[it.key](c, w, h, v, it.seeds); } catch (e) { /* never break the loop */ }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  window.GenreScenes = {
    has: key => key in S,
    attach(canvas, key, index = 0) {
      if (!(key in S)) return;
      items.add({ canvas, key, ctx: canvas.getContext('2d'), period: PERIOD[key] || 3200, offset: index * 170, seeds: seeds(key) });
      io && io.observe(canvas);
    },
  };
})();
