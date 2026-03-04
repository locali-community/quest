# LOCALI 2.0 — Setup Guide v3
## Bielefeld Quest · 06–11 March 2026

---

## Key Dates
| Date | What happens |
|------|-------------|
| **Fri 06.03** | Registration opens. Players register, find partners, visit Kaktus any time. |
| **Sat 07.03 12:00** | Instagram post goes live — contains first stop links for both roles. Hunt begins. |
| **Wed 11.03 23:59** | Hunt ends. Indieflavours prize expires. |

---

## Physical Codes to Print

### Restaurant codes (print on small stickers with "LOCALI" branding)
| Code | Place at | Notes |
|------|----------|-------|
| `KAKTUS52` | Somewhere inside Kaktus Mexican Food | Menu back, sticker on wall, toilet door |
| `INDIE2026` | Entrance of Indieflavours Bielefeld | Players enter this code to claim their prize |

### Location sticker codes (print on small LOCALI stickers, place morning of 07.03)
| Code | Location | Placed where |
|------|----------|-------------|
| `KBR-7` | Kesselbrink (Player A, Stop 1) | On or near the memorial/monument |
| `RAT-4` | Rathaus area (Player A, Stop 2) | Near the "16T" landmark |
| `JPN-9` | Jahnplatz spiral fountain (Player A, Stop 3) | Near the spiral fountain |
| `PMR-2` | Park der Menschenrechte (Player B, Stop 1) | Near the river view point |
| `ALT-6` | Altstadt red telephone booth (Player B, Stop 2) | On or near the telephone booth |
| `JTW-3` | Jahnplatz clock tower (Player B, Stop 3) | Near the clock tower |

**Sticker design tip:** Print the code text clearly on a white label, add "LOCALI 🔴" above it. Laminate if possible — they need to survive several days outdoors.

---

## How the Hunt Flow Works (new v3)

```
Instagram post (Sat 07.03 12:00)
    ├── Player A link → stops/stop-a1.html
    └── Player B link → stops/stop-b1.html

stop-a1.html / stop-b1.html
    → Player arrives at location
    → Finds physical LOCALI sticker
    → Enters sticker code (e.g. KBR-7)
    → If correct: fragment revealed + clue to Stop 2

stop-a2.html / stop-b2.html
    → Same pattern → fragment + clue to Stop 3

stop-a3.html / stop-b3.html
    → Same pattern → fragment only (last stop)
    → Redirects to hunt.html

hunt.html (after all 3 stops)
    → Shows "all stops complete" state
    → Two entry boxes: Player A enters their 3 fragments, Player B enters theirs
    → Both must be correct simultaneously
    → Step-by-step address reveal (one line every ~1.4 seconds)
    → Final: "Indieflavours Bielefeld, Mauerstraße 52, 33602 Bielefeld"
    → Final code entry box: player enters INDIE2026 (found at entrance)
    → Win screen with voucher
```

**Critical: Location names are never shown on hunt.html.** Players only see:
- A clue description to find the next stop
- The next stop page URL (after the previous code is validated)

---

## Fragment System

### Player A collects:
| Stop | Location | Sticker code | Fragment |
|------|----------|-------------|---------|
| A1 | Kesselbrink | `KBR-7` | `N52°01` |
| A2 | Rathaus | `RAT-4` | `E008°31` |
| A3 | Jahnplatz | `JPN-9` | `#4A-F2` |

### Player B collects:
| Stop | Location | Sticker code | Fragment |
|------|----------|-------------|---------|
| B1 | Park der Menschenrechte | `PMR-2` | `BF-3360` |
| B2 | Altstadt telephone booth | `ALT-6` | `MW-52-X` |
| B3 | Jahnplatz clock tower | `JTW-3` | `IDF-26` |

### How they decode (shown step by step on hunt.html):
1. `#4A-F2` + `IDF-26` → **InDieFlavours** Bielefeld
2. `MW` → **Mauer**straße
3. `N52°` → house number **52**
4. `BF-3360` + digit → **33602**
5. Combined: **Indieflavours Bielefeld, Mauerstraße 52, 33602 Bielefeld** ✓

### Decoder validation:
- Box A correct answer (normalised): `N52°01E008°31#4A-F2`
- Box B correct answer (normalised): `BF-3360MW-52-XIDF-26`
- The game strips spaces and normalises case before comparing — so "N52°01 E008°31 #4A-F2" works fine.

---

## File Structure
```
/
├── index.html       ← Rules + briefing
├── role.html        ← Role select + Instagram handle
├── team.html        ← Find partner + register → fires Google Form 1
├── kaktus.html      ← Kaktus code → personal 20% voucher → fires Google Form 2
├── waiting.html     ← Countdown to Sat 07.03 + team summary
├── hunt.html        ← Hunt router (no locations shown) + decoder + win screen
├── game.js          ← ALL CONFIG HERE
├── style.css
└── stops/
    ├── stop-a1.html  Kesselbrink (sticker code KBR-7)
    ├── stop-a2.html  Rathaus (sticker code RAT-4)
    ├── stop-a3.html  Jahnplatz fountain (sticker code JPN-9)
    ├── stop-b1.html  Park der Menschenrechte (sticker code PMR-2)
    ├── stop-b2.html  Altstadt telephone booth (sticker code ALT-6)
    └── stop-b3.html  Jahnplatz clock tower (sticker code JTW-3)
```

---

## Step 1 — Deploy to GitHub Pages
1. Create public repo on github.com (e.g. `locali-quest`)
2. Upload all files, preserving the `stops/` subfolder
3. Settings → Pages → Branch: main → / (root) → Save
4. URL: `https://YOUR-USERNAME.github.io/locali-quest/`
5. Test on phone

## Step 2 — Create 3 Google Forms

**Form 1 — Team Registration** (5 Short Answer fields):
Player Handle / Partner Handle / Team Name / Role / Timestamp

**Form 2 — Kaktus Voucher** (2 Short Answer fields):
Player Handle / Timestamp

**Form 3 — Quest Winner** (4 Short Answer fields):
Player Handle / Partner Handle / Team Name / Timestamp

For each form: get pre-filled link → extract `entry.XXXXXXXXX` IDs → paste into `game.js` FORMS section.

## Step 3 — Update Instagram Links in game.js
After publishing the Saturday post, update:
```js
IG_POST_A: 'https://www.instagram.com/p/YOUR_POST_ID/',
IG_POST_B: 'https://www.instagram.com/p/YOUR_POST_ID/',
```
The post must include:
- A link to `stops/stop-a1.html` labelled "Player A"
- A link to `stops/stop-b1.html` labelled "Player B"

---

## Day-of Checklists

### Before Friday 06.03
- [ ] GitHub Pages deployed and tested on phone
- [ ] All 3 Google Forms created and wired into game.js
- [ ] `KAKTUS52` sticker placed inside Kaktus
- [ ] Kaktus staff briefed: "20% screen = valid, any time, no expiry"
- [ ] `INDIE2026` sticker placed at Indieflavours entrance
- [ ] Indieflavours staff briefed: "Win screen = 50% off (or €100 if first team), valid 06–11.03"

### Saturday 07.03 Morning
- [ ] Print and place all 6 location stickers at their spots
- [ ] Test every stop URL by visiting each stop-XX.html, entering the sticker code, confirming fragment reveals
- [ ] At 12:00: publish Instagram post with Player A link and Player B link
- [ ] Update `IG_POST_A` and `IG_POST_B` in game.js → redeploy

### During the Hunt
- [ ] Watch Google Sheet for team registrations and Kaktus claims
- [ ] Watch Winners sheet to know when teams finish
- [ ] Reply to Instagram comments to help solo players find partners
