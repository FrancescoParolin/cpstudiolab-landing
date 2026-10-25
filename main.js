// ══════════════════════════════════════════════════════════════════
// CP Studio Lab — landing: movimento e piccoli aiuti.
// Solo miglioramenti: senza JavaScript la pagina è completa e il modulo funziona.
// .js (subito) abilita l'apertura che resta ferma;
// .moto (per ultima, se tutto è andato bene) abilita gli stati nascosti degli ingressi:
// se questo file non arriva o si ferma a metà, nulla resta nascosto.
// Con «riduci movimento» attivo nulla si muove: tutto resta nello stato finale.
// Si animano solo transform e opacity (le regole sono in style.css, sezione Movimento).
// ══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const radice = document.documentElement;
  radice.classList.add('js');

  const ridotto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const largo = window.matchMedia('(min-width: 1024px)');
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const fra = (x, min, max) => Math.min(max, Math.max(min, x));
  // i token di style.css: la griglia del mirino e l'altezza della testata vengono da lì
  const token = (nome, riserva) => parseFloat(getComputedStyle(radice).getPropertyValue(nome)) || riserva;

  // ── Modulo: i messaggi d'errore del browser danno del tu; questi danno del voi ──
  $$('input[data-errore]').forEach((campo) => {
    campo.addEventListener('invalid', () => {
      if (campo.validity.valueMissing) campo.setCustomValidity(campo.dataset.errore);
    });
    campo.addEventListener('input', () => campo.setCustomValidity(''));
  });

  // ── Navigazione: evidenzia la sezione in cui vi trovate, nella nav e nel menu (nessuna, se non è nel menu) ──
  const vociNav = new Map();
  $$('.nav a[href^="#"], .menu-voci a[href^="#"]').forEach((a) => {
    const sezione = document.getElementById(a.getAttribute('href').slice(1));
    if (!sezione) return;
    if (!vociNav.has(sezione)) vociNav.set(sezione, []);
    vociNav.get(sezione).push(a);
  });
  if (vociNav.size && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((voci) => {
      voci.forEach((v) => {
        if (!v.isIntersecting) return;
        vociNav.forEach((link) => link.forEach((a) => { a.classList.remove('corrente'); a.removeAttribute('aria-current'); }));
        (vociNav.get(v.target) || []).forEach((a) => { a.classList.add('corrente'); a.setAttribute('aria-current', 'true'); });
      });
    }, { rootMargin: '-50% 0px -50% 0px' });
    $$('main section').forEach((sezione) => io.observe(sezione));
  }

  // ── Menu a schermo intero: un dialogo modale. Mentre è aperto il resto della pagina è inerte,
  //    quindi il fuoco resta nel menu; Esc lo chiude e il fuoco torna al bottone «Menu». ──
  const menu = document.getElementById('menu');
  const apriMenu = document.querySelector('.menu-apri');
  if (menu && apriMenu && 'inert' in HTMLElement.prototype) {
    const chiudiMenuBtn = menu.querySelector('.menu-chiudi');
    const resto = $$('body > *').filter((el) => el !== menu && el.tagName !== 'SCRIPT');
    const durata = ridotto ? 0 : token('--lunga', 1) * 1000;
    let attesa = 0;

    // le lettere delle voci, una per una, per lo scorrimento al passaggio del mouse (il nome resta intero per i lettori)
    if (!ridotto) {
      $$('.menu-etichetta').forEach((voce) => {
        const testo = voce.textContent;
        voce.textContent = '';
        const nome = document.createElement('span');
        nome.className = 'nascosto';
        nome.textContent = testo;
        const lettere = document.createElement('span');
        lettere.className = 'menu-lettere';
        lettere.setAttribute('aria-hidden', 'true');
        [...testo].forEach((c, i) => {
          const l = document.createElement('span');
          l.textContent = c === ' ' ? '\u00a0' : c;
          l.style.setProperty('--i', i);
          lettere.appendChild(l);
        });
        voce.append(nome, lettere);
      });
    } else {
      $$('.menu-etichetta').forEach((voce) => {
        const lettere = document.createElement('span');
        lettere.className = 'menu-lettere';
        lettere.textContent = voce.textContent;
        voce.textContent = '';
        voce.appendChild(lettere);
      });
    }

    const apri = () => {
      clearTimeout(attesa);
      menu.hidden = false;
      menu.classList.remove('chiude');
      void menu.offsetWidth;                      // lo stato di partenza viene disegnato prima della transizione
      menu.classList.add('aperto');
      radice.classList.add('menu-aperto');
      apriMenu.setAttribute('aria-expanded', 'true');
      resto.forEach((el) => { el.inert = true; });
      const prima = menu.querySelector('.menu-voci a');
      if (prima) prima.focus({ preventScroll: true });
    };
    const chiudi = (restituisci = true) => {
      if (menu.hidden || !menu.classList.contains('aperto')) return;
      menu.classList.remove('aperto');
      menu.classList.add('chiude');
      radice.classList.remove('menu-aperto');
      apriMenu.setAttribute('aria-expanded', 'false');
      resto.forEach((el) => { el.inert = false; });
      if (restituisci) apriMenu.focus({ preventScroll: true });
      attesa = setTimeout(() => { menu.hidden = true; menu.classList.remove('chiude'); }, durata);
    };

    apriMenu.addEventListener('click', apri);
    if (chiudiMenuBtn) chiudiMenuBtn.addEventListener('click', () => chiudi());
    menu.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.preventDefault(); chiudi(); } });
    // una voce porta alla sua sezione: il foglio esce in alto e scopre la pagina già al posto giusto
    menu.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', () => chiudi(false)));
    apriMenu.hidden = false;
    radice.classList.add('menu-pronto');
  }

  // ── Calibro passa / non passa: tutto nella pagina, non si invia niente.
  //    La lancetta segna quante risposte passano; a domande finite, il primo lavoro consigliato. ──
  const calibro = document.getElementById('calibro');
  if (calibro) {
    const domande = $$('.calibro-domanda');
    const lancetta = calibro.querySelector('.lancetta');
    const punteggio = calibro.querySelector('.calibro-punteggio');
    const consiglio = calibro.querySelector('.calibro-consiglio');
    const porta = calibro.querySelector('.calibro-porta');
    const ordine = ['Sito', 'Google', 'CRM e follow-up', 'Automazioni'];
    const perche = {
      'Sito': 'Il sito è il primo pezzo: senza, Google e CRM lavorano a vuoto.',
      'Google': 'Il sito c’è, ma chi cerca un fornitore non vi trova.',
      'CRM e follow-up': 'Le richieste arrivano, ma si perdono per strada.',
      'Automazioni': 'Le richieste ci sono: ora si tratta di rispondere prima.',
      'Manutenzione': 'Per restare così basta una mano ogni mese.',
    };
    let consigliato = '';
    const valuta = () => {
      let risposte = 0;
      let passa = 0;
      const mancanze = {};
      domande.forEach((d) => {
        const scelta = d.querySelector('input:checked');
        if (!scelta) return;
        risposte += 1;
        if (scelta.value === 'si') passa += 1;
        else mancanze[d.dataset.servizio] = (mancanze[d.dataset.servizio] || 0) + 1;
      });
      if (lancetta) lancetta.style.setProperty('--angolo', (passa / domande.length) * 180 + 'deg');
      if (risposte < domande.length) {
        punteggio.textContent = `${passa} su ${domande.length} passano · ${domande.length - risposte} da rispondere`;
        consiglio.textContent = '';
        porta.hidden = true;
        return;
      }
      consigliato = passa === domande.length
        ? 'Manutenzione'
        : ordine.reduce((a, b) => ((mancanze[b] || 0) > (mancanze[a] || 0) ? b : a), ordine[0]);
      punteggio.textContent = `${passa} su ${domande.length} passano.`;
      consiglio.textContent = `Primo lavoro consigliato: ${consigliato}. ${perche[consigliato]}`;
      porta.hidden = false;
    };
    calibro.addEventListener('change', valuta);
    // il risultato passa al modulo: la scelta consigliata è già spuntata
    porta.addEventListener('click', () => {
      const casella = document.querySelector(`.scelte input[value="${consigliato}"]`);
      if (casella) casella.checked = true;
      setTimeout(() => {
        const campo = document.getElementById('campo-azienda');
        if (campo) campo.focus({ preventScroll: true });
      }, 50);
    });
    calibro.hidden = false;
  }

  // ── Percorsi delle pagine di settore: il link porta qui con ?percorso=…
  //    Nel modulo spuntiamo i servizi del percorso e lo scriviamo nel campo nascosto «percorso»,
  //    così nella richiesta si vede da quale percorso arriva. Le scelte restano modificabili. ──
  const percorsi = {
    'da-zero': { nome: 'Da zero', servizi: ['Sito', 'Google'] },
    'richieste': { nome: 'Il sito c’è, le richieste no', servizi: ['Sito', 'Google', 'CRM e follow-up'] },
    'estero': { nome: 'Nuovi clienti, anche all’estero', servizi: ['Sito', 'Google', 'CRM e follow-up'] },
  };
  const modulo = document.getElementById('richiesta');
  const scelto = percorsi[new URLSearchParams(location.search).get('percorso')];
  if (modulo && scelto) {
    scelto.servizi.forEach((valore) => {
      const casella = modulo.querySelector(`input[name="servizi[]"][value="${valore}"]`);
      if (casella) casella.checked = true;
    });
    const campo = modulo.querySelector('input[name="percorso"]');
    if (campo) campo.value = scelto.nome;
    const legenda = modulo.querySelector('.scelte legend');
    if (legenda) {
      const nota = document.createElement('p');
      nota.className = 'modulo-percorso';
      nota.textContent = `Dal percorso «${scelto.nome}»: i servizi sono già spuntati, cambiateli pure.`;
      legenda.after(nota);
    }
  }

  // ── Sito d'esempio: il modulo non invia niente, lo dice ──
  const esempioInviato = (e) => {
    if (e) e.preventDefault();
    const esito = document.querySelector('.officina-esito');
    if (esito) esito.textContent = 'È un esempio: non è stato inviato niente.';
  };
  $$('[data-esempio-invia]').forEach((b) => b.addEventListener('click', () => esempioInviato()));
  $$('.officina-modulo').forEach((f) => f.addEventListener('submit', esempioInviato));

  // Tutto il resto si calcola dalla posizione, non dagli ingressi: anche un salto con i link lo aggiorna.
  let daMostrare = $$('[data-entra]');                 // entrano una volta sola, ognuno alla sua soglia
  const frasi = $$('.frase');                          // si accendono e si rispengono
  const apertura = document.querySelector('.apertura');
  const punto = document.querySelector('.punto');
  const ciclo = document.querySelector('.ciclo');
  const simbolo = document.querySelector('.simbolo-componibile');
  const fasi = ciclo ? Array.from(ciclo.querySelectorAll('.fase')) : [];
  let soglieFasi = [];
  let inAttesa = false;

  // L'apertura resta ferma sotto la testata; se è più alta dello schermo, si ferma quando ne avete
  // visto il fondo. clientHeight non cambia quando il telefono nasconde le sue barre.
  // Sul ciclo largo, ogni fase si accende quando la linea arriva al centro della sua tessera.
  function misura() {
    if (apertura) {
      const testata = document.querySelector('.testata');
      const alta = testata ? testata.offsetHeight : token('--testata', 64);
      radice.style.setProperty('--apertura-top', Math.min(alta, radice.clientHeight - apertura.offsetHeight) + 'px');
    }
    if (ciclo) {
      const r = ciclo.getBoundingClientRect();
      soglieFasi = fasi.map((f) => {
        const s = f.querySelector('.fase-segno').getBoundingClientRect();
        return r.width ? (s.left + s.width / 2 - r.left) / r.width : 0;
      });
    }
  }

  function aggiorna() {
    inAttesa = false;
    const h = window.innerHeight;

    if (ridotto) return;

    // Ingressi: quando superano la loro linea (data-entra, frazione dello schermo; 0,88 se vuoto) restano così
    daMostrare = daMostrare.filter((el) => {
      if (el.getBoundingClientRect().top > h * (parseFloat(el.dataset.entra) || 0.88)) return true;
      el.classList.add('visibile');
      return false;
    });

    // Il punto: una frase è letta quando sale sopra i due terzi dello schermo
    frasi.forEach((f) => f.classList.toggle('letta', f.getBoundingClientRect().top < h * 0.67));

    // L'apertura si allontana mentre il foglio verde la copre: da 0 a 1
    if (apertura && punto) {
      const copertura = fra(1 - punto.getBoundingClientRect().top / h, 0, 1);
      apertura.style.setProperty('--copertura', copertura.toFixed(3));
    }

    // Chi siamo: le tessere si incastrano mentre il marchio sale dal fondo dello schermo fino a 2/3
    if (simbolo) {
      const r = simbolo.getBoundingClientRect();
      simbolo.style.setProperty('--incastro', fra((h - r.top) / (h * 0.35), 0, 1).toFixed(3));
    }

    // Il ciclo: su telefono la linea scende con lo sguardo; su schermo largo le fasi sono in fila
    // e la linea corre da sinistra mentre il ciclo sale dall'85% al 35% dello schermo.
    if (ciclo) {
      const r = ciclo.getBoundingClientRect();
      if (largo.matches) {
        const avanzamento = fra((h * 0.85 - r.top) / (h * 0.5), 0, 1);
        ciclo.style.setProperty('--avanzamento', avanzamento.toFixed(3));
        fasi.forEach((f, i) => f.classList.toggle('raggiunta', avanzamento > 0 && avanzamento >= soglieFasi[i]));
      } else {
        const linea = h * 0.66;
        ciclo.style.setProperty('--avanzamento', fra((linea - r.top) / r.height, 0, 1).toFixed(3));
        fasi.forEach((f) => {
          const segno = f.querySelector('.fase-segno');
          if (segno) f.classList.toggle('raggiunta', segno.getBoundingClientRect().top < linea);
        });
      }
    }
  }

  function chiedi() {
    if (inAttesa) return;
    inAttesa = true;
    window.requestAnimationFrame(aggiorna);
  }

  // ── Apertura: il mirino del CAD segue il puntatore, agganciato alla griglia di 8px ──
  const carta = document.querySelector('.apertura-scena');
  const mirino = document.querySelector('.mirino');
  if (!ridotto && carta && mirino && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const valore = mirino.querySelector('.mirino-valore');
    const passo = token('--s1', 8);
    let px = 0;
    let py = 0;
    let mirinoInAttesa = false;
    const sposta = () => {
      mirinoInAttesa = false;
      const r = carta.getBoundingClientRect();
      const scala = r.width / carta.offsetWidth || 1;   // mentre il foglio verde la copre, la carta è scalata
      const x = Math.round((px - r.left) / scala / passo) * passo;
      const y = Math.round((py - r.top) / scala / passo) * passo;
      mirino.style.setProperty('--mx', x + 'px');
      mirino.style.setProperty('--my', y + 'px');
      if (valore) valore.textContent = 'X ' + x / passo + '   Y ' + y / passo;
    };
    carta.addEventListener('pointermove', (e) => {
      px = e.clientX;
      py = e.clientY;
      if (mirinoInAttesa) return;
      mirinoInAttesa = true;
      window.requestAnimationFrame(sposta);
    }, { passive: true });
  }

  misura();
  aggiorna();                                    // ciò che è già a schermo è segnato prima di .moto: nessun lampo
  if (!ridotto) radice.classList.add('moto');
  window.addEventListener('scroll', chiedi, { passive: true });
  window.addEventListener('resize', chiedi);
  // le misure cambiano quando arrivano i font o cambia la larghezza
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(() => { misura(); chiedi(); });
    [apertura, ciclo].forEach((el) => { if (el) ro.observe(el); });
  } else {
    window.addEventListener('resize', misura);
  }
})();
