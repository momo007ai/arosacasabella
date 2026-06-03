// build-lang.js — pre-renders /en/ /fr/ /it/ pages from the German index.html
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const SITE = 'https://www.casabellaarosa.ch';

const TRANSLATIONS = {
  en: {
    locale: 'en_GB',
    title: 'Casa Bella Arosa · Luxury Holiday Apartment to Rent | 142 m², 8 Guests, Terrace',
    description: 'Casa Bella – exclusive alpine-chic holiday apartment in Arosa. 142 m², 73 m² sun terrace with mountain views, 3 bedrooms for up to 8 guests, 2 garage spaces, central & quiet. Holidays in the Arosa Lenzerheide ski area – winter and summer.',
    ogTitle: 'Casa Bella Arosa · Luxury Holiday Apartment with Mountain Views',
    ogDescription: '142 m² of alpine chic at 1,800 m – 73 m² sun terrace overlooking the Arosa mountain church, 3 bedrooms for up to 8 guests. Book your Arosa holiday now.',
    twitterTitle: 'Casa Bella Arosa · Luxury Holiday Apartment with Mountain Views',
    twitterDescription: '142 m² alpine chic with a 73 m² sun terrace in Arosa – up to 8 guests, central & quiet. Book now.'
  },
  fr: {
    locale: 'fr_CH',
    title: 'Casa Bella Arosa · Appartement de vacances de luxe à louer | 142 m², 8 pers., terrasse',
    description: "Casa Bella – appartement de vacances chic alpin exclusif à Arosa. 142 m², terrasse ensoleillée de 73 m² avec vue sur les montagnes, 3 chambres pour 8 personnes, 2 places de garage, central et calme. Vacances dans le domaine skiable d'Arosa Lenzerheide – été comme hiver.",
    ogTitle: 'Casa Bella Arosa · Appartement de vacances de luxe avec vue sur les montagnes',
    ogDescription: "142 m² de chic alpin à 1800 m – terrasse ensoleillée de 73 m² avec vue sur l'église de montagne d'Arosa, 3 chambres pour 8 personnes. Réservez vos vacances à Arosa.",
    twitterTitle: 'Casa Bella Arosa · Appartement de vacances de luxe avec vue sur les montagnes',
    twitterDescription: "142 m² de chic alpin avec terrasse ensoleillée de 73 m² à Arosa – jusqu'à 8 personnes, central et calme. Réservez maintenant."
  },
  it: {
    locale: 'it_CH',
    title: 'Casa Bella Arosa · Appartamento di vacanza di lusso in affitto | 142 m², 8 persone, terrazza',
    description: 'Casa Bella – esclusivo appartamento di vacanza chic alpino ad Arosa. 142 m², terrazza soleggiata di 73 m² con vista sulle montagne, 3 camere per 8 persone, 2 posti garage, centrale e tranquillo. Vacanze nel comprensorio sciistico di Arosa Lenzerheide – estate e inverno.',
    ogTitle: 'Casa Bella Arosa · Appartamento di vacanza di lusso con vista sulle montagne',
    ogDescription: '142 m² di chic alpino a 1800 m – terrazza soleggiata di 73 m² con vista sulla chiesa di montagna di Arosa, 3 camere per 8 persone. Prenota la tua vacanza ad Arosa.',
    twitterTitle: 'Casa Bella Arosa · Appartamento di vacanza di lusso con vista sulle montagne',
    twitterDescription: '142 m² di chic alpino con terrazza soleggiata di 73 m² ad Arosa – fino a 8 persone, centrale e tranquillo. Prenota ora.'
  }
};

const srcPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(srcPath, 'utf8');

for (const lang of ['en', 'fr', 'it']) {
  const t = TRANSLATIONS[lang];
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // 1. set <html lang>
  doc.documentElement.setAttribute('lang', lang);

  // 2. pre-render visible text for every translatable element
  let translatedCount = 0;
  doc.querySelectorAll('[data-' + lang + ']').forEach(el => {
    el.innerHTML = el.getAttribute('data-' + lang);
    translatedCount++;
  });

  // 3. head SEO
  const url = SITE + '/' + lang + '/';
  doc.title = t.title;
  const setMeta = (sel, val) => {
    const m = doc.querySelector(sel);
    if (m) m.setAttribute('content', val);
  };
  setMeta('meta[name="description"]', t.description);
  setMeta('meta[property="og:title"]', t.ogTitle);
  setMeta('meta[property="og:description"]', t.ogDescription);
  setMeta('meta[property="og:locale"]', t.locale);
  setMeta('meta[name="twitter:title"]', t.twitterTitle);
  setMeta('meta[name="twitter:description"]', t.twitterDescription);

  // canonical + og:url to the lang URL
  const canonical = doc.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', url);
  setMeta('meta[property="og:url"]', url);

  // hreflang block left as-is (already identical from Step 1)

  // 4. serialize
  let out = '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;

  // 5. rewrite relative asset paths to root-absolute (pages live in a subfolder)
  out = out
    .split("url('images/").join("url('/images/")
    .split('data-img="images/').join('data-img="/images/')
    .split('href="images/').join('href="/images/')
    .split('href="impressum.html"').join('href="/impressum.html"')
    .split('href="datenschutz.html"').join('href="/datenschutz.html"')
    .split('href="site.webmanifest"').join('href="/site.webmanifest"');

  // 6. write to <lang>/index.html
  const dir = path.join(__dirname, lang);
  fs.mkdirSync(dir, { recursive: true });
  const outPath = path.join(dir, 'index.html');
  fs.writeFileSync(outPath, out, 'utf8');

  console.log(`[${lang}] ${translatedCount} elements translated -> ${lang}/index.html (${out.length} bytes)`);
}

console.log('Done. Generated /en/, /fr/, /it/ pages.');
