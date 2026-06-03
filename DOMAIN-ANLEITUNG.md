# Casa Bella – Website online stellen & Domain verbinden

Repo: **github.com/momo007ai/arosacasabella**

---

## Schritt 1 — GitHub Pages aktivieren (gratis, einmalig)

1. Repo öffnen → oben auf **Settings**
2. Links im Menü auf **Pages**
3. Unter **Build and deployment → Source**: „**Deploy from a branch**" wählen
4. Branch: **`main`**, Ordner: **`/ (root)`** → **Save**
5. Nach ~1 Minute ist die Seite live unter:

   ### 👉 https://momo007ai.github.io/arosacasabella/

Diese Adresse funktioniert sofort und gratis. Die eigene Domain (Schritt 3) kommt einfach „obendrauf" – die Seite bleibt dieselbe.

---

## Schritt 2 — Domain kaufen

Empfohlene Schweizer Anbieter (.ch ≈ CHF 12–17/Jahr):
- **Hostpoint** (hostpoint.ch) – Schweizer Marktführer, einfaches Panel
- **Infomaniak** (infomaniak.com) – Schweizer Hoster, gute DNS-Verwaltung
- **Cyon** (cyon.ch) – Basel, sehr guter Support

Beispiel-Namen, die zur Wohnung passen:
`casa-bella-arosa.ch` · `casabella-arosa.ch` · `ferienwohnung-arosa.ch`

> Tipp: Du kannst auch **www** + die nackte Domain (ohne www) beide nutzen – die Anleitung unten deckt beides ab.

---

## Schritt 3 — Domain mit GitHub verbinden

### 3a) DNS-Einträge beim Domain-Anbieter setzen

**Für die nackte Domain** (z. B. `casa-bella-arosa.ch`) → 4 **A**-Records:

| Typ | Name / Host | Wert |
|-----|-------------|------|
| A   | @           | 185.199.108.153 |
| A   | @           | 185.199.109.153 |
| A   | @           | 185.199.110.153 |
| A   | @           | 185.199.111.153 |

Optional zusätzlich 4 **AAAA**-Records (IPv6, empfohlen):

| Typ  | Name / Host | Wert |
|------|-------------|------|
| AAAA | @           | 2606:50c0:8000::153 |
| AAAA | @           | 2606:50c0:8001::153 |
| AAAA | @           | 2606:50c0:8002::153 |
| AAAA | @           | 2606:50c0:8003::153 |

**Für www** → 1 **CNAME**-Record:

| Typ   | Name / Host | Wert |
|-------|-------------|------|
| CNAME | www         | momo007ai.github.io |

> Falls du stattdessen eine **Subdomain** nutzt (z. B. `arosa.mrmpeople.ch`):
> Dann brauchst du NUR EINEN Eintrag: `CNAME` · Host `arosa` · Wert `momo007ai.github.io`
> (keine A-/AAAA-Records nötig).

### 3b) In GitHub eintragen

1. Repo → **Settings → Pages**
2. Feld **Custom domain**: deine Domain eintippen (z. B. `casa-bella-arosa.ch`) → **Save**
   → GitHub legt automatisch eine Datei `CNAME` im Repo an.
3. Warten, bis der grüne Haken „DNS check successful" erscheint (kann bis zu 24 h dauern, meist < 1 h).
4. Häkchen bei **Enforce HTTPS** setzen → fertig, Seite läuft verschlüsselt über deine Domain. 🔒

---

## Häufige Stolpersteine
- **„DNS check in progress" bleibt lange**: DNS-Änderungen brauchen Zeit (TTL). Einfach warten.
- **HTTPS-Häkchen ausgegraut**: Erst möglich, wenn der DNS-Check grün ist. Etwas Geduld.
- **www zeigt Fehler, nackte Domain geht (oder umgekehrt)**: Beide Record-Typen (A + CNAME www) wie oben setzen.

Wenn du die Domain gekauft hast: gib mir den Namen und den Anbieter durch – dann führe ich dich Klick für Klick durch die DNS-Einstellung.
