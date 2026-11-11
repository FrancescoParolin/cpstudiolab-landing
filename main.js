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

  // ── Calibro passa / non passa: non si invia niente.
  //    Nella pagina resta una fascia; le otto domande stanno in una finestra (<dialog>), una alla volta.
  //    La finestra si apre solo con un clic. La lancetta segna quante risposte passano, le tacche quante
  //    domande hanno una risposta; a domande finite, il primo lavoro consigliato.
  //    Le risposte restano in sessionStorage: chiudendo a metà si riprende da dove si era.
  //    Dopo «Il punto» un banner non modale lo propone; il risultato si può portare nel modulo.
  //    Per le misure future, su document partono gli eventi: calibro:banner-visto, calibro:banner-chiuso,
  //    calibro:aperto (detail.origine: fascia o banner), calibro:risposta (detail.domanda),
  //    calibro:completato (detail.punteggio), calibro:portato. Nessuno strumento li ascolta, per ora. ──
  const CHIAVE_CALIBRO = 'cpsl-calibro';
  const memoria = {
    leggi() { try { return JSON.parse(sessionStorage.getItem(CHIAVE_CALIBRO)) || {}; } catch (e) { return {}; } },
    scrivi(stato) { try { sessionStorage.setItem(CHIAVE_CALIBRO, JSON.stringify(stato)); } catch (e) { /* senza memoria si riparte da capo */ } },
  };
  const avvisa = (nome, dettaglio) => document.dispatchEvent(new CustomEvent('calibro:' + nome, { detail: dettaglio || {} }));

  const calibro = document.getElementById('calibro');
  if (calibro) {
    const domande = $$('.calibro-domanda');
    const elenco = calibro.querySelector('.calibro-domande');
    const strumento = calibro.querySelector('.comparatore');
    const lancetta = calibro.querySelector('.lancetta');
    const testo = calibro.querySelector('.calibro-testo');
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
    let passano = 0;
    let completo = false;
    let tacche = [];                                // nella finestra: una tacca per domanda, si accende con la risposta
    const inizio = punteggio.textContent;           // «Rispondete alle otto domande.»: resta finché non c'è una risposta
    const valuta = () => {
      let risposte = 0;
      let passa = 0;
      const mancanze = {};
      domande.forEach((d, i) => {
        const scelta = d.querySelector('input:checked');
        if (tacche[i + 1]) tacche[i + 1].classList.toggle('accesa', !!scelta);
        if (!scelta) return;
        risposte += 1;
        if (scelta.value === 'si') passa += 1;
        else mancanze[d.dataset.servizio] = (mancanze[d.dataset.servizio] || 0) + 1;
      });
      passano = passa;
      completo = risposte === domande.length;
      if (lancetta) lancetta.style.setProperty('--angolo', (passa / domande.length) * 180 + 'deg');
      if (risposte < domande.length) {
        punteggio.textContent = risposte
          ? `${passa} su ${domande.length} passano · ${domande.length - risposte} da rispondere`
          : inizio;
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
    const esito = () => ({ passa: passano, totale: domande.length, servizio: consigliato, frasi: [punteggio.textContent, consiglio.textContent] });
    const salva = () => {
      const stato = memoria.leggi();
      stato.r = domande.map((d) => { const s = d.querySelector('input:checked'); return s ? s.value : null; });
      stato.esito = completo ? esito() : null;
      if (!completo) stato.portato = false;
      memoria.scrivi(stato);
    };
    // Le risposte della sessione tornano al loro posto
    (memoria.leggi().r || []).forEach((valore, i) => {
      const scelta = valore && domande[i] && domande[i].querySelector(`input[value="${valore}"]`);
      if (scelta) scelta.checked = true;
    });
    // il risultato passa al modulo: la scelta consigliata è già spuntata, sopra i campi compare il riepilogo
    const portaAlModulo = () => {
      const casella = document.querySelector(`.scelte input[value="${consigliato}"]`);
      if (casella) casella.checked = true;
      const stato = memoria.leggi();
      stato.portato = true;
      memoria.scrivi(stato);
      avvisa('portato', { punteggio: passano, consiglio: consigliato, esito: esito() });
      setTimeout(() => {
        const campo = document.getElementById('campo-azienda');
        if (campo) campo.focus({ preventScroll: true });
      }, 50);
    };

    if (typeof HTMLDialogElement === 'function' && HTMLDialogElement.prototype.showModal) {
      const due = (n) => String(n).padStart(2, '0');
      const occhiello = calibro.querySelector('.sezione-testa .micro');
      const titolo = calibro.querySelector('.titolo-sezione');
      const sotto = calibro.querySelector('.sezione-sotto');

      // La finestra: in alto occhiello e «Chiudi», come nel menu; sotto titolo, strumento e una domanda alla volta
      const finestra = document.createElement('dialog');
      finestra.className = 'calibro-finestra';
      finestra.setAttribute('aria-labelledby', 'titolo-finestra-calibro');
      finestra.innerHTML = `
        <div class="finestra-testa">
          <p class="micro"></p>
          <button class="finestra-chiudi" type="button"><span>Chiudi</span><span class="menu-icona menu-icona-x" aria-hidden="true"><span></span><span></span></span></button>
        </div>
        <div class="finestra-corpo">
          <div class="finestra-intro"><h2 class="finestra-titolo" id="titolo-finestra-calibro"></h2><p class="finestra-sotto"></p></div>
          <div class="finestra-riga">
            <button class="finestra-indietro" type="button" aria-label="Domanda precedente"><svg class="freccia" aria-hidden="true" focusable="false"><use href="#freccia"/></svg></button>
            <p class="finestra-contatore"></p>
          </div>
        </div>`;
      const corpo = finestra.querySelector('.finestra-corpo');
      const riga = finestra.querySelector('.finestra-riga');
      const indietro = finestra.querySelector('.finestra-indietro');
      const contatore = finestra.querySelector('.finestra-contatore');
      finestra.querySelector('.finestra-testa .micro').textContent = occhiello.textContent;
      finestra.querySelector('.finestra-titolo').textContent = titolo.textContent;
      finestra.querySelector('.finestra-sotto').textContent = sotto.textContent;

      // Nella pagina resta una copia dello strumento; quello vero, con le domande e il risultato, entra nella finestra
      const copia = strumento.cloneNode(true);
      const lancettaFascia = copia.querySelector('.lancetta');
      const accese = strumento.querySelector('.comparatore-tacche').cloneNode(true);
      accese.setAttribute('class', 'comparatore-accese');
      strumento.querySelector('.comparatore-tacche').after(accese);
      tacche = Array.from(accese.children);
      if (tacche[0]) tacche[0].classList.add('accesa');   // lo zero è il punto di partenza
      riga.before(strumento, testo);
      corpo.append(elenco, porta);
      document.body.appendChild(finestra);

      let indice = 0;                               // la domanda a schermo; domande.length è il risultato
      let passaggio = 0;
      let apertoDa = null;
      let portato = false;
      let annunciato = '';                          // l'ultimo risultato già segnalato con calibro:completato
      let aggiornaBanner = () => {};                // lo definisce il banner, se in questa pagina è acceso
      const aSchermo = (el) => el && el.isConnected && el.getClientRects().length > 0 && !el.closest('.calibro-banner:not(.visibile)');
      const primaLibera = () => {
        const i = domande.findIndex((d) => !d.querySelector('input:checked'));
        return i < 0 ? domande.length : i;
      };
      const mostra = (i, verso, fuoco) => {
        indice = i;
        const finito = i >= domande.length;
        finestra.dataset.stato = finito ? 'esito' : 'domande';
        finestra.dataset.passo = i + 1;
        domande.forEach((d, j) => {
          d.classList.toggle('attuale', j === i);
          d.classList.toggle('entra', j === i && verso > 0);
          d.classList.toggle('rientra', j === i && verso < 0);
        });
        contatore.textContent = finito ? '' : `${due(i + 1)} / ${due(domande.length)}`;
        indietro.disabled = i === 0;
        if (!fuoco) return;
        const meta = finito ? porta : domande[i].querySelector('input:checked') || domande[i].querySelector('input');
        if (meta) meta.focus({ preventScroll: true });
      };
      const aggiornaFascia = () => {
        calibro.classList.toggle('calibro-completato', completo);
        lancettaFascia.style.setProperty('--angolo', (completo ? (passano / domande.length) * 180 : 0) + 'deg');
      };

      // Una risposta: la scelta si evidenzia, poco dopo arriva la domanda successiva.
      // Si ascolta il clic e non «change»: così, tornati indietro, la stessa risposta ridata fa proseguire.
      elenco.addEventListener('click', (e) => {
        const scelta = e.target.closest('input[type="radio"]');
        if (!scelta) return;
        const i = domande.indexOf(scelta.closest('.calibro-domanda'));
        valuta();
        salva();
        avvisa('risposta', { domanda: i + 1 });
        clearTimeout(passaggio);
        passaggio = setTimeout(() => {
          mostra(i + 1, 1, true);
          const chiave = completo ? `${passano}|${consigliato}` : '';
          if (i + 1 === domande.length && chiave && chiave !== annunciato) {
            annunciato = chiave;
            avvisa('completato', { punteggio: passano, consiglio: consigliato });
          }
        }, 300);
      });
      // Tastiera: le frecce spostano il fuoco tra «Sì» e «No» senza scegliere; scelgono Spazio o Invio
      elenco.addEventListener('keydown', (e) => {
        const scelta = e.target.closest('input[type="radio"]');
        if (!scelta) return;
        if (e.key === 'Enter') { e.preventDefault(); scelta.click(); return; }
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
        e.preventDefault();
        const coppia = Array.from(scelta.closest('.calibro-domanda').querySelectorAll('input[type="radio"]'));
        coppia[(coppia.indexOf(scelta) + 1) % coppia.length].focus();
      });
      indietro.addEventListener('click', () => {
        clearTimeout(passaggio);
        mostra(Math.max(0, indice - 1), -1, true);
      });

      const apri = (origine, daDove) => {
        if (finestra.open) return;
        apertoDa = daDove;
        mostra(primaLibera(), 0);
        radice.classList.add('finestra-aperta');
        finestra.showModal();
        const meta = completo ? porta : domande[indice].querySelector('input:checked') || domande[indice].querySelector('input');
        if (meta) meta.focus({ preventScroll: true });
        avvisa('aperto', { origine });
      };
      const chiudi = () => {
        clearTimeout(passaggio);
        radice.classList.remove('finestra-aperta');
        if (finestra.open) finestra.close();
      };
      // «close» arriva anche con Esc: il fuoco torna a chi ha aperto la finestra
      finestra.addEventListener('close', () => {
        clearTimeout(passaggio);
        radice.classList.remove('finestra-aperta');
        aggiornaFascia();
        aggiornaBanner();
        if (!portato) (aSchermo(apertoDa) ? apertoDa : apriFascia).focus({ preventScroll: true });
        portato = false;
      });
      finestra.querySelector('.finestra-chiudi').addEventListener('click', chiudi);
      // un clic sul velo, fuori dalla finestra, la chiude
      let premutoFuori = false;
      finestra.addEventListener('pointerdown', (e) => { premutoFuori = e.target === finestra; });
      finestra.addEventListener('click', (e) => { if (premutoFuori && e.target === finestra) chiudi(); });

      // «Portate il risultato nella richiesta»: la finestra si chiude, la pagina va al modulo, il fuoco al primo campo
      porta.addEventListener('click', () => {
        portato = true;
        chiudi();
        portaAlModulo();
      });

      // La fascia nella pagina: tutta cliccabile, apre la finestra
      const testa = calibro.querySelector('.sezione-testa');
      const apriFascia = document.createElement('button');
      apriFascia.type = 'button';
      apriFascia.className = 'calibro-apri';
      apriFascia.setAttribute('aria-labelledby', titolo.id);
      apriFascia.setAttribute('aria-haspopup', 'dialog');
      apriFascia.innerHTML = '<svg class="freccia" aria-hidden="true" focusable="false"><use href="#freccia"/></svg>';
      testa.append(copia, apriFascia);
      apriFascia.addEventListener('click', () => apri('fascia', apriFascia));
      calibro.classList.add('calibro-fascia');

      valuta();
      if (completo) annunciato = `${passano}|${consigliato}`;
      aggiornaFascia();

      // Il banner: un riquadro non modale, in basso, che propone il calibro. La pagina resta leggibile e usabile.
      // Si accende con l'attributo data-calibro-banner sull'elemento dopo il quale deve comparire (nella home «Il punto»):
      // compare quando la fine di quell'elemento è uscita dallo schermo, mai prima e mai a tempo.
      // Non c'è mentre la fascia o un modulo sono a schermo, a calibro finito, con menu o finestra aperti (style.css),
      // e per 30 giorni dopo la ✕ (localStorage). In un'altra pagina serve anche il blocco #calibro, da cui prende testi e domande.
      const CHIAVE_BANNER = 'cpsl-calibro-banner';
      const TRENTA_GIORNI = 30 * 24 * 60 * 60 * 1000;
      const innesco = document.querySelector('[data-calibro-banner]');
      let chiusoDaPoco = false;
      try { chiusoDaPoco = Date.now() - Number(localStorage.getItem(CHIAVE_BANNER) || 0) < TRENTA_GIORNI; } catch (e) { /* senza memoria il banner si comporta come la prima volta */ }
      if (innesco && 'IntersectionObserver' in window && !chiusoDaPoco) {
        const banner = document.createElement('aside');
        banner.className = 'calibro-banner';
        banner.setAttribute('aria-labelledby', 'titolo-banner-calibro');
        banner.innerHTML = `
          <p class="micro"></p>
          <p class="banner-titolo" id="titolo-banner-calibro"></p>
          <button class="banner-apri" type="button" aria-labelledby="titolo-banner-calibro" aria-haspopup="dialog"><svg class="freccia" aria-hidden="true" focusable="false"><use href="#freccia"/></svg></button>
          <button class="banner-chiudi" type="button"><span class="nascosto">Chiudi</span><span class="menu-icona menu-icona-x" aria-hidden="true"><span></span><span></span></span></button>`;
        banner.querySelector('.micro').textContent = occhiello.textContent;
        banner.querySelector('.banner-titolo').textContent = titolo.textContent;
        const mini = copia.cloneNode(true);
        mini.classList.add('comparatore-mini');
        banner.prepend(mini);
        const apriBanner = banner.querySelector('.banner-apri');
        document.body.appendChild(banner);

        let superato = false;                       // la fine dell'innesco è uscita dallo schermo, in alto
        let visto = false;
        const daEvitare = new Set();                // la fascia e i moduli a schermo: il banner non li copre mai
        aggiornaBanner = () => {
          const mostra = superato && !daEvitare.size && !completo && !chiusoDaPoco;
          banner.classList.toggle('visibile', mostra);
          if (!mostra || visto) return;
          visto = true;
          banner.classList.add('entra');            // l'ingresso con lo spostamento avviene una volta sola
          avvisa('banner-visto');
        };
        // L'innesco si osserva con il margine inferiore allungato fino in fondo alla pagina: così «non interseca»
        // vuol dire soltanto «è tutto sopra lo schermo», anche dopo un salto con un link (tornando su, il banner sparisce).
        const osservaInnesco = new IntersectionObserver((voci) => {
          superato = !voci[voci.length - 1].isIntersecting;
          aggiornaBanner();
        }, { rootMargin: '0px 0px 999999px 0px' });
        osservaInnesco.observe(innesco);
        const osserva = new IntersectionObserver((voci) => {
          voci.forEach((v) => {
            if (v.isIntersecting) daEvitare.add(v.target);
            else daEvitare.delete(v.target);
          });
          aggiornaBanner();
        });
        [calibro, ...$$('.contatto, .modulo')].forEach((el) => osserva.observe(el));

        apriBanner.addEventListener('click', () => apri('banner', apriBanner));
        banner.querySelector('.banner-chiudi').addEventListener('click', () => {
          chiusoDaPoco = true;
          try { localStorage.setItem(CHIAVE_BANNER, String(Date.now())); } catch (e) { /* resta chiuso almeno fino al prossimo caricamento */ }
          aggiornaBanner();
          osserva.disconnect();
          osservaInnesco.disconnect();
          avvisa('banner-chiuso');
        });
      }
    } else {
      // senza <dialog> il calibro resta nella pagina, con le otto domande in fila
      calibro.addEventListener('change', () => { valuta(); salva(); });
      porta.addEventListener('click', portaAlModulo);
      valuta();
    }
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

  // ── Il risultato del calibro nel modulo: sopra i campi le stesse due frasi, con una ✕ per toglierle;
  //    punteggio e consiglio partono con la richiesta nel campo nascosto «calibro» («percorso» non si tocca).
  //    Vale in ogni pagina che ha il modulo: il risultato portato resta per la sessione (sessionStorage). ──
  if (modulo) {
    const campoCalibro = modulo.querySelector('input[name="calibro"]');
    let riepilogo = null;
    const togliRiepilogo = () => {
      if (riepilogo) riepilogo.remove();
      riepilogo = null;
      if (campoCalibro) campoCalibro.value = '';
    };
    const mostraRiepilogo = (esito) => {
      togliRiepilogo();
      if (!esito || !esito.frasi) return;
      riepilogo = document.createElement('div');
      riepilogo.className = 'modulo-calibro';
      riepilogo.innerHTML = '<p class="modulo-calibro-punteggio"></p><p class="modulo-calibro-consiglio"></p>'
        + '<button class="modulo-calibro-togli" type="button"><span class="nascosto">Chiudi</span><span class="menu-icona menu-icona-x" aria-hidden="true"><span></span><span></span></span></button>';
      riepilogo.children[0].textContent = esito.frasi[0];
      riepilogo.children[1].textContent = esito.frasi[1];
      riepilogo.lastElementChild.addEventListener('click', () => {
        const stato = memoria.leggi();
        stato.portato = false;
        memoria.scrivi(stato);
        togliRiepilogo();
        const primo = modulo.querySelector('.campo input');
        if (primo) primo.focus({ preventScroll: true });
      });
      (modulo.querySelector('.campo') || modulo.firstElementChild).before(riepilogo);
      if (campoCalibro) campoCalibro.value = esito.frasi.join(' ');
      const casella = modulo.querySelector(`input[name="servizi[]"][value="${esito.servizio}"]`);
      if (casella) casella.checked = true;
    };
    document.addEventListener('calibro:portato', (e) => mostraRiepilogo(e.detail.esito));
    // una risposta cambiata dopo aver portato il risultato: il riepilogo segue il risultato nuovo
    document.addEventListener('calibro:risposta', () => {
      if (!riepilogo) return;
      const stato = memoria.leggi();
      mostraRiepilogo(stato.portato ? stato.esito : null);
    });
    const stato = memoria.leggi();
    if (stato.portato) mostraRiepilogo(stato.esito);
  }

  // ── Manifattura: la tavola delle cinque lavorazioni. Su schermo largo è un gruppo di schede (tab):
  //    si sceglie con il clic o con le frecce, la quota scorre e il disegno si compone (lo fa style.css).
  //    Su telefono le lavorazioni restano una sotto l'altra, come senza JavaScript. ──
  const tavola = document.querySelector('.lavorazioni-tavola');
  if (tavola) {
    const elenco = tavola.querySelector('.lavorazioni-schede');
    const schede = Array.from(elenco.querySelectorAll('[role="tab"]'));
    const pannelli = schede.map((s) => document.getElementById(s.getAttribute('aria-controls')));
    let attiva = 0;
    const scegli = (i, fuoco) => {
      attiva = i;
      schede.forEach((s, j) => { s.setAttribute('aria-selected', String(j === i)); s.tabIndex = j === i ? 0 : -1; });
      pannelli.forEach((p, j) => { p.hidden = j !== i; });
      elenco.style.setProperty('--attiva', i);
      if (fuoco) schede[i].focus();
    };
    const imposta = () => {
      const aSchede = largo.matches;
      tavola.classList.toggle('a-schede', aSchede);
      elenco.hidden = !aSchede;
      pannelli.forEach((p, j) => {
        if (aSchede) { p.setAttribute('role', 'tabpanel'); p.setAttribute('aria-labelledby', schede[j].id); }
        else { p.hidden = false; p.removeAttribute('role'); p.setAttribute('aria-labelledby', `titolo-${p.id}`); }
      });
      if (aSchede) scegli(attiva);
    };
    schede.forEach((s, i) => s.addEventListener('click', () => scegli(i)));
    elenco.addEventListener('keydown', (e) => {
      const passi = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1, Home: -attiva, End: schede.length - 1 - attiva };
      if (!(e.key in passi)) return;
      e.preventDefault();
      scegli((attiva + passi[e.key] + schede.length) % schede.length, true);
    });
    largo.addEventListener('change', imposta);
    imposta();
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
