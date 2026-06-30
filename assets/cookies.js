/**
 * Semandata — Gestionnaire de consentement cookies
 * Conformité RGPD / Recommandations CNIL (délibération 2020-091)
 * Version 1.0 — 2026
 */
(function () {
  'use strict';

  var CONSENT_KEY     = 'semandata_cookie_consent';
  var CONSENT_VERSION = '1.0';

  /* ── Helpers consentement ── */
  function getConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      return (obj.version === CONSENT_VERSION) ? obj : null;
    } catch (e) { return null; }
  }

  function saveConsent(analytics, marketing) {
    var obj = {
      version:   CONSENT_VERSION,
      date:      new Date().toISOString(),
      essential: true,
      analytics: !!analytics,
      marketing: !!marketing
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(obj));
    dispatchConsentEvent(obj);
    return obj;
  }

  function dispatchConsentEvent(consent) {
    try {
      window.dispatchEvent(new CustomEvent('semandata:consent', { detail: consent }));
    } catch (e) {}
  }

  /* ── Fermeture / actions ── */
  function removeBanner() {
    var els = ['smd-cookie-banner', 'smd-cookie-panel', 'smd-cookie-overlay'];
    els.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.remove();
    });
  }

  function acceptAll() { saveConsent(true, true);   removeBanner(); }
  function rejectAll()  { saveConsent(false, false); removeBanner(); }

  function savePreferences() {
    var a = document.getElementById('smd-tog-analytics');
    var m = document.getElementById('smd-tog-marketing');
    saveConsent(a && a.checked, m && m.checked);
    removeBanner();
  }

  function showPanel() {
    var b = document.getElementById('smd-cookie-banner');
    var p = document.getElementById('smd-cookie-panel');
    if (b) b.style.display = 'none';
    if (p) p.style.display = 'flex';
  }

  function showBanner() {
    var b = document.getElementById('smd-cookie-banner');
    var p = document.getElementById('smd-cookie-panel');
    if (b) b.style.display = 'flex';
    if (p) p.style.display = 'none';
  }

  /* ── CSS ── */
  function injectCSS() {
    if (document.getElementById('smd-cookie-css')) return;
    var s = document.createElement('style');
    s.id = 'smd-cookie-css';
    s.textContent = [
      /* Banner & panel */
      '#smd-cookie-banner,#smd-cookie-panel{',
        'position:fixed;bottom:0;left:0;right:0;z-index:99999;',
        'background:#14141c;border-top:1px solid rgba(255,255,255,.1);',
        'padding:20px 32px;gap:20px;flex-wrap:wrap;',
        "font-family:'Inter',Helvetica,Arial,sans-serif;",
        'box-shadow:0 -4px 32px rgba(0,0,0,.4);',
      '}',
      '#smd-cookie-banner{display:flex;align-items:center;}',
      '#smd-cookie-panel{display:none;flex-direction:column;max-height:80vh;overflow-y:auto;padding:28px 32px;}',

      /* Text */
      '.smd-ct{font-size:14px;color:rgba(255,255,255,.75);flex:1;min-width:260px;line-height:1.55;}',
      '.smd-ct strong{color:#fff;}',
      '.smd-ct a{color:#579dff;text-decoration:underline;cursor:pointer;}',

      /* Action buttons */
      '.smd-acts{display:flex;gap:10px;flex-shrink:0;flex-wrap:wrap;align-items:center;}',
      '.smd-btn{padding:10px 20px;border-radius:100px;font-size:13px;font-weight:700;cursor:pointer;border:none;',
        "font-family:'Inter',Helvetica,Arial,sans-serif;white-space:nowrap;transition:opacity .15s;}",
      '.smd-btn:hover{opacity:.85;}',
      '.smd-btn-primary{background:#0a70ff;color:#fff;}',
      '.smd-btn-secondary{background:rgba(255,255,255,.1);color:#fff;}',
      '.smd-btn-ghost{background:transparent;color:rgba(255,255,255,.45);text-decoration:underline;font-size:12px;padding:8px 12px;}',

      /* Panel */
      '.smd-ptitle{font-size:18px;font-weight:800;color:#fff;margin-bottom:6px;}',
      '.smd-psub{font-size:13px;color:rgba(255,255,255,.55);margin-bottom:24px;line-height:1.55;}',
      '.smd-cat{border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:18px 20px;margin-bottom:10px;',
        'display:flex;justify-content:space-between;align-items:flex-start;gap:20px;}',
      '.smd-ci{}',
      '.smd-cn{font-size:14px;font-weight:700;color:#fff;margin-bottom:4px;}',
      '.smd-cd{font-size:12px;color:rgba(255,255,255,.5);line-height:1.5;}',
      '.smd-badge{font-size:11px;font-weight:600;color:rgba(255,255,255,.4);',
        'background:rgba(255,255,255,.08);padding:2px 10px;border-radius:100px;margin-left:8px;vertical-align:middle;}',

      /* Toggle */
      '.smd-tog{position:relative;width:44px;height:24px;flex-shrink:0;margin-top:2px;}',
      '.smd-tog input{opacity:0;width:0;height:0;position:absolute;}',
      '.smd-tog-sl{position:absolute;inset:0;background:rgba(255,255,255,.15);border-radius:100px;cursor:pointer;transition:background .2s;}',
      '.smd-tog-sl:before{content:"";position:absolute;height:18px;width:18px;left:3px;bottom:3px;',
        'background:#fff;border-radius:50%;transition:transform .2s;}',
      '.smd-tog input:checked+.smd-tog-sl{background:#0a70ff;}',
      '.smd-tog input:checked+.smd-tog-sl:before{transform:translateX(20px);}',
      '.smd-tog input:disabled+.smd-tog-sl{opacity:.5;cursor:not-allowed;}',

      /* Panel actions */
      '.smd-pacts{display:flex;gap:10px;margin-top:20px;justify-content:flex-end;flex-wrap:wrap;}',

      /* Mobile */
      '@media(max-width:600px){',
        '#smd-cookie-banner,#smd-cookie-panel{padding:16px 20px;}',
        '.smd-acts{width:100%;}',
        '.smd-btn{flex:1;text-align:center;}',
      '}'
    ].join('');
    document.head.appendChild(s);
  }

  /* ── HTML Banner ── */
  function injectBanner() {
    /* Bannière principale */
    var banner = document.createElement('div');
    banner.id = 'smd-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Gestion des cookies');
    banner.innerHTML =
      '<div class="smd-ct">' +
        '<strong>Nous utilisons des cookies</strong> pour améliorer votre expérience et mesurer l\'audience du site. ' +
        'Les cookies essentiels sont obligatoires. ' +
        '<a id="smd-open-panel" tabindex="0">Personnaliser mes choix</a>' +
      '</div>' +
      '<div class="smd-acts">' +
        '<button class="smd-btn smd-btn-ghost" id="smd-reject-btn">Refuser tout</button>' +
        '<button class="smd-btn smd-btn-secondary" id="smd-customize-btn">Personnaliser</button>' +
        '<button class="smd-btn smd-btn-primary" id="smd-accept-btn">Accepter tout</button>' +
      '</div>';

    /* Panneau de préférences */
    var panel = document.createElement('div');
    panel.id = 'smd-cookie-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Préférences de cookies');
    panel.innerHTML =
      '<div>' +
        '<div class="smd-ptitle">Gestion des cookies</div>' +
        '<div class="smd-psub">' +
          'Conformément au RGPD et aux recommandations de la CNIL, vous pouvez accepter, refuser ou personnaliser votre consentement. ' +
          'Votre choix est conservé 13 mois.' +
        '</div>' +
      '</div>' +

      /* Essentiels */
      '<div class="smd-cat">' +
        '<div class="smd-ci">' +
          '<div class="smd-cn">Cookies essentiels <span class="smd-badge">Toujours actifs</span></div>' +
          '<div class="smd-cd">Indispensables au fonctionnement du site — navigation, sécurité, mémorisation de vos préférences de consentement. Ne peuvent pas être désactivés.</div>' +
        '</div>' +
        '<label class="smd-tog" aria-label="Cookies essentiels (obligatoires)">' +
          '<input type="checkbox" checked disabled><span class="smd-tog-sl"></span>' +
        '</label>' +
      '</div>' +

      /* Analytiques */
      '<div class="smd-cat">' +
        '<div class="smd-ci">' +
          '<div class="smd-cn">Cookies analytiques</div>' +
          '<div class="smd-cd">Mesure de l\'audience et analyse des parcours visiteurs pour améliorer le site. Données anonymisées — aucun suivi individuel.</div>' +
        '</div>' +
        '<label class="smd-tog" aria-label="Cookies analytiques">' +
          '<input type="checkbox" id="smd-tog-analytics"><span class="smd-tog-sl"></span>' +
        '</label>' +
      '</div>' +

      /* Marketing */
      '<div class="smd-cat">' +
        '<div class="smd-ci">' +
          '<div class="smd-cn">Cookies marketing</div>' +
          '<div class="smd-cd">Personnalisation des contenus et mesure de l\'efficacité des campagnes. Activés uniquement si des outils de ciblage ou de retargeting sont déployés.</div>' +
        '</div>' +
        '<label class="smd-tog" aria-label="Cookies marketing">' +
          '<input type="checkbox" id="smd-tog-marketing"><span class="smd-tog-sl"></span>' +
        '</label>' +
      '</div>' +

      '<div class="smd-pacts">' +
        '<button class="smd-btn smd-btn-ghost" id="smd-back-btn">← Retour</button>' +
        '<button class="smd-btn smd-btn-secondary" id="smd-reject-all-btn">Refuser tout</button>' +
        '<button class="smd-btn smd-btn-primary" id="smd-save-btn">Enregistrer mes choix</button>' +
      '</div>';

    document.body.appendChild(banner);
    document.body.appendChild(panel);

    /* Événements */
    document.getElementById('smd-accept-btn').addEventListener('click', acceptAll);
    document.getElementById('smd-reject-btn').addEventListener('click', rejectAll);
    document.getElementById('smd-customize-btn').addEventListener('click', showPanel);
    document.getElementById('smd-open-panel').addEventListener('click', showPanel);
    document.getElementById('smd-open-panel').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') showPanel();
    });
    document.getElementById('smd-reject-all-btn').addEventListener('click', rejectAll);
    document.getElementById('smd-save-btn').addEventListener('click', savePreferences);
    document.getElementById('smd-back-btn').addEventListener('click', showBanner);
  }

  /* ── API publique : rouvrir le panneau depuis n'importe quel lien ── */
  window.semandata_openCookiePrefs = function () {
    var existing = document.getElementById('smd-cookie-panel');
    if (existing) {
      existing.style.display = 'flex';
      var b = document.getElementById('smd-cookie-banner');
      if (b) b.style.display = 'none';
    } else {
      injectCSS();
      injectBanner();
      showPanel();
    }
  };

  /* ── Initialisation ── */
  function init() {
    var consent = getConsent();
    if (!consent) {
      injectCSS();
      injectBanner();
    } else {
      /* Rejouer les consentements déjà accordés */
      dispatchConsentEvent(consent);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
