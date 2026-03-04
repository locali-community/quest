'use strict';

const G = {
  // Registration opens Fri 06.03. Instagram post (Stop 1 links) goes live Sat 07.03 12:00.
  REGISTER_START: new Date('2026-03-06T00:00:00'),
  HUNT_START:     new Date('2026-03-07T12:00:00'),
  HUNT_END:       new Date('2026-03-11T23:59:00'),

  IG_POST_A:  'https://www.instagram.com/locali_bielefeld/', // replace with real post URL
  IG_POST_B:  'https://www.instagram.com/locali_bielefeld/', // replace with real post URL
  IG_PROFILE: 'https://www.instagram.com/locali_studentlife?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',

  KAKTUS_CODE: 'KAKTUS52',   // sticker inside Kaktus — individual, no expiry
  INDIE_CODE:  'INDIE2026',  // sticker at Indieflavours entrance — 06–11.03 only

  FINAL_NAME:    'Indieflavours Bielefeld',
  FINAL_ADDRESS: 'Mauerstraße 52, 33602 Bielefeld',
  FINAL_MAP:     'https://maps.google.com/?q=Indieflavours+Bielefeld+Mauerstrase+52',
  KAKTUS_MAP:    'https://share.google/J2fruJExUS1heH3Sg',

  // ── STOPS ──────────────────────────────────────────────────
  // Each stop:
  //   sticker_code  — the text printed on the physical LOCALI sticker at that location
  //   fragment      — encoded piece, revealed ONLY after correct sticker code
  //   next_clue     — shown after code validated; guides to next stop (null = last stop)
  //   next_url      — relative path to next stop page (null = last stop)
  // Location names are NEVER shown on the hunt overview page.
  // Stop 1 URL comes from the Instagram post. Stop 2 and 3 URLs are
  // revealed only after the previous stop's sticker code is validated.
  STOPS: {
    A: [
      {
        id: 'a1', number: 1,
        sticker_code: 'KBR-7',
        gmaps:    'https://maps.google.com/?q=52.0242845,8.5389817',
        fragment: 'N52°01',
        hint:     'A coordinate fragment. Copy it exactly — every character matters.',
        next_clue: 'From here, find the building where the city makes its decisions. On your way, look for the letters "16T" on something old.',
        next_url:  'stops/stop-a2.html',
      },
      {
        id: 'a2', number: 2,
        sticker_code: 'RAT-4',
        gmaps:    'https://maps.google.com/?q=52.0213634,8.5350583',
        fragment: 'E008°31',
        hint:     'Another coordinate fragment. Copy it exactly.',
        next_clue: 'Head north to the large open square in the heart of Bielefeld. Find the spiral fountain.',
        next_url:  'stops/stop-a3.html',
      },
      {
        id: 'a3', number: 3,
        sticker_code: 'JPN-9',
        gmaps:    'https://maps.google.com/?q=52.0255450,8.5311943',
        fragment: '#4A-F2',
        hint:     'An identifier code. The letters are initials of something important.',
        next_clue: null,
        next_url:  null,
      },
    ],
    B: [
      {
        id: 'b1', number: 1,
        sticker_code: 'PMR-2',
        gmaps:    'https://maps.google.com/?q=52.0184171,8.5296325',
        fragment: 'BF-3360',
        hint:     'A city and postcode fragment. Copy it exactly.',
        next_clue: 'From here, walk into the old town (Altstadt). Find a telephone booth that reminds you of London.',
        next_url:  'stops/stop-b2.html',
      },
      {
        id: 'b2', number: 2,
        sticker_code: 'ALT-6',
        gmaps:    'https://maps.google.com/?q=52.020826,8.531890',
        fragment: 'MW-52-X',
        hint:     'A street reference code. Copy every character.',
        next_clue: 'Walk to Jahnplatz. Find the tower that holds a machine that must always run to be right.',
        next_url:  'stops/stop-b3.html',
      },
      {
        id: 'b3', number: 3,
        sticker_code: 'JTW-3',
        gmaps:    'https://maps.google.com/?q=52.0230201,8.5331087',
        fragment: 'IDF-26',
        hint:     'A name and year code. The letters are initials.',
        next_clue: null,
        next_url:  null,
      },
    ],
  },

  // ── DECODER ────────────────────────────────────────────────
  // Player A types all 3 of their fragments (space-separated).
  // Player B types all 3 of theirs.
  // Both boxes must match simultaneously before any reveal happens.
  // Correct answers (normalised: uppercase, spaces/whitespace stripped):
  DECODER: {
    ANSWER_A: 'N52°01E008°31#4A-F2',   // A's 3 fragments concatenated, normalised
    ANSWER_B:  'BF-3360MW-52-XIDF-26', // B's 3 fragments concatenated, normalised

    // These steps reveal one by one (with delays) only after both boxes correct
    STEPS: [
      { delay:    0, label: 'The restaurant name',
        html: '#4A-F2 + IDF-26 → initials <strong>IDF</strong> = <strong>InDieFlavours</strong>. City code BF = <strong>Bielefeld</strong>.' },
      { delay: 1400, label: 'The street',
        html: 'MW in MW-52-X → <strong>Mauer</strong>straße.' },
      { delay: 2800, label: 'The house number',
        html: 'N52°01 → digits before ° = <strong>52</strong>.' },
      { delay: 4200, label: 'The postal code',
        html: 'BF-<strong>3360</strong> + last digit of #4A-F<strong>2</strong> → <strong>33602</strong>.' },
      { delay: 5600, label: 'The full address — go here',
        html: '<span style="font-family:var(--syne);font-size:1.1rem;font-weight:800;letter-spacing:.03em;color:var(--gold);">Indieflavours Bielefeld<br>Mauerstraße 52, 33602 Bielefeld</span>' },
    ],
  },

  // ── Google Forms ────────────────────────────────────────────
  FORMS: {
    TEAM: {
      ACTION:    'https://docs.google.com/forms/d/e/FORM_ID_1/formResponse',
      PLAYER:    'entry.100000001',
      PARTNER:   'entry.100000002',
      TEAMNAME:  'entry.100000003',
      ROLE:      'entry.100000004',
      TIMESTAMP: 'entry.100000005',
    },
    KAKTUS: {
      ACTION:    'https://docs.google.com/forms/d/e/FORM_ID_2/formResponse',
      PLAYER:    'entry.200000001',
      TIMESTAMP: 'entry.200000002',
    },
    WINNER: {
      ACTION:    'https://docs.google.com/forms/d/e/FORM_ID_3/formResponse',
      PLAYER:    'entry.300000001',
      PARTNER:   'entry.300000002',
      TEAMNAME:  'entry.300000003',
      TIMESTAMP: 'entry.300000004',
    },
  },

  // ── localStorage ────────────────────────────────────────────
  K: {
    HANDLE:      'lc_handle',
    ROLE:        'lc_role',
    PARTNER:     'lc_partner',
    TEAMNAME:    'lc_team',
    KAKTUS_DONE: 'lc_kaktus',
    STOPS_DONE:  'lc_stops',
    WON:         'lc_won',
  },

  set(k,v)   { localStorage.setItem(k, String(v)); },
  get(k)     { return localStorage.getItem(k); },
  clearAll() { Object.values(this.K).forEach(k => localStorage.removeItem(k)); },

  getStops() {
    try { return JSON.parse(this.get(this.K.STOPS_DONE) || '[]'); } catch { return []; }
  },
  addStop(id) {
    const d = this.getStops();
    if (!d.includes(id)) { d.push(id); this.set(this.K.STOPS_DONE, JSON.stringify(d)); }
  },
  stopsForRole(r) { return this.STOPS[r || this.get(this.K.ROLE)] || []; },
  allStopsDone() {
    const r = this.get(this.K.ROLE);
    return r ? this.stopsForRole(r).every(s => this.getStops().includes(s.id)) : false;
  },
  getFragments() {
    return this.stopsForRole(this.get(this.K.ROLE))
      .filter(s => this.getStops().includes(s.id))
      .map(s => s.fragment);
  },

  isHuntLive()  { const n = new Date(); return n >= this.HUNT_START && n <= this.HUNT_END; },
  isHuntOver()  { return new Date() > this.HUNT_END; },

  validHandle(r) { const h = r.replace(/^@/,'').trim(); return h.length>=2 && /^[a-zA-Z0-9._]+$/.test(h); },
  cleanHandle(r) { return r.replace(/^@/,'').trim().toLowerCase(); },

  // Normalise decoder input: uppercase, strip spaces and non-essential chars
  norm(s) { return s.toUpperCase().replace(/\s+/g,'').replace(/[^A-Z0-9°#\-]/g,''); },

  now() {
    return new Date().toLocaleString('de-DE',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'});
  },

  postForm(key, fields) {
    const cfg = this.FORMS[key];
    if (!cfg || cfg.ACTION.includes('FORM_ID')) { console.warn('LOCALI: form '+key+' not configured'); return; }
    const id = 'gf_'+Date.now();
    const ifr = document.createElement('iframe');
    ifr.name = ifr.id = id;
    ifr.style.cssText = 'display:none;position:absolute;width:0;height:0;border:0;';
    document.body.appendChild(ifr);
    const frm = document.createElement('form');
    frm.method='POST'; frm.action=cfg.ACTION; frm.target=id;
    Object.entries(fields).forEach(([n,v])=>{ const i=document.createElement('input'); i.type='hidden'; i.name=n; i.value=v; frm.appendChild(i); });
    document.body.appendChild(frm);
    frm.submit();
    setTimeout(()=>{ ifr.remove(); frm.remove(); }, 8000);
  },
};
