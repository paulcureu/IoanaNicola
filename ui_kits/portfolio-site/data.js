/* Portfolio content: pages, projects, bilingual copy. Plain script; sets window.PORTFOLIO. Pass base = path to project root. */
(function () {
  function pages(base) {
    var out = [];
    for (var i = 1; i <= 15; i++) out.push(base + 'assets/pages/page-' + String(i).padStart(2, '0') + '.jpg');
    return out;
  }
  var D = {"01-plan-situatie":[767,601],"01-plan-parter":[619,823],"01-plan-etaj":[407,745],"01-fatada":[804,418],"01-sectiune-long":[758,431],"01-fatada-trans":[702,379],"01-sectiune-trans":[739,405],"01-schite":[850,1242],"01-macheta-interior":[444,614],"01-macheta-sit":[564,503],"02-plan-situatie":[832,758],"02-axonometrie":[416,1033],"02-plan-parter":[804,431],"02-plan-etaj":[776,392],"02-sectiune":[647,372],"02-sectiune-fatada":[896,372],"02-fatada-strada":[1848,320],"02-macheta":[998,1307],"02-randare-exterior":[1848,1307],"02-randare-coridor":[508,340],"02-randare-curte":[564,340],"02-randare-sala":[517,340],"03-colaj":[1109,954],"03-randare-living":[1848,1307],"04-plan-actual":[499,497],"04-plan-propus":[499,510],"04-profil-actual":[582,392],"04-profil-propus":[748,529],"05-macheta-1":[869,510],"05-macheta-2":[869,516],"05-detaliu-1":[785,523],"05-detaliu-2":[785,510]};
  function im(key, ro, en) { return { key: key, cap: { ro: ro, en: en }, w: D[key][0], h: D[key][1] }; }

  var projects = [
    {
      id: 'moigrad', number: '01', pages: [3, 6], cover: '01-macheta-sit',
      title: { ro: 'Moigrad Porolissum', en: 'Moigrad Porolissum' },
      subtitle: { ro: 'Inserție în așezare rurală', en: 'Insertion in a rural settlement' },
      discipline: { ro: 'Proiectare de arhitectură 3', en: 'Architectural Design 3' },
      place: 'Moigrad Porolissum',
      concept: {
        ro: [
          'Satul Moigrad se dezvoltă pe un relief fragmentat, cu pante line și zone în trepte care dictează modul de amplasare a locuințelor.',
          'Volumetriile caselor sunt în general simple și compacte, adaptate topografiei prin fundații minimale și orientări care urmăresc panta naturală. Trama satului este influențată de curgerea terenului, drumurile urmărind direcțiile naturale ale văilor și culmilor.',
          'Gospodăriile se așază adesea paralel cu linia de nivel, pentru a asigura stabilitate și o relație firească cu peisajul. Această topografie variată oferă perspective valoroase, motiv pentru care construcțiile sunt orientate către deschideri vizuale și fragmente de natură.',
          'Proiectul propune o abordare modulară ce derivă din rigoarea simetrică a caselor tradiționale din Moigrad și logica defensivă a Castrului Roman de la Porolissum, adaptându-se organic reliefului fragmentat. Volumetriile simple și compacte urmează direcțiile naturale ale văilor, orientarea fiind gândită pentru a integra panoramele în experiența locuirii. Ospitalitatea devine un pilon central, terasa frontală funcționând ca o extensie care „îmbrățișează” vizitatorul și marchează gestul primirii.',
          'Compoziția nu se rezumă la un obiect singular, ci se transformă într-un dialog între volume; corpul principal și anexa definesc împreună o curte interioară protejată, replicând cu sensibilitate structura fragmentată a gospodăriilor tradiționale și oferind o experiență a locuirii ancorată în spiritul locului. În contrast cu rigoarea unghiurilor drepte, fereastra circulară devine un punct focal esențial — un „ochi” simbolic ce veghează Măgura Moigradului, ancorând discret locuința în profunzimea peisajului de la Moigrad.'
        ],
        en: [
          'The village of Moigrad unfolds over fragmented terrain, with gentle slopes and stepped ground that dictate how houses are placed.',
          'House volumes are generally simple and compact, adapted to the topography through minimal foundations and orientations that follow the natural slope. The village fabric is shaped by the flow of the land, its roads tracing the natural lines of valleys and ridges.',
          'Households are often set parallel to the contour lines, ensuring stability and a natural relationship with the landscape. This varied topography offers valuable views, which is why buildings are oriented towards visual openings and fragments of nature.',
          'The project proposes a modular approach derived from the symmetrical rigour of Moigrad’s traditional houses and the defensive logic of the Roman fort at Porolissum, adapting organically to the fragmented relief. Simple, compact volumes follow the natural direction of the valleys, oriented to bring the panoramas into the experience of dwelling. Hospitality becomes a central pillar: the front terrace acts as an extension that “embraces” the visitor and marks the gesture of welcome.',
          'The composition is not a single object but a dialogue between volumes; the main house and the annex together define a sheltered inner courtyard, sensitively echoing the fragmented structure of traditional households and offering a way of living anchored in the spirit of the place. Against the rigour of right angles, the circular window becomes an essential focal point — a symbolic “eye” watching over Măgura Moigradului, quietly anchoring the house in the depth of the Moigrad landscape.'
        ]
      },
      groups: [
        { type: 'plans', items: [im('01-plan-situatie', 'Plan de situație', 'Site plan'), im('01-schite', 'Schițe de studiu', 'Study sketches'), im('01-plan-parter', 'Plan parter', 'Ground floor plan'), im('01-plan-etaj', 'Plan etaj', 'Upper floor plan')] },
        { type: 'sections', items: [im('01-fatada', 'Fațadă longitudinală', 'Long elevation'), im('01-sectiune-long', 'Secțiune longitudinală', 'Long section'), im('01-fatada-trans', 'Fațadă transversală', 'Cross elevation'), im('01-sectiune-trans', 'Secțiune transversală', 'Cross section')] },
        { type: 'models', items: [im('01-macheta-interior', 'Machetă — interior', 'Model — interior'), im('01-macheta-sit', 'Machetă de sit', 'Site model')] }
      ]
    },
    {
      id: 'casa', number: '02', pages: [7, 11], cover: '02-macheta',
      title: { ro: 'Concursul CASA', en: 'CASA competition' },
      subtitle: null,
      discipline: { ro: 'Proiectare de arhitectură 4', en: 'Architectural Design 4' },
      place: 'Strada Kossuth',
      team: ['Bude Ioana Nicola', '[Nume coechipier]', '[Nume coechipier]'],
      hero: im('02-randare-exterior', 'Randare exterioară', 'Exterior render'),
      concept: {
        ro: [
          'În centrul designului nostru se află o admirație profundă pentru natură, pe care o percepem ca fiind prima formă de muzică. Cu mult înainte de apariția oricărui instrument, fenomenele meteorologice și sunetele vieții sălbatice au compus acea partitură primordială care ne-a inspirat să creăm.',
          'Acest concept conturează esența proiectului: un mediu cald în care studenții se pot simți complet liberi și în largul lor. Astfel, sălile de repetiție se deschid către curtea interioară, oferind un dialog vizual neîntrerupt cu natura, conceput pentru a susține actul muzical.',
          'La nivel urban, ansamblul propune o conexiune fluidă între Strada Kossuth și parc, orchestrată printr-o compoziție simetrică. Perspectivele cu un singur punct de fugă ghidează pașii trecătorilor, conferind spațiului o coerență vizuală și o frumusețe atemporală.',
          'Din punct de vedere formal, conceptul este ancorat în verticalitate, făcând ecou proporțiilor clădirilor istorice învecinate. Această rigoare se materializează prin stâlpi masivi, transformând curtea într-un spațiu protejat – un refugiu urban permeabil și deschis.'
        ],
        en: [
          'At the heart of our design lies a deep admiration for nature, which we perceive as the first form of music. Long before any instrument existed, weather and the sounds of wildlife composed the primordial score that inspired us to create.',
          'This idea shapes the essence of the project: a warm environment in which students can feel entirely free and at ease. The rehearsal rooms open onto the inner courtyard, offering an uninterrupted visual dialogue with nature, designed to support the act of making music.',
          'At the urban scale, the ensemble proposes a fluid connection between Kossuth Street and the park, orchestrated through a symmetrical composition. Single-point perspectives guide passers-by, giving the space visual coherence and a timeless beauty.',
          'Formally, the concept is anchored in verticality, echoing the proportions of the neighbouring historic buildings. This rigour takes shape in massive piers, turning the courtyard into a protected space — a permeable, open urban refuge.'
        ]
      },
      groups: [
        { type: 'plans', items: [im('02-plan-situatie', 'Plan de situație', 'Site plan'), im('02-axonometrie', 'Diagramă funcțională', 'Programme diagram'), im('02-plan-parter', 'Plan parter', 'Ground floor plan'), im('02-plan-etaj', 'Plan etaj', 'Upper floor plan')] },
        { type: 'sections', items: [im('02-sectiune', 'Secțiune', 'Section'), im('02-sectiune-fatada', 'Secțiune și fațadă', 'Section and elevation'), im('02-fatada-strada', 'Desfășurare stradală', 'Street elevation')] },
        { type: 'models', items: [im('02-macheta', 'Machetă', 'Model')] },
        { type: 'renders', items: [im('02-randare-coridor', 'Galeria spre curte', 'Gallery to the courtyard'), im('02-randare-curte', 'Curtea interioară', 'Inner courtyard'), im('02-randare-sala', 'Sală de repetiție', 'Rehearsal room')] }
      ]
    },
    {
      id: 'ambient', number: '03', pages: [12, 13], cover: '03-randare-living',
      title: { ro: 'Colecții', en: 'Collections' },
      subtitle: null,
      discipline: { ro: 'Ambient', en: 'Interior design' },
      hero: im('03-randare-living', 'Randare interior', 'Interior render'),
      concept: null,
      groups: [
        { type: 'collage', items: [im('03-colaj', 'Colaj', 'Collage')] }
      ]
    },
    {
      id: 'urbanism', number: '04', pages: [14, 14], cover: '04-plan-propus',
      title: { ro: 'Bazele proiectării de urbanism', en: 'Fundamentals of urban design' },
      subtitle: null,
      discipline: { ro: 'Lucrări opționale', en: 'Elective work' },
      concept: null,
      groups: [
        { type: 'plans', items: [im('04-plan-actual', 'Plan — situația existentă', 'Plan — existing'), im('04-plan-propus', 'Plan — propunere', 'Plan — proposal')] },
        { type: 'sections', items: [im('04-profil-actual', 'Profil transversal actual', 'Existing street profile'), im('04-profil-propus', 'Profil transversal propus', 'Proposed street profile')] }
      ]
    },
    {
      id: 'constructii', number: '05', pages: [15, 15], cover: '05-macheta-1',
      title: { ro: 'Elemente de construcții', en: 'Building elements' },
      subtitle: null,
      discipline: { ro: 'Acoperiș — machetă și detalii', en: 'Roof — model and details' },
      concept: null,
      groups: [
        { type: 'models', items: [im('05-macheta-1', 'Machetă — structura acoperișului', 'Model — roof structure'), im('05-macheta-2', 'Machetă — șarpantă', 'Model — roof framing')] },
        { type: 'details', items: [im('05-detaliu-1', 'Detaliu — învelitoare', 'Detail — roof covering'), im('05-detaliu-2', 'Detaliu — coamă', 'Detail — ridge')] }
      ]
    }
  ];

  var sections = {
    ro: [
      { number: '01', title: 'Proiectare de arhitectură 3', subtitle: 'Inserție în așezare rurală, Moigrad Porolissum', page: 3 },
      { number: '02', title: 'Proiectare de arhitectură 4', subtitle: 'Concursul CASA', page: 7 },
      { number: '03', title: 'Ambient', subtitle: 'Colecții', page: 12 },
      { number: '04', title: 'Lucrări opționale', subtitle: 'Bazele proiectării de urbanism', page: 14 },
      { number: '05', title: 'Elemente de construcții', page: 15 }
    ],
    en: [
      { number: '01', title: 'Architectural Design 3', subtitle: 'Rural insertion, Moigrad Porolissum', page: 3 },
      { number: '02', title: 'Architectural Design 4', subtitle: 'CASA competition', page: 7 },
      { number: '03', title: 'Interior', subtitle: 'Collections', page: 12 },
      { number: '04', title: 'Elective work', subtitle: 'Fundamentals of urban design', page: 14 },
      { number: '05', title: 'Building elements', page: 15 }
    ]
  };
  var copy = {
    ro: {
      kicker: 'Portofoliu studențesc', year: 'Anul 2 · 2025–2026', faculty: 'Facultatea de Arhitectură și Urbanism', city: 'Cluj-Napoca',
      open: 'Deschide portofoliul', contents: 'Cuprins', download: 'Descarcă PDF', close: 'Închide', page: 'Pagina',
      swipeHint: 'Glisează pentru a răsfoi', rotateHint: 'Rotește telefonul pentru pagini mai mari', keysHint: '← → pentru a răsfoi',
      toolbar: { prev: 'Înapoi', next: 'Înainte', contents: 'Cuprins', fullscreen: 'Ecran complet', exitFullscreen: 'Ieși din ecran complet', download: 'Descarcă PDF' },
      nav: { projects: 'Proiecte', book: 'Carte', about: 'Despre', menu: 'Meniu' },
      home: { kicker: 'Portofoliu de arhitectură · 2025–2026', browse: 'Răsfoiește portofoliul', projects: 'Vezi proiectele', credit: 'Concursul CASA — randare exterioară' },
      list: { title: 'Proiecte', kicker: 'Anul 2 · 2025–2026', index: 'Index' },
      project: { back: 'Toate proiectele', discipline: 'Disciplină', year: 'An academic', place: 'Loc', team: 'Echipă', teamNote: 'Proiect de echipă', inBook: 'În carte', pages: 'Paginile', pageSingle: 'Pagina', concept: 'Concept', openBook: 'Vezi în carte', prev: 'Proiectul anterior', next: 'Proiectul următor',
        groups: { plans: 'Planșe', sections: 'Secțiuni', models: 'Machete', renders: 'Randări', details: 'Detalii', collage: 'Colaj' } },
      lightbox: { close: 'Închide', prev: 'Imaginea anterioară', next: 'Imaginea următoare' },
      about: { label: 'Despre', lead: 'Studentă în anul 2 la Facultatea de Arhitectură și Urbanism din Cluj-Napoca, grupa 1121.', bio: '[Câteva rânduri despre interesele și felul tău de a lucra — de completat.]',
        contact: 'Contact', email: 'Email', phone: 'Telefon', social: 'Instagram', linkedin: 'LinkedIn', portfolio: 'Portofoliu', pdf: 'Descarcă PDF', book: 'Răsfoiește cartea' },
      footer: { rights: '© 2026 Bude Ioana Nicola' }
    },
    en: {
      kicker: 'Student portfolio', year: 'Year 2 · 2025–2026', faculty: 'Faculty of Architecture and Urbanism', city: 'Cluj-Napoca',
      open: 'Open portfolio', contents: 'Contents', download: 'Download PDF', close: 'Close', page: 'Page',
      swipeHint: 'Swipe to browse', rotateHint: 'Turn your phone sideways for larger pages', keysHint: '← → to turn pages',
      toolbar: { prev: 'Previous', next: 'Next', contents: 'Contents', fullscreen: 'Full screen', exitFullscreen: 'Exit full screen', download: 'Download PDF' },
      nav: { projects: 'Projects', book: 'Book', about: 'About', menu: 'Menu' },
      home: { kicker: 'Architecture portfolio · 2025–2026', browse: 'Browse the portfolio', projects: 'See the projects', credit: 'CASA competition — exterior render' },
      list: { title: 'Projects', kicker: 'Year 2 · 2025–2026', index: 'Index' },
      project: { back: 'All projects', discipline: 'Course', year: 'Academic year', place: 'Location', team: 'Team', teamNote: 'Team project', inBook: 'In the book', pages: 'Pages', pageSingle: 'Page', concept: 'Concept', openBook: 'View in the book', prev: 'Previous project', next: 'Next project',
        groups: { plans: 'Drawings', sections: 'Sections', models: 'Models', renders: 'Renders', details: 'Details', collage: 'Collage' } },
      lightbox: { close: 'Close', prev: 'Previous image', next: 'Next image' },
      about: { label: 'About', lead: 'Second-year student at the Faculty of Architecture and Urbanism, Cluj-Napoca, group 1121.', bio: '[A few lines about your interests and the way you work — to be completed.]',
        contact: 'Contact', email: 'Email', phone: 'Phone', social: 'Instagram', linkedin: 'LinkedIn', portfolio: 'Portfolio', pdf: 'Download PDF', book: 'Browse the book' },
      footer: { rights: '© 2026 Bude Ioana Nicola' }
    }
  };
  window.PORTFOLIO = {
    name: 'Bude Ioana Nicola', short: 'FAU Cluj-Napoca', total: 15, aspect: 842 / 595, year: '2025–2026',
    pdf: 'assets/portofoliu-bude-ioana-nicola.pdf', pdfName: 'Bude_Ioana_Nicola_Portofoliu.pdf',
    contact: { email: '[adresa@email.ro]', phone: '[+40 7xx xxx xxx]', social: '[@utilizator]', linkedin: '[linkedin.com/in/…]' },
    pages: pages, projects: projects, sections: sections, copy: copy
  };
})();
