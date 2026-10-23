/* Lumio web — iPhone-first web app (installable from Safari → Share → Add to Home Screen). */
'use strict';

// ============================================================================ config
const BUILT_IN_TMDB_KEY = 'a8c6c52b1e7ddcbb0a52c745d1712b82';
const IMG = 'https://image.tmdb.org/t/p/';
const BUILT_IN_ADDONS = [
  { url: 'https://catalog.nuvio.tv/manifest.json', name: 'Nuvio Catalogs', resources: ['catalog'], builtIn: true },
  { url: 'https://v3-cinemeta.strem.io/manifest.json', name: 'Cinemeta', resources: ['catalog', 'meta'], builtIn: true },
  { url: 'https://subdl.strem.top/c3ViZGxfM1ZZYVFfcUVoa2d1a0hOZlBlSXBDTFVHNWczS0NfRTF1bFBJMzI2M2lOQS9BUi9oaUV4Y2x1ZGUv/manifest.json', name: 'SubDL Subtitles', resources: ['subtitles'], builtIn: true },
];
const ACCENTS = [
  ['violet', 'Violet', '#7C5CFF'], ['ocean', 'Ocean', '#2D8CFF'], ['emerald', 'Emerald', '#10B981'], ['ruby', 'Ruby', '#FF3B5C'],
  ['sunset', 'Sunset', '#FF7A1A'], ['gold', 'Gold', '#F5B700'], ['sakura', 'Sakura', '#FF5FA8'],
];
const SERVICES = [
  ['netflix', 'Netflix', ['netflix'], 8, '#E50914', '#5A0408', 'heartbeat'],
  ['disney', 'Disney+', ['disney plus', 'disney+'], 337, '#1B3FD1', '#0A1A5C', 'orbit'],
  ['prime', 'Prime Video', ['amazon prime video', 'prime video'], 9, '#00A8E1', '#0B2B45', 'shine'],
  ['apple', 'Apple TV+', ['apple tv plus', 'apple tv+'], 350, '#8E8E93', '#1C1C1E', 'flip'],
  ['max', 'HBO Max', ['max', 'hbo max'], 1899, '#7B2FF7', '#1A0B4A', 'ripple'],
  ['hulu', 'Hulu', ['hulu'], 15, '#1CE783', '#0B4A2C', 'swing'],
  ['paramount', 'Paramount+', ['paramount plus', 'paramount+', 'paramount plus premium'], 531, '#0064FF', '#001E5C', 'tilt'],
  ['peacock', 'Peacock', ['peacock premium', 'peacock'], 386, '#FFB800', '#3A2A00', 'jelly'],
  ['crunchyroll', 'Crunchyroll', ['crunchyroll'], 283, '#F47521', '#4A1E05', 'bounce'],
  ['starz', 'Starz', ['starz'], 43, '#2D2D2D', '#000000', 'shine'],
  ['amc', 'AMC+', ['amc+', 'amc plus'], 526, '#00B2FF', '#002B40', 'ripple'],
  ['mgm', 'MGM+', ['mgm+', 'mgm plus'], 34, '#C8A24B', '#3A2C0C', 'flip'],
  ['discovery', 'Discovery+', ['discovery+', 'discovery plus'], 520, '#1A73E8', '#051C40', 'orbit'],
  ['shahid', 'Shahid', ['shahid vip', 'shahid'], 1715, '#00C29A', '#003A2E', 'swing'],
  ['osn', 'OSN+', ['osn+', 'osn plus'], 629, '#E2007A', '#420024', 'heartbeat'],
].map(([key, name, aliases, id, c1, c2, motion]) => ({ key, name, aliases, ids: String(id), c1, c2, motion, logo: null }));
const GENRES = [
  ['action', 'Action', 'with_genres=28', 'with_genres=10759', '#FF5A36', '#6B1300'],
  ['adventure', 'Adventure', 'with_genres=12', 'with_genres=10759', '#FFA62B', '#5C3300'],
  ['comedy', 'Comedy', 'with_genres=35', 'with_genres=35', '#FFD43B', '#5C4A00'],
  ['drama', 'Drama', 'with_genres=18', 'with_genres=18', '#9B5DE5', '#2E0E5C'],
  ['scifi', 'Sci-Fi', 'with_genres=878', 'with_genres=10765', '#00BBF9', '#003A52'],
  ['horror', 'Horror', 'with_genres=27', null, '#8B0000', '#1A0000'],
  ['thriller', 'Thriller', 'with_genres=53', 'with_genres=80|9648', '#4A4E69', '#101222'],
  ['anime', 'Anime', 'with_genres=16&with_original_language=ja', 'with_genres=16&with_original_language=ja', '#FF70A6', '#5C0F30'],
  ['animation', 'Animation', 'with_genres=16', 'with_genres=16', '#06D6A0', '#004D3A'],
  ['family', 'Family', 'with_genres=10751', 'with_genres=10751', '#52B788', '#143D28'],
  ['romance', 'Romance', 'with_genres=10749', null, '#FF4D6D', '#5C0A1A'],
  ['crime', 'Crime', 'with_genres=80', 'with_genres=80', '#6C757D', '#1E2124'],
  ['mystery', 'Mystery', 'with_genres=9648', 'with_genres=9648', '#3A86FF', '#0A2252'],
  ['fantasy', 'Fantasy', 'with_genres=14', 'with_genres=10765', '#7209B7', '#22033A'],
  ['documentary', 'Documentary', 'with_genres=99', 'with_genres=99', '#2A9D8F', '#0A2E2A'],
  ['war', 'War', 'with_genres=10752', 'with_genres=10768', '#606C38', '#1C2010'],
  ['history', 'History', 'with_genres=36', null, '#BC6C25', '#3A1E05'],
  ['western', 'Western', 'with_genres=37', 'with_genres=37', '#D4A373', '#3D2A14'],
  ['music', 'Music', 'with_genres=10402', null, '#F72585', '#4A0325'],
  ['reality', 'Reality', null, 'with_genres=10764', '#FB8500', '#4A2700'],
  ['kids', 'Kids', null, 'with_genres=10762', '#8ECAE6', '#1B3A4A'],
].map(([key, name, mq, tq, c1, c2]) => ({ key, name, mq, tq, c1, c2 }));
const DISCOVER = [
  { key: 'foryou', name: 'For You', sub: 'Picked from what you watch', emoji: '✨', c1: '#7C5CFF', c2: '#241466' },
  { key: 'trending', name: 'Trending', sub: 'Hot this week', emoji: '🔥', c1: '#FF6B35', c2: '#5C1A00' },
  { key: 'popular', name: 'Most Popular', sub: "What everyone's watching", emoji: '⭐', c1: '#FFC300', c2: '#5C4600' },
  { key: 'top_rated', name: 'Top Rated', sub: 'All-time best', emoji: '🏆', c1: '#2EC4B6', c2: '#0A403B' },
];
const SORTS = [['popular', 'Popular', 'popularity.desc', 'popularity.desc'], ['top', 'Top Rated', 'vote_average.desc', 'vote_average.desc'], ['new', 'Newest', 'primary_release_date.desc', 'first_air_date.desc']];

// ============================================================================ icons
const P = {
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  search: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  library: 'M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z',
  settings: 'M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z',
  play: 'M8 5v14l11-7z', pause: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z',
  back: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
  bookmark: 'M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z',
  bookmarkO: 'M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z',
  subs: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h4v2H4v-2zm10 6H4v-2h10v2zm6 0h-4v-2h4v2zm0-4H10v-2h10v2z',
  audio: 'M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z',
  speed: 'M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z',
  pip: 'M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z',
  airplay: 'M6 22h12l-6-6zM21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V5h18v12h-4v2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
  full: 'M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z',
  rew: 'M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z',
  fwd: 'M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z',
  close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  check: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  link: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z',
  folder: 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z',
  eyeOff: 'M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z',
  info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
  ffwd: 'M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z', next: 'M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z',
  playC: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z',
  palette: 'M12 3a9 9 0 0 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  ext: 'M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5a2.5 2.5 0 0 0 0-5z',
  del: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
  movie: 'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z',
  flag: 'M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z',
  aspect: 'M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z',
  phone: 'M15.5 1h-8A2.5 2.5 0 0 0 5 3.5v17A2.5 2.5 0 0 0 7.5 23h8a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z',
  open: 'M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z',
};
const ic = (name, extra = '') => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" ${extra}><path d="${P[name]}"/></svg>`;
const ic10 = name => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${P[name]}"/><text x="12" y="16.3" text-anchor="middle" font-size="6.5" font-weight="700" fill="currentColor">10</text></svg>`;

// ============================================================================ storage
const store = {
  get(k, d) { try { const v = localStorage.getItem('lumio.' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('lumio.' + k, JSON.stringify(v)); } catch { /* storage full or blocked */ } },
};
const DEFAULT_SETTINGS = {
  tmdbKey: '', region: 'US', accent: 'violet', customAccent: '#7C5CFF', amoled: false,
  skipIntro: 'button', skipRecap: 'button', skipCredits: 'button', skipNudity: false,
  subLang: 'en', subScale: 1, subBg: true, autoNext: true, addons: null,
};
let S = Object.assign({}, DEFAULT_SETTINGS, store.get('settings', {}));
if (!S.addons) S.addons = BUILT_IN_ADDONS.slice();
const saveSettings = () => { store.set('settings', S); applyTheme(); };
let LIB = store.get('library', []);
const saveLib = () => store.set('library', LIB.slice(0, 500));
const libEntry = (type, id) => LIB.find(e => e.type === type && e.id === id);
function updateLib(type, id, fn) {
  const i = LIB.findIndex(e => e.type === type && e.id === id);
  const cur = i >= 0 ? LIB[i] : null;
  const next = fn(cur);
  if (i >= 0) LIB.splice(i, 1);
  if (next) LIB.unshift(Object.assign(next, { updatedAt: Date.now() }));
  saveLib();
}
const isContinue = e => e && e.pos > 30000 && e.dur > 0 && e.pos / e.dur < .95;
const progressOf = e => e && e.dur > 0 ? Math.min(1, e.pos / e.dur) : 0;

function applyTheme() {
  const a = ACCENTS.find(x => x[0] === S.accent);
  document.documentElement.style.setProperty('--accent', a ? a[2] : S.customAccent);
  document.documentElement.classList.toggle('amoled', !!S.amoled);
  const bg = S.amoled ? '#000000' : '#0B0B0F';
  document.querySelector('meta[name=theme-color]').setAttribute('content', bg);
  let cue = document.getElementById('cue-style');
  if (!cue) { cue = document.createElement('style'); cue.id = 'cue-style'; document.head.appendChild(cue); }
  cue.textContent = `::cue { font-size: ${Math.round(S.subScale * 100)}%; }`;
}

// ============================================================================ helpers
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const yearOf = x => (x.release_date || x.first_air_date || '').slice(0, 4);
const titleOf = x => x.title || x.name || '';
const fmt = ms => { const t = Math.max(0, Math.floor(ms / 1000)), h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60), s = t % 60; return h ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`; };
const langName = c => { if (!c || c === 'und') return null; try { return new Intl.DisplayNames(['en'], { type: 'language' }).of(c) || c; } catch { return c; } };
let toastTimer;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200); }

async function getJSON(url, timeout = 15000) {
  const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), timeout);
  try { const r = await fetch(url, { signal: ctl.signal }); if (!r.ok) throw new Error('HTTP ' + r.status); return await r.json(); }
  finally { clearTimeout(tm); }
}
const cache = new Map();
function tmdb(path) {
  const key = (S.tmdbKey || '').trim() || BUILT_IN_TMDB_KEY;
  const url = `https://api.themoviedb.org/3/${path}${path.includes('?') ? '&' : '?'}api_key=${key}&language=en-US`;
  if (!cache.has(url)) cache.set(url, getJSON(url).catch(e => { cache.delete(url); throw e; }));
  return cache.get(url);
}
const typed = (list, type) => (list || []).map(x => Object.assign(x, { media_type: x.media_type || type })).filter(x => x.media_type === 'movie' || x.media_type === 'tv');
const api = {
  trending: (type = 'all', win = 'week', page = 1) => tmdb(`trending/${type}/${win}?page=${page}`).then(r => typed(r.results, type)),
  list: (type, kind, page = 1) => tmdb(`${type}/${kind}?page=${page}`).then(r => typed(r.results, type)),
  search: q => tmdb(`search/multi?query=${encodeURIComponent(q)}&include_adult=false`).then(r => typed(r.results)),
  details: (type, id) => tmdb(`${type}/${id}?append_to_response=external_ids,credits`),
  season: (id, n) => tmdb(`tv/${id}/season/${n}`).then(r => r.episodes || []),
  recs: (type, id) => tmdb(`${type}/${id}/recommendations`).then(r => typed(r.results, type)).catch(() => []),
  discover(type, query, sort, page) {
    const region = S.region || 'US';
    let extra = sort.startsWith('vote_average') ? '&vote_count.gte=300' : '';
    if (sort.startsWith('primary_release_date') || sort.startsWith('first_air_date')) extra += `&${type === 'movie' ? 'primary_release_date' : 'first_air_date'}.lte=${new Date().toISOString().slice(0, 10)}`;
    return tmdb(`discover/${type}?sort_by=${sort}&page=${page}&watch_region=${region}&include_adult=false${extra}&${query}`).then(r => typed(r.results, type));
  },
};

// Streaming services: resolve real ids & logos for the region
let servicesReady = null;
function loadServices() {
  if (servicesReady) return servicesReady;
  servicesReady = Promise.all(['movie', 'tv'].map(t => tmdb(`watch/providers/${t}?watch_region=${S.region || 'US'}`).then(r => r.results || []).catch(() => [])))
    .then(([a, b]) => {
      const all = [...a, ...b];
      if (!all.length) return SERVICES;
      return SERVICES.map(s => {
        const m = all.filter(p => s.aliases.includes(String(p.provider_name).toLowerCase()));
        if (!m.length) return null;
        return Object.assign({}, s, { ids: [...new Set(m.map(p => p.provider_id))].join('|'), logo: m[0].logo_path });
      }).filter(Boolean);
    });
  return servicesReady;
}

// Addons (Stremio protocol)
const addonBase = a => a.url.replace(/\/manifest\.json$/, '').replace(/\/$/, '');
const supports = (a, r) => !a.resources || !a.resources.length || a.resources.includes(r);
async function fetchManifest(url) {
  let clean = url.trim().replace(/^stremio:\/\//, 'https://');
  if (!clean.endsWith('manifest.json')) clean = clean.replace(/\/$/, '') + '/manifest.json';
  const m = await getJSON(clean);
  const resources = (m.resources || []).map(r => typeof r === 'string' ? r : r && r.name).filter(Boolean);
  return { url: clean, name: m.name || 'Addon', resources };
}
const quality = s => { s = s.toUpperCase(); return /2160|4K|UHD/.test(s) ? '4K' : /1080/.test(s) ? '1080p' : /720/.test(s) ? '720p' : ''; };
const hdr = s => { s = s.toUpperCase(); return /DOLBY VISION|\bDV\b|DOVI/.test(s) ? 'Dolby Vision' : /HDR10\+/.test(s) ? 'HDR10+' : /HDR/.test(s) ? 'HDR' : ''; };
async function getStreams(type, imdb, season, episode) {
  const st = type === 'tv' ? 'series' : 'movie';
  const id = season != null ? `${imdb}:${season}:${episode}` : imdb;
  const lists = await Promise.all(S.addons.filter(a => supports(a, 'stream')).map(a =>
    getJSON(`${addonBase(a)}/stream/${st}/${id}.json`).then(r => (r.streams || []).filter(x => x.url).map(x => {
      const label = (x.name || a.name).replace(/\n/g, ' '), details = [x.title, x.description].filter(Boolean).join('\n');
      return { addon: a.name, label, details, url: x.url, q: quality(label + ' ' + details), h: hdr(label + ' ' + details) };
    })).catch(() => [])));
  const rank = s => ({ '4K': 0, '1080p': 1, '720p': 2 }[s.q] ?? 3) * 10 + ({ 'Dolby Vision': 0, 'HDR10+': 1, HDR: 2 }[s.h] ?? 3);
  return lists.flat().sort((a, b) => rank(a) - rank(b));
}
async function getSubtitles(type, imdb, season, episode) {
  const st = type === 'tv' ? 'series' : 'movie';
  const id = season != null ? `${imdb}:${season}:${episode}` : imdb;
  const lists = await Promise.all(S.addons.filter(a => supports(a, 'subtitles')).map(a =>
    getJSON(`${addonBase(a)}/subtitles/${st}/${id}.json`, 10000).then(r => r.subtitles || []).catch(() => [])));
  const seen = new Set();
  return lists.flat().filter(s => s.url && !seen.has(s.url) && seen.add(s.url));
}
async function introSegments(type, id, season, episode, durMs) {
  let q = `tmdb_id=${id}`;
  if (type === 'tv' && season != null) q += `&season=${season}&episode=${episode}`;
  if (durMs > 0) q += `&duration_ms=${Math.round(durMs)}`;
  try {
    const r = await getJSON(`https://api.theintrodb.org/v4/media?${q}`, 10000);
    const out = [];
    for (const k of ['recap', 'intro', 'credits', 'preview']) (r[k] || []).forEach(t => {
      const start = t.start_ms ?? ((k === 'intro' || k === 'recap') ? 0 : null);
      if (start == null || (t.end_ms == null && k !== 'credits' && k !== 'preview')) return;
      out.push({ kind: k, start, end: t.end_ms ?? null, source: 'TheIntroDB' });
    });
    return out;
  } catch { return []; }
}

// ============================================================================ views: shared pieces
function img(src, alt = '') { return src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" onload="this.classList.add('ok')">` : ''; }
function posterCard(x, i = 0, prog) {
  const t = x.media_type || 'movie';
  return `<a class="poster fly" style="animation-delay:${Math.min(i, 12) * 28}ms" href="#/details/${t}/${x.id}">
    <div class="art">${img(x.poster_path && IMG + 'w342' + x.poster_path, titleOf(x))}
      ${x.vote_average ? `<span class="rate"><b>★</b> ${x.vote_average.toFixed(1)}</span>` : ''}
      ${prog ? `<span class="prog"><i style="width:${prog * 100}%"></i></span>` : ''}</div>
    <div class="t">${esc(titleOf(x))}</div>${yearOf(x) ? `<div class="y">${yearOf(x)}</div>` : ''}</a>`;
}
const rail = (title, items, progress) => items && items.length ? `<div class="rail-title gutter">${esc(title)}</div><div class="rail gutter">${items.map((x, i) => posterCard(x, i, progress && progress(x))).join('')}</div>` : '';
const sectionH = (t, sub) => `<div class="section-h gutter"><div><h2>${esc(t)}</h2><div class="bar"></div>${sub ? `<p>${esc(sub)}</p>` : ''}</div></div>`;
const skeletonRows = () => Array.from({ length: 3 }, () => `<div class="gutter" style="padding-top:22px"><div class="sk" style="width:140px;height:18px;margin-bottom:10px"></div><div style="display:flex;gap:12px;overflow:hidden">${Array.from({ length: 6 }, () => '<div class="sk" style="flex:0 0 var(--poster);aspect-ratio:2/3"></div>').join('')}</div></div>`).join('');
const msg = (h, p, action = '') => `<div class="msg"><h3>${esc(h)}</h3><p>${esc(p)}</p>${action}</div>`;
const logoHTML = (s, i, size) => s.logo ? `<span class="logo m-${s.motion}" style="--c1:${s.c1};--d:${(i % 5) * .45}s;animation-delay:${100 + i * 60}ms${size ? `;width:${size}px;height:${size}px;border-radius:${size * .25}px` : ''}"><img src="${IMG}w154${s.logo}" alt=""><span class="sheen"></span></span>` : '';
const tileStyle = (c1, c2, i) => `--c1:${c1};--c2:${c2};--ang:${120 + (i * 37) % 120}deg;animation-delay:${i * 45}ms,0s`;

function discoverSections() {
  return `${sectionH('Discover', 'Curated lists, updated daily')}
  <div class="rail gutter">${DISCOVER.map((d, i) => `<a class="tile discover" href="#/catalog/discover/${d.key}" style="${tileStyle(d.c1, d.c2, i)}"><span class="emoji" style="animation-delay:${i * .3}s">${d.emoji}</span><span class="lbl"><b>${esc(d.name)}</b><small>${esc(d.sub)}</small></span></a>`).join('')}</div>
  ${sectionH('Streaming Services', 'Browse every catalog')}
  <div class="rail gutter" id="services-rail">${servicesHTML(SERVICES.filter(s => s.logo))}</div>
  ${sectionH('Genres', 'Something for every mood')}
  <div class="rail gutter">${GENRES.map((g, i) => `<a class="tile genre" href="#/catalog/genre/${g.key}" style="${tileStyle(g.c1, g.c2, i)}"><canvas data-scene="${g.key}" data-i="${i}"></canvas><span class="lbl"><b>${esc(g.name)}</b></span></a>`).join('')}</div>`;
}
const servicesHTML = list => list.map((s, i) => `<a class="tile service" href="#/catalog/service/${s.key}" style="${tileStyle(s.c1, s.c2, i)}">${logoHTML(s, i)}<b>${esc(s.name)}</b></a>`).join('');
function mountDiscover(root) {
  root.querySelectorAll('canvas[data-scene]').forEach(c => window.GenreScenes && GenreScenes.attach(c, c.dataset.scene, +c.dataset.i));
  loadServices().then(list => { const r = $('#services-rail', root); if (r) r.innerHTML = servicesHTML(list); });
}

// ============================================================================ router
const view = $('#view');
let routeToken = 0;
const TABS = [['home', 'Home', 'home'], ['search', 'Search', 'search'], ['library', 'Library', 'library'], ['settings', 'Settings', 'settings']];
const scrollMemo = {};
function renderNav(active) {
  const nav = $('#nav');
  nav.innerHTML = TABS.map(([k, l, i]) => `<a class="nav-item ${k === active ? 'on' : ''}" href="#/${k}" aria-label="${l}">${ic(i)}<span class="lbl">${l}</span></a>`).join('');
  nav.classList.toggle('hidden', !active);
  view.classList.toggle('no-nav', !active);
}
let lastHash = '';
async function route() {
  const hash = location.hash || '#/home';
  scrollMemo[lastHash] = scrollY; lastHash = hash;
  const [, name = 'home', ...args] = hash.slice(1).split('/');
  if (name !== 'play') closePlayer(true);
  const token = ++routeToken;
  const tab = TABS.some(t => t[0] === name) ? name : null;
  renderNav(tab);
  view.classList.remove('view-enter'); void view.offsetWidth; view.classList.add('view-enter');
  closeSheet();
  try {
    switch (name) {
      case 'home': await homeView(token); break;
      case 'search': searchView(); break;
      case 'library': libraryView(args[0]); break;
      case 'settings': settingsView(); break;
      case 'catalog': catalogView(args[0], args[1], token); break;
      case 'details': await detailsView(args[0], +args[1], token); break;
      case 'streams': await streamsView(args[0], +args[1], args[2] === '-' ? null : +args[2], args[3] === '-' ? null : +args[3], token); break;
      case 'play': if (!PLAYER.req) { location.replace('#/home'); return; } break;
      default: location.replace('#/home'); return;
    }
  } catch (e) {
    if (token === routeToken) view.innerHTML = msg("Couldn't load", e.message || 'Network error', '<button class="btn acc" onclick="route()">Retry</button>');
  }
  requestAnimationFrame(() => window.scrollTo(0, scrollMemo[hash] || 0));
}
window.addEventListener('hashchange', route);

// ============================================================================ home
async function homeView(token) {
  view.innerHTML = `<div class="sk" style="height:min(560px,78vh);border-radius:0"></div>${skeletonRows()}`;
  const [trend, popM, popT, now, air, topM, topT] = await Promise.all([
    api.trending(), api.list('movie', 'popular'), api.list('tv', 'popular'), api.list('movie', 'now_playing'),
    api.list('tv', 'on_the_air'), api.list('movie', 'top_rated'), api.list('tv', 'top_rated')]);
  if (token !== routeToken) return;
  const hero = trend.filter(x => x.backdrop_path).slice(0, 8);
  const cont = LIB.filter(isContinue).map(e => ({ id: e.id, media_type: e.type, title: e.title, poster_path: e.poster }));
  const wide = innerWidth >= 700;
  view.innerHTML = `
    <section class="hero">
      <div class="hero-track" id="hero-track">${hero.map(x => `<div class="hero-slide">${img(wide ? IMG + 'w1280' + x.backdrop_path : IMG + 'w780' + (x.poster_path || x.backdrop_path), titleOf(x))}</div>`).join('')}</div>
      <div class="hero-info gutter" id="hero-info"></div>
    </section>
    ${rail('Continue Watching', cont, x => progressOf(libEntry(x.media_type, x.id)))}
    ${discoverSections()}
    ${rail('Trending This Week', trend)}${rail('Popular Movies', popM)}${rail('Popular Shows', popT)}
    ${rail('In Theaters', now)}${rail('Airing Now', air)}${rail('Top Rated Movies', topM)}${rail('Top Rated Shows', topT)}`;
  mountDiscover(view);
  // hero carousel
  const track = $('#hero-track'), info = $('#hero-info');
  let idx = -1;
  const show = i => {
    if (i === idx || !hero[i]) return; idx = i; const x = hero[i];
    info.innerHTML = `<h1>${esc(titleOf(x))}</h1><div class="meta"><span class="badge acc">${x.media_type === 'tv' ? 'SERIES' : 'MOVIE'}</span>${yearOf(x) ? `<span>${yearOf(x)}</span>` : ''}${x.vote_average ? `<span>★ ${x.vote_average.toFixed(1)}</span>` : ''}</div>
      ${wide ? `<p class="dim" style="margin:0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">${esc(x.overview)}</p>` : ''}
      <div class="row-btns" style="justify-content:${wide ? 'flex-start' : 'center'}"><a class="btn white" href="#/details/${x.media_type}/${x.id}">${ic('play')}Play</a><a class="btn tonal" href="#/details/${x.media_type}/${x.id}">${ic('info')}Details</a></div>
      <div class="dots">${hero.map((_, j) => `<i class="${j === i ? 'on' : ''}"></i>`).join('')}</div>`;
    info.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 350, easing: 'ease-out' });
  };
  show(0);
  track.addEventListener('scroll', () => show(Math.round(track.scrollLeft / track.clientWidth)), { passive: true });
  const timer = setInterval(() => {
    if (!track.isConnected) return clearInterval(timer);
    if (document.hidden) return;
    track.scrollTo({ left: ((idx + 1) % hero.length) * track.clientWidth, behavior: 'smooth' });
  }, 7000);
}

// ============================================================================ search
function searchView() {
  view.innerHTML = `<div class="search gutter"><label>${ic('search')}<input id="q" type="search" placeholder="Search movies & shows" autocomplete="off" enterkeyhint="search"></label></div><div id="results"></div>`;
  const input = $('#q'), out = $('#results');
  const empty = () => { out.innerHTML = discoverSections(); mountDiscover(out); };
  empty();
  let t, n = 0;
  input.addEventListener('input', () => {
    clearTimeout(t);
    const q = input.value.trim();
    if (q.length < 2) { empty(); return; }
    t = setTimeout(async () => {
      const my = ++n;
      out.innerHTML = `<div class="gutter" style="padding-top:12px"><div class="grid">${Array.from({ length: 9 }, () => '<div class="sk" style="aspect-ratio:2/3"></div>').join('')}</div></div>`;
      const res = await api.search(q).catch(() => []);
      if (my !== n) return;
      out.innerHTML = res.length ? `<div class="gutter" style="padding-top:12px"><div class="grid">${res.map(posterCard).join('')}</div></div>` : msg('No results', 'Try a different title.');
    }, 300);
  });
}

// ============================================================================ library
function libraryView(tab = 'watchlist') {
  const tabs = [['watchlist', 'Watchlist'], ['continue', 'Continue Watching'], ['history', 'History']];
  const list = tab === 'continue' ? LIB.filter(isContinue) : tab === 'history' ? LIB.filter(e => e.pos > 0) : LIB.filter(e => e.watch);
  view.innerHTML = `<h1 class="page-title gutter">Library</h1>
    <div class="chips gutter">${tabs.map(([k, l]) => `<a class="chip ${k === tab ? 'on' : ''}" style="display:grid;place-items:center" href="#/library/${k}">${l}</a>`).join('')}</div>
    ${list.length ? `<div class="gutter" style="padding-top:12px"><div class="grid">${list.map((e, i) => posterCard({ id: e.id, media_type: e.type, title: e.title, poster_path: e.poster }, i, tab === 'watchlist' ? 0 : progressOf(e))).join('')}</div></div>`
      : msg('Nothing here yet', tab === 'watchlist' ? 'Tap the bookmark on any title to save it.' : 'Start watching something!')}`;
}

// ============================================================================ catalog
function catalogInfo(kind, key) {
  if (kind === 'discover') { const d = DISCOVER.find(x => x.key === key); return d && { title: d.name, sub: d.sub, emoji: d.emoji, c1: d.c1, c2: d.c2, mq: '', tq: key === 'foryou' ? null : '', sortable: false }; }
  if (kind === 'service') { const s = SERVICES.find(x => x.key === key); return s && { title: s.name, sub: `Streaming now on ${s.name}`, service: s, c1: s.c1, c2: s.c2, sortable: true }; }
  const g = GENRES.find(x => x.key === key); return g && { title: g.name, sub: `The best ${g.name.toLowerCase()} titles`, genre: g.key, c1: g.c1, c2: g.c2, mq: g.mq, tq: g.tq, sortable: true };
}
async function catalogView(kind, key, token) {
  const info = catalogInfo(kind, key);
  if (!info) { location.replace('#/home'); return; }
  if (info.service) {
    const list = await loadServices(); const s = list.find(x => x.key === key) || info.service;
    const q = `with_watch_providers=${s.ids}&with_watch_monetization_types=flatrate`;
    Object.assign(info, { service: s, mq: q, tq: q });
  }
  if (token !== routeToken) return;
  const st = { type: info.mq == null ? 'tv' : 'movie', sort: 'popular', page: 0, items: [], loading: false, end: false };
  view.innerHTML = `<a class="icon-btn back" href="javascript:history.back()" aria-label="Back">${ic('back')}</a>
    <div class="banner" style="--c1:${info.c1};--c2:${info.c2}">${info.genre ? `<canvas id="bn-scene"></canvas>` : ''}
      <div class="ttl">${info.service ? logoHTML(info.service, 0, 58) : (!info.genre && info.emoji ? `<span style="font-size:44px" class="emoji-b">${info.emoji}</span>` : '')}
        <div><h1>${esc(info.title)}</h1><p>${esc(info.sub)}</p></div></div></div>
    <div class="gutter">
      ${info.mq != null && info.tq != null ? `<div class="chips" id="types"><button class="chip on" data-t="movie">Movies</button><button class="chip" data-t="tv">Shows</button></div>` : ''}
      ${info.sortable ? `<div class="chips" id="sorts" style="padding-top:2px">${SORTS.map(([k, l], i) => `<button class="chip sm ${i ? '' : 'on'}" data-s="${k}">${l}</button>`).join('')}</div>` : ''}
      <div class="grid" id="cgrid" style="padding-top:12px"></div><div id="cmore" style="height:1px"></div>
    </div>`;
  if (info.genre) GenreScenes.attach($('#bn-scene'), info.genre, 0);
  const grid = $('#cgrid');
  const load = async () => {
    if (st.loading || st.end) return; st.loading = true;
    const page = st.page + 1, myType = st.type, mySort = st.sort;
    if (!st.items.length) grid.innerHTML = Array.from({ length: 12 }, () => '<div class="sk" style="aspect-ratio:2/3"></div>').join('');
    let res = [];
    try {
      const sort = SORTS.find(s => s[0] === mySort);
      if (kind === 'discover') {
        if (key === 'foryou') res = await forYou();
        else if (key === 'trending') res = await api.trending(myType, 'week', page);
        else res = await api.list(myType, key, page);
      } else res = await api.discover(myType, (myType === 'movie' ? info.mq : info.tq) || '', myType === 'movie' ? sort[2] : sort[3], page);
    } catch (e) { res = []; }
    if (myType !== st.type || mySort !== st.sort || !grid.isConnected) return;
    st.loading = false; st.page = page;
    const seen = new Set(st.items.map(x => x.media_type + x.id));
    const fresh = res.filter(x => !seen.has(x.media_type + x.id));
    if (!st.items.length) grid.innerHTML = '';
    st.items.push(...fresh);
    grid.insertAdjacentHTML('beforeend', fresh.map((x, i) => posterCard(x, i)).join(''));
    st.end = !res.length || key === 'foryou' || page >= 40;
    if (!st.items.length) grid.innerHTML = `<div style="grid-column:1/-1">${msg('Nothing here', 'Try another type, sort, or a different region in Settings.')}</div>`;
  };
  const reset = () => { st.page = 0; st.items = []; st.end = false; st.loading = false; grid.innerHTML = ''; load(); };
  view.querySelectorAll('#types .chip').forEach(b => b.onclick = () => { view.querySelectorAll('#types .chip').forEach(x => x.classList.toggle('on', x === b)); st.type = b.dataset.t; reset(); });
  view.querySelectorAll('#sorts .chip').forEach(b => b.onclick = () => { view.querySelectorAll('#sorts .chip').forEach(x => x.classList.toggle('on', x === b)); st.sort = b.dataset.s; reset(); });
  new IntersectionObserver(es => es[0].isIntersecting && load(), { rootMargin: '900px' }).observe($('#cmore'));
  load();
}
async function forYou() {
  const seeds = LIB.slice().sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 6);
  const owned = new Set(LIB.map(e => e.type + e.id));
  const lists = await Promise.all(seeds.map(e => api.recs(e.type, e.id)));
  const mixed = [], seen = new Set();
  for (let i = 0; i < Math.max(0, ...lists.map(l => l.length)); i++) lists.forEach(l => { const x = l[i]; if (x && !seen.has(x.media_type + x.id) && !owned.has(x.media_type + x.id)) { seen.add(x.media_type + x.id); mixed.push(x); } });
  return mixed.length ? mixed : api.trending('all', 'day');
}

// ============================================================================ details
async function detailsView(type, id, token) {
  view.innerHTML = `<div class="sk" style="height:min(560px,72vh);border-radius:0"></div>`;
  const d = await api.details(type, id);
  if (token !== routeToken) return;
  const e = libEntry(type, id), resume = isContinue(e) ? e : null, wide = innerWidth >= 700;
  const seasons = (d.seasons || []).filter(s => s.season_number > 0);
  let season = resume?.season || seasons[0]?.season_number || 1;
  const runtime = d.runtime || (d.episode_run_time || [])[0];
  const playLabel = resume ? (type === 'tv' ? `Resume S${resume.season}E${resume.episode}` : 'Resume') : type === 'tv' ? `Play S${season}E1` : 'Play';
  const playHref = type === 'tv' ? `#/streams/tv/${id}/${resume?.season || season}/${resume?.episode || 1}` : `#/streams/movie/${id}/-/-`;
  view.innerHTML = `<a class="icon-btn back" href="javascript:history.back()" aria-label="Back">${ic('back')}</a>
    <div class="backdrop">${img(d.backdrop_path && IMG + (wide ? 'original' : 'w1280') + d.backdrop_path)}
      <div class="d-info gutter"><div class="pst">${img(d.poster_path && IMG + 'w342' + d.poster_path)}</div>
        <div style="min-width:0;max-width:640px"><h1>${esc(titleOf(d))}</h1>${d.tagline ? `<div class="tag">${esc(d.tagline)}</div>` : ''}
          <div class="meta">${yearOf(d) ? `<span class="badge">${yearOf(d)}</span>` : ''}${d.vote_average ? `<span class="badge">★ ${d.vote_average.toFixed(1)}</span>` : ''}${runtime ? `<span class="badge">${Math.floor(runtime / 60) ? Math.floor(runtime / 60) + 'h ' : ''}${runtime % 60}m</span>` : ''}${type === 'tv' ? `<span class="badge">${seasons.length} Seasons</span>` : ''}</div>
          <div class="genres">${esc((d.genres || []).map(g => g.name).join(' • '))}</div>
          <div class="row-btns"><a class="btn white" href="${playHref}">${ic('play')}${esc(playLabel)}</a>
          <button class="icon-btn" id="wl" style="background:rgba(255,255,255,.14)" aria-label="Watchlist">${ic(e?.watch ? 'bookmark' : 'bookmarkO')}</button></div>
        </div></div></div>
    <p class="overview gutter">${esc(d.overview)}</p>
    ${type === 'tv' ? `<div class="chips gutter" id="seasons">${seasons.map(s => `<button class="chip ${s.season_number === season ? 'on' : ''}" data-n="${s.season_number}">${esc(s.name)}</button>`).join('')}</div><div class="eps gutter" id="eps"></div>` : ''}
    ${(d.credits?.cast || []).length ? `<div class="rail-title gutter">Cast</div><div class="rail gutter">${d.credits.cast.slice(0, 20).map(c => `<div class="cast">${c.profile_path ? `<img src="${IMG}w185${c.profile_path}" alt="" loading="lazy">` : '<div class="ph"></div>'}<span>${esc(c.name)}</span><span class="dim">${esc(c.character || '')}</span></div>`).join('')}</div>` : ''}`;
  $('#wl').onclick = () => {
    updateLib(type, id, cur => Object.assign(cur || { type, id, title: titleOf(d), poster: d.poster_path, backdrop: d.backdrop_path, pos: 0, dur: 0 }, { watch: !(cur && cur.watch) }));
    const on = libEntry(type, id)?.watch; $('#wl').innerHTML = ic(on ? 'bookmark' : 'bookmarkO'); toast(on ? 'Added to Watchlist' : 'Removed from Watchlist');
  };
  if (type === 'tv') {
    const showSeason = async n => {
      season = n; view.querySelectorAll('#seasons .chip').forEach(c => c.classList.toggle('on', +c.dataset.n === n));
      const box = $('#eps'); box.innerHTML = '<div class="sk" style="height:96px"></div><div class="sk" style="height:96px"></div>';
      const eps = await api.season(id, n).catch(() => []);
      if (!box.isConnected || season !== n) return;
      const le = libEntry(type, id);
      box.innerHTML = eps.map((ep, i) => {
        const p = le && le.season === ep.season_number && le.episode === ep.episode_number ? progressOf(le) : 0;
        return `<a class="ep fly" style="animation-delay:${i * 30}ms" href="#/streams/tv/${id}/${ep.season_number}/${ep.episode_number}"><div class="still">${img(ep.still_path && IMG + 'w300' + ep.still_path)}${p ? `<span class="prog" style="width:${p * 100}%"></span>` : ''}</div><div><b>${ep.episode_number}. ${esc(ep.name)}</b>${ep.runtime ? `<small class="dim">${ep.runtime}m</small>` : ''}<p>${esc(ep.overview || '')}</p></div></a>`;
      }).join('');
    };
    view.querySelectorAll('#seasons .chip').forEach(c => c.onclick = () => showSeason(+c.dataset.n));
    showSeason(season);
  }
}

// ============================================================================ streams
async function streamsView(type, id, season, episode, token) {
  const d = await api.details(type, id);
  if (token !== routeToken) return;
  const imdb = d.imdb_id || d.external_ids?.imdb_id;
  view.innerHTML = `<a class="icon-btn back" href="javascript:history.back()" aria-label="Back">${ic('back')}</a>
    <div class="backdrop" style="height:220px">${img(d.backdrop_path && IMG + 'w1280' + d.backdrop_path)}
      <div class="d-info gutter" style="bottom:12px"><div><h1 style="font-size:24px">${esc(titleOf(d))}</h1>${season != null ? `<div class="dim">Season ${season} • Episode ${episode}</div>` : ''}</div></div></div>
    <div class="gutter"><div class="row-btns" style="padding:8px 0 4px">
      <button class="btn outline" id="purl">${ic('link')}Play link</button>
      <label class="btn outline" style="cursor:pointer">${ic('folder')}Local file<input type="file" accept="video/*" id="pfile" hidden></label></div>
      <div class="chips" id="sfil"></div><div class="list" id="slist">${Array.from({ length: 5 }, () => '<div class="sk" style="height:76px"></div>').join('')}</div></div>`;
  const play = (url, extra = {}) => startPlayer(Object.assign({ url, title: titleOf(d), subtitle: season != null ? `S${season} • E${episode}` : yearOf(d), type, id, imdb, season, episode, poster: d.poster_path, backdrop: d.backdrop_path }, extra));
  $('#purl').onclick = () => promptSheet('Play a link', 'https://…/video.m3u8 or .mp4', url => play(url));
  $('#pfile').onchange = e => { const f = e.target.files[0]; if (f) play(URL.createObjectURL(f), { title: f.name, local: true }); };
  const list = $('#slist');
  if (!S.addons.some(a => supports(a, 'stream'))) { list.innerHTML = msg('No stream addon installed yet', 'Add one in Settings → Stream addons, or play a link / file above.', '<a class="btn acc" href="#/settings">Open Settings</a>'); return; }
  if (!imdb) { list.innerHTML = msg('No streams', "This title has no IMDb id, so addons can't look it up."); return; }
  const streams = await getStreams(type, imdb, season, episode);
  if (!list.isConnected) return;
  if (!streams.length) { list.innerHTML = msg('No streams', 'Your addons returned no streams for this title.'); return; }
  let filter = 'All';
  const filters = ['All', ...new Set(streams.map(s => s.addon)), ...new Set(streams.map(s => s.q).filter(Boolean))];
  const draw = () => {
    $('#sfil').innerHTML = filters.map(f => `<button class="chip sm ${f === filter ? 'on' : ''}">${esc(f)}</button>`).join('');
    $('#sfil').querySelectorAll('.chip').forEach((b, i) => b.onclick = () => { filter = filters[i]; draw(); });
    const shown = streams.filter(s => filter === 'All' || s.addon === filter || s.q === filter);
    list.innerHTML = shown.map((s, i) => `<button class="stream fly" style="animation-delay:${Math.min(i, 10) * 30}ms" data-i="${streams.indexOf(s)}">${ic('playC')}<div>
      <div class="l">${s.q ? `<span class="badge acc">${s.q}</span>` : ''}${s.h ? `<span class="badge hdr">${s.h}</span>` : ''}<span>${esc(s.label)}</span></div>
      ${s.details ? `<p>${esc(s.details)}</p>` : ''}<small>${esc(s.addon)}</small>
      ${/\.(mkv|avi)(\?|$)/i.test(s.url) || /\bmkv\b/i.test(s.details) ? `<div class="warn">MKV file: Safari may not play it. Use “Open in…” in the player for Infuse or VLC.</div>` : ''}</div></button>`).join('');
    list.querySelectorAll('.stream').forEach(b => b.onclick = () => { const s = streams[+b.dataset.i]; play(s.url, { addon: s.addon }); });
  };
  draw();
}

// ============================================================================ sheets
function closeSheet() { $('#sheet-root').innerHTML = ''; }
function sheet(title, opts, extraHTML = '') {
  const root = $('#sheet-root');
  root.innerHTML = `<div class="sheet-bg"></div><div class="sheet" role="dialog" aria-label="${esc(title)}"><div class="grab"></div><h3>${esc(title)}</h3>
    ${opts.map((o, i) => `<button class="opt ${o.on ? 'on' : ''}" data-i="${i}">${o.icon ? ic(o.icon) : ''}<div>${esc(o.t)}${o.s ? `<small>${esc(o.s)}</small>` : ''}</div>${o.on ? `<span class="chk">${ic('check', 'width="20" height="20"')}</span>` : ''}</button>`).join('')}${extraHTML}</div>`;
  $('.sheet-bg', root).onclick = closeSheet;
  root.querySelectorAll('.opt').forEach(b => b.onclick = () => { const o = opts[+b.dataset.i]; if (o.keep !== true) closeSheet(); o.fn && o.fn(); });
  return root;
}
function promptSheet(title, placeholder, onOk) {
  const root = sheet(title, [], `<form class="pad" id="pf"><input class="field" id="pv" type="url" placeholder="${esc(placeholder)}" autocomplete="off" required><button class="btn acc" type="submit">OK</button></form>`);
  const f = $('#pf', root); setTimeout(() => $('#pv', root).focus(), 50);
  f.onsubmit = e => { e.preventDefault(); const v = $('#pv', root).value.trim(); closeSheet(); if (v) onOk(v); };
}

// ============================================================================ player
const PLAYER = { req: null, el: null, v: null };
function srtToVtt(t) {
  t = t.replace(/\r/g, '').replace(/^﻿/, '');
  if (/^WEBVTT/.test(t)) return t;
  return 'WEBVTT\n\n' + t.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2').replace(/^\d+\n(?=\d{2}:\d{2})/gm, '');
}
function assToVtt(t) {
  const out = ['WEBVTT', ''];
  const tm = s => { const [h, m, rest] = s.trim().split(':'); const [sec, cs = '0'] = rest.split('.'); return `${h.padStart(2, '0')}:${m}:${sec.padStart(2, '0')}.${(cs + '00').slice(0, 3)}`; };
  t.replace(/\r/g, '').split('\n').forEach(l => {
    if (!l.startsWith('Dialogue:')) return;
    const p = l.slice(9).split(','); if (p.length < 10) return;
    out.push(`${tm(p[1])} --> ${tm(p[2])}`, p.slice(9).join(',').replace(/\{[^}]*\}/g, '').replace(/\\N/gi, '\n'), '');
  });
  return out.join('\n');
}
const titleKey = r => r.type && r.id ? (r.season != null ? `${r.type}-${r.id}-s${r.season}e${r.episode}` : `${r.type}-${r.id}`) : null;
function parseFilter(text) {
  const out = [], lines = text.replace(/\r/g, '').split('\n');
  const tm = s => { const m = s.trim().match(/(?:(\d{1,2}):)?(\d{1,2}):(\d{2})[.,](\d{1,3})/); return m ? ((+(m[1] || 0)) * 3600 + +m[2] * 60 + +m[3]) * 1000 + +m[4].padEnd(3, '0') : null; };
  if (lines.some(l => l.includes('-->'))) {
    lines.forEach((l, i) => {
      if (!l.includes('-->')) return;
      const [a, b] = l.split('-->'); const s = tm(a), e = tm(b);
      let body = ''; for (let j = i + 1; j < lines.length && lines[j].trim(); j++) body += lines[j].toLowerCase() + ' ';
      if (s != null && e > s && (/nudity|sex|nude/.test(body) || !body.trim())) out.push({ kind: 'nudity', start: s, end: e, source: 'Filter file' });
    });
  } else lines.forEach(l => { const p = l.trim().split(/\s+/); const s = parseFloat(p[0]), e = parseFloat(p[1]), a = p[2] == null ? 0 : parseInt(p[2]); if (e > s && (a === 0 || a === 3)) out.push({ kind: 'nudity', start: s * 1000, end: e * 1000, source: 'Filter file' }); });
  return out.sort((a, b) => a.start - b.start);
}
const segLabel = k => ({ intro: 'Skip Intro', recap: 'Skip Recap', credits: 'Skip Credits', preview: 'Skip Preview' }[k] || 'Skip Scene');

function startPlayer(req) {
  const e = libEntry(req.type, req.id);
  req.start = e && e.season == req.season && e.episode == req.episode && isContinue(e) ? e.pos : 0;
  PLAYER.req = req;
  if (location.hash !== '#/play') location.hash = '#/play';
  openPlayer();
}
function closePlayer(fromRoute, skipSave) {
  if (!PLAYER.el) return;
  if (!skipSave) saveProgress();
  try { PLAYER.v.pause(); PLAYER.v.removeAttribute('src'); PLAYER.v.load(); } catch { /* ignore */ }
  clearInterval(PLAYER.saveT);
  PLAYER.el.remove(); PLAYER.el = null; PLAYER.v = null;
  document.body.style.overflow = '';
  if (!fromRoute && location.hash === '#/play') history.back();
}
function saveProgress() {
  const r = PLAYER.req, v = PLAYER.v; if (!r || !v || !r.id || r.local || !isFinite(v.duration) || !v.duration) return;
  updateLib(r.type, r.id, cur => Object.assign(cur || { type: r.type, id: r.id, title: r.title, poster: r.poster, backdrop: r.backdrop }, { pos: v.currentTime * 1000, dur: v.duration * 1000, season: r.season, episode: r.episode, url: r.url }));
}
function openPlayer() {
  if (PLAYER.el) closePlayer(true, true); // switching episode: progress already saved
  const r = PLAYER.req;
  const el = document.createElement('div'); el.className = 'player';
  el.innerHTML = `<video playsinline webkit-playsinline preload="auto" x-webkit-airplay="allow"></video>
    <div class="spinner" id="spin"></div>
    <div class="p-ui" id="pui">
      <div class="p-top"><button class="icon-btn" id="pclose" aria-label="Close">${ic('back')}</button><div><b>${esc(r.title)}</b><small>${esc(r.subtitle || '')}</small></div>
        <button class="icon-btn" id="pair" aria-label="AirPlay">${ic('airplay')}</button><button class="icon-btn" id="ppip" aria-label="Picture in picture">${ic('pip')}</button></div>
      <div class="p-mid"><button id="prew" aria-label="Back 10 seconds">${ic10('rew')}</button><button class="p-play" id="ppp" aria-label="Play or pause">${ic('play')}</button><button id="pfwd" aria-label="Forward 10 seconds">${ic10('fwd')}</button></div>
      <div class="p-bot"><div class="p-time"><span id="tcur">0:00</span><div class="p-seek" id="seek"><div class="tr"><div class="buf" id="sbuf"></div><div class="cur" id="scur"></div></div><div class="th" id="sth"></div></div><span id="tleft">-0:00</span></div>
        <div class="p-btns"><button id="bsub">${ic('subs')}<span>Subtitles</span></button><button id="baud">${ic('audio')}<span>Audio</span></button><button id="bspd">${ic('speed')}<span>Speed</span></button>
          <button id="bsize">${ic('aspect')}<span>Size</span></button><button id="bscn">${ic('eyeOff')}<span>Scenes</span></button><button id="bopen">${ic('open')}<span>Open in…</span></button><button id="bfull">${ic('full')}<span>Full screen</span></button></div></div>
    </div>`;
  document.body.appendChild(el); document.body.style.overflow = 'hidden';
  const v = $('video', el); PLAYER.el = el; PLAYER.v = v;
  const ui = $('#pui', el), spin = $('#spin', el);
  const st = { segs: [], filters: store.get('filters', {})[titleKey(r)] || [], handled: new Set(), markStart: null, size: 0, subs: [] };
  PLAYER.st = st;

  v.src = r.url;
  v.addEventListener('loadedmetadata', () => {
    if (r.start) v.currentTime = r.start / 1000;
    if (r.id && !r.local) introSegments(r.type, r.id, r.season, r.episode, v.duration * 1000).then(s => { st.segs = s; st.introLoaded = true; });
    else st.introLoaded = true;
  }, { once: true });
  v.play().catch(() => { /* user taps play */ });

  // ---- controls visibility
  let hideT;
  const showUI = () => { ui.classList.remove('off'); clearTimeout(hideT); hideT = setTimeout(() => { if (!v.paused && !$('.sheet')) ui.classList.add('off'); }, 3800); };
  showUI();
  const setPP = () => { $('#ppp', el).innerHTML = ic(v.paused ? 'play' : 'pause'); };
  v.addEventListener('play', () => { setPP(); showUI(); });
  v.addEventListener('pause', () => { setPP(); ui.classList.remove('off'); saveProgress(); });
  v.addEventListener('waiting', () => spin.hidden = false);
  v.addEventListener('playing', () => spin.hidden = true);
  v.addEventListener('canplay', () => spin.hidden = true);
  v.addEventListener('ended', onEnded);
  v.addEventListener('error', () => {
    const mkv = /\.(mkv|avi)(\?|$)/i.test(r.url);
    const box = document.createElement('div'); box.className = 'p-err';
    box.innerHTML = `<div><h3>Can't play this here</h3><p class="dim">${mkv ? "Safari can't play MKV files. Open it in Infuse or VLC instead (both free on the App Store)." : 'This source failed to load in Safari. Try another source, or open it in another player.'}</p>
      <div class="row-btns" style="justify-content:center"><button class="btn white" id="eopen">${ic('open')}Open in…</button><button class="btn tonal" id="eclose">Close</button></div></div>`;
    el.appendChild(box); spin.hidden = true;
    $('#eopen', box).onclick = openIn; $('#eclose', box).onclick = () => closePlayer();
  });

  // ---- buttons
  $('#pclose', el).onclick = () => closePlayer();
  $('#ppp', el).onclick = e => { e.stopPropagation(); v.paused ? v.play() : v.pause(); };
  const seekBy = s => { v.currentTime = Math.max(0, Math.min((v.duration || 0) - .5, v.currentTime + s)); flash(s); showUI(); };
  $('#prew', el).onclick = e => { e.stopPropagation(); seekBy(-10); };
  $('#pfwd', el).onclick = e => { e.stopPropagation(); seekBy(10); };
  $('#pair', el).onclick = () => v.webkitShowPlaybackTargetPicker ? v.webkitShowPlaybackTargetPicker() : toast('AirPlay is available in Safari on iPhone');
  $('#ppip', el).onclick = async () => {
    try { if (v.webkitSupportsPresentationMode && v.webkitSupportsPresentationMode('picture-in-picture')) v.webkitSetPresentationMode(v.webkitPresentationMode === 'picture-in-picture' ? 'inline' : 'picture-in-picture'); else if (document.pictureInPictureEnabled) await v.requestPictureInPicture(); else toast('Picture in Picture is not available here'); } catch { toast('Picture in Picture is not available here'); }
  };
  $('#bfull', el).onclick = () => { if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); else (el.requestFullscreen ? el.requestFullscreen() : null)?.catch?.(() => {}); };
  $('#bspd', el).onclick = () => sheet('Playback speed', [.5, .75, 1, 1.25, 1.5, 1.75, 2].map(x => ({ t: x === 1 ? 'Normal' : x + 'x', on: v.playbackRate === x, fn: () => v.playbackRate = x })));
  $('#bsize', el).onclick = () => sheet('Video size', [['Fit', 'Whole picture', ''], ['Zoom / Crop', 'Fills the screen', 'zoom'], ['Stretch', 'Fills screen, distorts picture', 'fill']].map(([t, s, c]) => ({ t, s, on: el.classList.contains(c) || (!c && !el.classList.contains('zoom') && !el.classList.contains('fill')), fn: () => { el.classList.remove('zoom', 'fill'); c && el.classList.add(c); } })));
  $('#baud', el).onclick = () => {
    const at = v.audioTracks;
    if (!at || at.length < 2) return sheet('Audio', [{ t: 'Default audio track', s: at && at.length === 1 ? (at[0].label || langName(at[0].language) || 'Track 1') : 'Only one audio track in this stream', on: true }]);
    sheet('Audio', Array.from(at).map((t, i) => ({ t: t.label || langName(t.language) || `Track ${i + 1}`, s: langName(t.language) || '', on: t.enabled, fn: () => { for (let j = 0; j < at.length; j++) at[j].enabled = j === i; } })));
  };
  $('#bsub', el).onclick = subtitlesSheet;
  $('#bscn', el).onclick = scenesSheet;
  $('#bopen', el).onclick = openIn;

  function openIn() {
    if (r.local) return toast('Local files can only play here');
    const u = encodeURIComponent(r.url);
    sheet('Open in another player', [
      { t: 'Infuse', s: 'Best for MKV, Dolby Vision & Atmos', icon: 'open', fn: () => location.href = `infuse://x-callback-url/play?url=${u}` },
      { t: 'VLC', s: 'Plays almost anything', icon: 'open', fn: () => location.href = `vlc-x-callback://x-callback-url/stream?url=${u}` },
      { t: 'Outplayer', icon: 'open', fn: () => location.href = `outplayer://${r.url}` },
      { t: 'Copy link', icon: 'link', fn: () => navigator.clipboard?.writeText(r.url).then(() => toast('Link copied'), () => toast("Couldn't copy")) },
    ]);
  }

  // ---- subtitles
  function addTrack(vttText, label, lang, select = true) {
    const url = URL.createObjectURL(new Blob([vttText], { type: 'text/vtt' }));
    const tr = document.createElement('track'); tr.kind = 'subtitles'; tr.label = label; tr.srclang = lang || 'und'; tr.src = url;
    v.appendChild(tr);
    setTimeout(() => { if (select) selectText(v.textTracks.length - 1); }, 60);
    toast('Added subtitle: ' + label);
  }
  function selectText(idx) { for (let i = 0; i < v.textTracks.length; i++) v.textTracks[i].mode = i === idx ? 'showing' : 'disabled'; }
  async function addFromText(text, name, lang) { const vtt = /\.(ass|ssa)$/i.test(name) || /^\[Script Info\]/m.test(text) ? assToVtt(text) : srtToVtt(text); addTrack(vtt, name, lang); }
  function subtitlesSheet() {
    const tt = Array.from(v.textTracks).filter(t => t.kind === 'subtitles' || t.kind === 'captions');
    const opts = [{ t: 'Off', icon: 'close', on: tt.every(t => t.mode !== 'showing'), fn: () => selectText(-1) }];
    Array.from(v.textTracks).forEach((t, i) => { if (t.kind === 'subtitles' || t.kind === 'captions') opts.push({ t: t.label || langName(t.language) || `Track ${i + 1}`, s: langName(t.language) || '', on: t.mode === 'showing', fn: () => selectText(i) }); });
    opts.push({ t: 'Import subtitle file…', s: '.srt  .vtt  .ass  .ssa', icon: 'folder', fn: () => pickFile('.srt,.vtt,.ass,.ssa,.txt,text/*', f => f.text().then(t => addFromText(t, f.name, 'und'))) });
    opts.push({ t: 'Load subtitle from URL…', icon: 'link', fn: () => promptSheet('Subtitle URL', 'https://…/subtitle.srt', u => fetch(u).then(x => x.text()).then(t => addFromText(t, u.split('/').pop().split('?')[0] || 'Subtitle', 'und')).catch(() => toast("Couldn't load that subtitle (the site may block it)"))) });
    if (r.imdb) opts.push({ t: 'Search online subtitles', s: 'From your installed addons', icon: 'search', fn: onlineSubs });
    opts.push({ t: `Subtitle size: ${Math.round(S.subScale * 100)}%`, s: 'Tap to cycle', icon: 'subs', keep: true, fn: () => { S.subScale = S.subScale >= 2 ? .6 : Math.round((S.subScale + .2) * 10) / 10; saveSettings(); subtitlesSheet(); } });
    sheet('Subtitles', opts);
  }
  async function onlineSubs() {
    sheet('Online subtitles', [{ t: 'Searching…' }]);
    const list = await getSubtitles(r.type, r.imdb, r.season, r.episode);
    const pref = (S.subLang || 'en').slice(0, 2);
    list.sort((a, b) => (String(b.lang).startsWith(pref) ? 1 : 0) - (String(a.lang).startsWith(pref) ? 1 : 0));
    if (!list.length) return sheet('Online subtitles', [{ t: 'No subtitles found', s: 'Install a subtitles addon in Settings' }]);
    sheet('Online subtitles', list.slice(0, 60).map((s, i) => ({ t: `${langName(s.lang) || s.lang} #${i + 1}`, s: s.id || '', fn: () => fetch(s.url).then(x => x.text()).then(t => addFromText(t, `${langName(s.lang) || s.lang} #${i + 1}`, s.lang)).catch(() => toast("Couldn't load that subtitle")) })));
  }

  // ---- scenes (skip intro / nudity filters)
  const saveFilters = list => { st.filters = list.sort((a, b) => a.start - b.start); const k = titleKey(r); if (!k) return toast('Filters are saved only for catalog titles'); const all = store.get('filters', {}); if (list.length) all[k] = st.filters; else delete all[k]; store.set('filters', all); };
  function scenesSheet() {
    const opts = [
      { t: 'Auto-skip nudity scenes', s: S.skipNudity ? 'On – uses filter files and scenes you mark' : 'Off', icon: 'eyeOff', on: S.skipNudity, keep: true, fn: () => { S.skipNudity = !S.skipNudity; saveSettings(); scenesSheet(); } },
      st.markStart == null
        ? { t: 'Mark scene start', s: 'Now at ' + fmt(v.currentTime * 1000), icon: 'flag', fn: () => { st.markStart = v.currentTime * 1000; drawMark(); toast('Scene start marked'); } }
        : { t: 'Set scene end', s: 'Started at ' + fmt(st.markStart), icon: 'flag', fn: markEnd },
      { t: 'Import filter file…', s: 'EDL (.edl) or MovieContentFilter (.mcf)', icon: 'folder', fn: () => pickFile('.edl,.mcf,.txt,.vtt,text/*', f => f.text().then(importFilter)) },
      { t: 'Load filter from URL…', icon: 'link', fn: () => promptSheet('Filter file URL', 'https://…/movie.edl', u => fetch(u).then(x => x.text()).then(importFilter).catch(() => toast("Couldn't load that filter file"))) },
      { t: 'Intro & recap data', s: !st.introLoaded ? 'Looking up TheIntroDB…' : st.segs.length ? st.segs.map(s => s.kind + ' ' + fmt(s.start)).join(', ') : 'Not available for this title yet', icon: 'ffwd' },
    ];
    if (!st.filters.length) opts.push({ t: 'No scenes to skip yet', s: 'Mark one or import a filter file' });
    st.filters.forEach(f => opts.push({ t: `${fmt(f.start)} – ${fmt(f.end)}`, s: `${f.source} • tap to remove`, icon: 'del', fn: () => { saveFilters(st.filters.filter(x => x !== f)); toast('Scene removed'); } }));
    sheet('Skip scenes', opts);
  }
  function importFilter(text) { const p = parseFilter(text); if (!p.length) return toast('No nudity scenes found in that file'); saveFilters([...st.filters, ...p]); toast(`Loaded ${p.length} scenes to skip`); }
  function markEnd() {
    const s = st.markStart, e = v.currentTime * 1000; st.markStart = null; drawMark();
    if (s == null || e - s < 500) return toast('Scene too short');
    saveFilters([...st.filters, { kind: 'custom', start: s, end: e, source: 'Marked by you' }]); toast('Scene saved – it will be skipped from now on');
  }
  function drawMark() {
    $('.mark-chip', el)?.remove();
    if (st.markStart == null) return;
    const c = document.createElement('div'); c.className = 'mark-chip';
    c.innerHTML = `<i></i>Marking from ${fmt(st.markStart)}<button id="mend">Set end</button><button id="mx" aria-label="Cancel">${ic('close', 'width="18" height="18"')}</button>`;
    el.appendChild(c); $('#mend', c).onclick = markEnd; $('#mx', c).onclick = () => { st.markStart = null; drawMark(); };
  }
  let pill = null;
  function showPill(seg) {
    if (pill && pill._seg === seg) return;
    pill?.remove(); pill = null; if (!seg) return;
    const nextEp = (seg.kind === 'credits' || seg.kind === 'preview') && r.type === 'tv' && S.autoNext;
    pill = document.createElement('button'); pill.className = 'skip-pill'; pill._seg = seg;
    pill.innerHTML = `${ic(nextEp ? 'next' : 'ffwd')}${nextEp ? 'Next Episode' : segLabel(seg.kind)}`;
    pill.onclick = e => { e.stopPropagation(); skipSeg(seg); };
    el.appendChild(pill);
  }
  function skipSeg(seg) {
    st.handled.add(seg); showPill(null);
    const dur = v.duration * 1000;
    if ((seg.kind === 'credits' || seg.kind === 'preview') && r.type === 'tv' && S.autoNext && (seg.end == null || seg.end >= dur - 5000)) return playNext();
    v.currentTime = Math.min(dur, seg.end ?? dur) / 1000;
  }
  v.addEventListener('timeupdate', () => {
    const pos = v.currentTime * 1000, dur = v.duration * 1000; if (!dur) return;
    const f = st.filters.find(f => (S.skipNudity || f.kind === 'custom') && pos >= f.start && pos < f.end - 300);
    if (f) { v.currentTime = f.end / 1000; toast('Scene skipped'); return; }
    const seg = st.segs.find(s => pos >= s.start && pos < (s.end ?? dur) - 300);
    const mode = seg ? (seg.kind === 'intro' ? S.skipIntro : seg.kind === 'recap' ? S.skipRecap : S.skipCredits) : 'off';
    if (!seg || mode === 'off') return showPill(null);
    if (mode === 'auto' && !st.handled.has(seg)) { skipSeg(seg); toast(segLabel(seg.kind).replace('Skip', 'Skipped')); return; }
    showPill(seg);
  });

  // ---- next episode
  async function onEnded() {
    saveProgress();
    if (r.type === 'tv' && S.autoNext && r.imdb && r.season != null) playNext(); else closePlayer();
  }
  async function playNext() {
    toast('Loading next episode…');
    const next = r.episode + 1;
    const streams = await getStreams('tv', r.imdb, r.season, next).catch(() => []);
    const pick = streams.find(s => s.addon === r.addon) || streams[0];
    if (!pick) { toast('No stream found for the next episode'); return closePlayer(); }
    saveProgress();
    PLAYER.req = Object.assign({}, r, { url: pick.url, addon: pick.addon, episode: next, subtitle: `S${r.season} • E${next}`, start: 0 });
    openPlayer();
  }

  // ---- seek bar
  const seek = $('#seek', el), scur = $('#scur', el), sbuf = $('#sbuf', el), sth = $('#sth', el);
  let scrubbing = false;
  const paint = frac => { scur.style.width = frac * 100 + '%'; sth.style.left = frac * 100 + '%'; };
  const tick = () => {
    if (!PLAYER.el || PLAYER.el !== el) return;
    const d = v.duration || 0;
    if (!scrubbing && d) { paint(v.currentTime / d); $('#tcur', el).textContent = fmt(v.currentTime * 1000); $('#tleft', el).textContent = '-' + fmt((d - v.currentTime) * 1000); }
    if (d && v.buffered.length) sbuf.style.width = (v.buffered.end(v.buffered.length - 1) / d) * 100 + '%';
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  const fracAt = e => { const b = seek.getBoundingClientRect(); return Math.max(0, Math.min(1, (e.clientX - b.left) / b.width)); };
  seek.addEventListener('pointerdown', e => { e.stopPropagation(); scrubbing = true; seek.setPointerCapture(e.pointerId); paint(fracAt(e)); showUI(); });
  seek.addEventListener('pointermove', e => { if (!scrubbing) return; const f = fracAt(e); paint(f); $('#tcur', el).textContent = fmt(f * v.duration * 1000); showUI(); });
  seek.addEventListener('pointerup', e => { if (!scrubbing) return; scrubbing = false; v.currentTime = fracAt(e) * (v.duration || 0); });

  // ---- tap / double-tap gestures
  let lastTap = 0, tapT;
  el.addEventListener('click', e => {
    if (e.target.closest('button, .p-seek, .sheet, .p-err, .mark-chip')) return;
    const now = Date.now();
    if (now - lastTap < 300) { clearTimeout(tapT); lastTap = 0; seekBy(e.clientX < innerWidth / 2 ? -10 : 10); return; }
    lastTap = now;
    tapT = setTimeout(() => { ui.classList.contains('off') ? showUI() : ui.classList.add('off'); }, 260);
  });
  function flash(s) {
    const f = document.createElement('div'); f.className = 'flash'; f.style[s < 0 ? 'left' : 'right'] = '64px';
    f.innerHTML = `${ic(s < 0 ? 'rew' : 'fwd')}${s < 0 ? '-' : '+'}10s`; el.appendChild(f); setTimeout(() => f.remove(), 700);
  }
  PLAYER.saveT = setInterval(saveProgress, 10000);
}
function pickFile(accept, cb) { const i = document.createElement('input'); i.type = 'file'; i.accept = accept; i.onchange = () => i.files[0] && cb(i.files[0]); i.click(); }
document.addEventListener('visibilitychange', () => { if (document.hidden) saveProgress(); });
addEventListener('pagehide', saveProgress);

// ============================================================================ settings
function settingsView() {
  const sw = (id, on) => `<button class="switch ${on ? 'on' : ''}" id="${id}" role="switch" aria-checked="${!!on}"></button>`;
  const modeChips = (id, val) => `<div class="chips" style="padding:8px 0 0">${['off', 'button', 'auto'].map(m => `<button class="chip sm ${val === m ? 'on' : ''}" data-mode="${id}:${m}">${{ off: 'Off', button: 'Button', auto: 'Auto' }[m]}</button>`).join('')}</div>`;
  const standalone = navigator.standalone || matchMedia('(display-mode: standalone)').matches;
  view.innerHTML = `<h1 class="page-title gutter">Settings</h1><div class="gutter">
    ${standalone ? '' : `<div class="set-h">${ic('phone')}Install on iPhone</div><div class="card"><div class="set-row"><div><b>Add Lumio to your Home Screen</b><small>In Safari, tap the Share button, then “Add to Home Screen”. Lumio then opens full-screen like an app.</small></div></div></div>`}
    <div class="set-h">${ic('palette')}Appearance</div>
    <div class="card"><div class="set-row" style="display:block"><b>Theme colour</b><small class="dim">Buttons, highlights, the navigation pill and progress bars</small>
      <div class="colors" style="padding-top:14px">${ACCENTS.map(([k, n, c]) => `<button class="dot ${S.accent === k ? 'on' : ''}" data-acc="${k}"><i style="background:${c}">${ic('check')}</i>${n}</button>`).join('')}
        <button class="dot custom ${S.accent === 'custom' ? 'on' : ''}" data-acc="custom"><i><span style="background:${S.customAccent}">${ic('check')}</span></i>Custom</button></div>
      ${S.accent === 'custom' ? `<div style="padding-top:14px"><input type="color" id="custc" value="${esc(S.customAccent)}" aria-label="Custom colour"></div>` : ''}</div></div>
    <div class="card"><div class="set-row"><div><b>AMOLED black</b><small>Use pure black backgrounds for OLED screens</small></div>${sw('amoled', S.amoled)}</div></div>

    <div class="set-h">${ic('ffwd')}Skipping</div>
    <div class="card">
      <div class="set-row" style="display:block"><b>Skip intros</b><small>Opening titles and theme songs</small>${modeChips('skipIntro', S.skipIntro)}</div>
      <div class="set-row" style="display:block"><b>Skip recaps</b><small>“Previously on…” at the start of episodes</small>${modeChips('skipRecap', S.skipRecap)}</div>
      <div class="set-row" style="display:block"><b>Skip credits</b><small>Shows “Next Episode” on series</small>${modeChips('skipCredits', S.skipCredits)}</div>
      <div class="set-row"><div><b>Auto-skip nudity scenes</b><small>Skips scenes in filter files you import, and scenes you mark yourself in the player under Scenes</small></div>${sw('skipNudity', S.skipNudity)}</div>
    </div>

    <div class="set-h">${ic('playC')}Player</div>
    <div class="card">
      <div class="set-row"><div><b>Auto-play next episode</b></div>${sw('autoNext', S.autoNext)}</div>
      <div class="set-row" style="display:block"><b>Subtitle size: <span id="ssv">${Math.round(S.subScale * 100)}%</span></b><input type="range" id="subScale" min="0.6" max="2" step="0.1" value="${S.subScale}"></div>
      <div class="set-row" style="display:block"><b>Preferred subtitle language</b><small>ISO code, e.g. en, ar</small><input class="field" id="subLang" style="margin-top:8px" maxlength="3" value="${esc(S.subLang)}"></div>
    </div>

    <div class="set-h">${ic('movie')}Catalog</div>
    <div class="card">
      <div class="set-row" style="display:block"><b>Streaming region</b><small>Which country's Netflix, Disney+, Prime Video… catalogs to show (US, KW, SA, AE, GB…)</small><input class="field" id="region" style="margin-top:8px" maxlength="2" value="${esc(S.region)}"></div>
      <div class="set-row" style="display:block"><b>TMDB API key</b><small>${S.tmdbKey ? 'Using your own key. Clear it to use the built-in key.' : 'Built-in key is active. Paste your own only to override it.'}</small><input class="field" id="tmdbKey" style="margin-top:8px" type="password" autocomplete="off" value="${esc(S.tmdbKey)}"></div>
    </div>

    <div class="set-h">${ic('ext')}Stream addons</div>
    <div class="card"><form class="set-row" style="display:grid;gap:10px" id="addf"><small style="margin:0">Paste a Stremio-compatible addon manifest URL (…/manifest.json). Only install sources you have the right to stream.</small>
      <input class="field" id="addu" type="url" placeholder="https://…/manifest.json" autocomplete="off"><button class="btn acc" type="submit" style="justify-self:start">Install addon</button></form></div>
    <div class="card" id="addons">${S.addons.map((a, i) => `<div class="set-row"><div><b>${esc(a.name)}</b><small>${a.builtIn ? 'Built-in • ' : ''}${esc((a.resources || []).join(', ') || addonBase(a))}</small></div><button class="icon-btn" data-del="${i}" aria-label="Remove ${esc(a.name)}" style="background:none">${ic('del')}</button></div>`).join('') || '<div class="set-row"><small>No addons installed</small></div>'}</div>
    <p class="dim" style="font-size:12px;padding:24px 0">Lumio web • works best in Safari on iPhone. HDR & Dolby Vision play natively on supported iPhones for HLS/MP4 streams.</p>
  </div>`;
  const toggle = (id, key) => $('#' + id).onclick = () => { S[key] = !S[key]; saveSettings(); settingsView(); };
  toggle('amoled', 'amoled'); toggle('skipNudity', 'skipNudity'); toggle('autoNext', 'autoNext');
  view.querySelectorAll('[data-acc]').forEach(b => b.onclick = () => { S.accent = b.dataset.acc; saveSettings(); settingsView(); });
  $('#custc')?.addEventListener('input', e => { S.customAccent = e.target.value; saveSettings(); });
  $('#custc')?.addEventListener('change', () => settingsView());
  view.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { const [k, m] = b.dataset.mode.split(':'); S[k] = m; saveSettings(); settingsView(); });
  $('#subScale').oninput = e => { S.subScale = +e.target.value; $('#ssv').textContent = Math.round(S.subScale * 100) + '%'; saveSettings(); };
  $('#subLang').onchange = e => { S.subLang = e.target.value.trim().toLowerCase(); saveSettings(); };
  $('#region').onchange = e => { const v = e.target.value.trim().toUpperCase(); if (/^[A-Z]{2}$/.test(v)) { S.region = v; saveSettings(); servicesReady = null; cache.clear(); toast('Region set to ' + v); } else toast('Use a 2-letter country code'); };
  $('#tmdbKey').onchange = e => { S.tmdbKey = e.target.value.trim(); saveSettings(); cache.clear(); servicesReady = null; toast('Saved'); };
  $('#addf').onsubmit = async e => {
    e.preventDefault(); const u = $('#addu').value.trim(); if (!u) return;
    try { const a = await fetchManifest(u); S.addons = S.addons.filter(x => x.url !== a.url).concat(a); saveSettings(); toast('Installed ' + a.name); settingsView(); }
    catch (err) { toast("Couldn't load that manifest"); }
  };
  view.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { const a = S.addons[+b.dataset.del]; S.addons.splice(+b.dataset.del, 1); saveSettings(); toast('Removed ' + a.name); settingsView(); });
}

// ============================================================================ boot
applyTheme();
if (location.hash === '#/play') history.replaceState(null, '', '#/home');
route();
