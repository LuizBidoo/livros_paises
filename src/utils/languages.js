// MARC codes → English language names for REST Countries /lang/ endpoint
// REST Countries v3.1 uses ISO 639-3 keys internally; searching by English name is most reliable.
// Note: MARC uses bibliographic forms (fre, ger, chi) that differ from ISO 639-3 (fra, deu, zho),
// so ISO 639-1 2-letter codes (/lang/pt) do NOT work — English names do.
export const MARC_TO_LANG_EN = {
  afr: 'afrikaans',   alb: 'albanian',    amh: 'amharic',    ara: 'arabic',
  arm: 'armenian',    aze: 'azerbaijani', baq: 'basque',     bel: 'belarusian',
  ben: 'bengali',     bos: 'bosnian',     bul: 'bulgarian',  cat: 'catalan',
  chi: 'chinese',     cmn: 'chinese',     cze: 'czech',       dan: 'danish',     dut: 'dutch',
  eng: 'english',     est: 'estonian',    fin: 'finnish',    fre: 'french',
  geo: 'georgian',    ger: 'german',      gre: 'greek',      guj: 'gujarati',
  heb: 'hebrew',      hin: 'hindi',       hrv: 'croatian',   hun: 'hungarian',
  ice: 'icelandic',   ind: 'indonesian',  ita: 'italian',    jpn: 'japanese',
  kan: 'kannada',     kaz: 'kazakh',      khm: 'khmer',      kor: 'korean',
  kur: 'kurdish',     lao: 'lao',         lat: 'latvian',    lit: 'lithuanian',
  mac: 'macedonian',  may: 'malay',       mal: 'malayalam',  mar: 'marathi',
  mon: 'mongolian',   nep: 'nepali',      nor: 'norwegian',  per: 'persian',
  pol: 'polish',      por: 'portuguese',  pun: 'punjabi',    rum: 'romanian',
  rus: 'russian',     ser: 'serbian',     sin: 'sinhala',    slk: 'slovak',
  slv: 'slovenian',   som: 'somali',      spa: 'spanish',    swa: 'swahili',
  swe: 'swedish',     tam: 'tamil',       tel: 'telugu',     tha: 'thai',
  tur: 'turkish',     ukr: 'ukrainian',   urd: 'urdu',       uzb: 'uzbek',
  vie: 'vietnamese',  wel: 'welsh',
}

// MARC codes → Portuguese display names
export const MARC_TO_PT = {
  afr: 'Africâner',   alb: 'Albanês',      amh: 'Amárico',
  ara: 'Árabe',       arm: 'Armênio',      aze: 'Azerbaijano',
  baq: 'Basco',       bel: 'Bielorrusso',  ben: 'Bengali',
  bos: 'Bósnio',      bul: 'Búlgaro',      cat: 'Catalão',
  chi: 'Chinês',      cmn: 'Chinês',      cze: 'Tcheco',       dan: 'Dinamarquês',
  dut: 'Holandês',    eng: 'Inglês',       est: 'Estoniano',
  fin: 'Finlandês',   fre: 'Francês',      geo: 'Georgiano',
  ger: 'Alemão',      gre: 'Grego',        guj: 'Gujarati',
  heb: 'Hebraico',    hin: 'Hindi',        hrv: 'Croata',
  hun: 'Húngaro',     ice: 'Islandês',     ind: 'Indonésio',
  ita: 'Italiano',    jpn: 'Japonês',      kan: 'Canarês',
  kaz: 'Cazaque',     khm: 'Khmer',        kor: 'Coreano',
  kur: 'Curdo',       lao: 'Laociano',     lat: 'Letão',
  lit: 'Lituano',     mac: 'Macedônio',    may: 'Malaio',
  mal: 'Malaiala',    mar: 'Marata',       mon: 'Mongol',
  nep: 'Nepali',      nor: 'Norueguês',    per: 'Persa',
  pol: 'Polonês',     por: 'Português',    pun: 'Panjabi',
  rum: 'Romeno',      rus: 'Russo',        ser: 'Sérvio',
  sin: 'Cingalês',    slk: 'Eslovaco',     slv: 'Esloveno',
  som: 'Somali',      spa: 'Espanhol',     swa: 'Suaíli',
  swe: 'Sueco',       tam: 'Tâmil',        tel: 'Telugu',
  tha: 'Tailandês',   tur: 'Turco',        ukr: 'Ucraniano',
  urd: 'Urdu',        uzb: 'Uzbeque',      vie: 'Vietnamita',
  wel: 'Galês',
}

export function getLangDisplay(marcCode) {
  return MARC_TO_PT[marcCode] || marcCode.toUpperCase()
}

export function getLangQuery(marcCode) {
  return MARC_TO_LANG_EN[marcCode] || marcCode
}
