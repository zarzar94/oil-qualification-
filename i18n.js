
(function(){
  const NS = 'i18n';
  const DEFAULT_LANG = localStorage.getItem('lang') || (document.documentElement.lang || 'en').slice(0,2) || 'en';
  let dict = {};

  function setDir(lang){
    const rtl = ['ar','fa','ur','he'];
    const isRTL = rtl.includes(lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key]) el.setAttribute('title', dict[key]);
    });
  }

  async function load(lang) {
    const res = await fetch(`assets/i18n/${lang}.json`);
    dict = await res.json();
    setDir(lang);
    applyTranslations();
  }

  async function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    await load(lang);
    window.dispatchEvent(new CustomEvent('lang:changed', { detail: { lang } }));
  }

  function initSwitcher(){
    const el = document.querySelector('[data-lang-switcher]');
    if(!el) return;
    el.addEventListener('change', (e)=> setLanguage(e.target.value));
    const current = localStorage.getItem('lang') || 'en';
    el.value = current;
  }

  // Expose API
  window.i18n = { setLanguage };

  document.addEventListener('DOMContentLoaded', ()=>{
    initSwitcher();
    load(localStorage.getItem('lang') || DEFAULT_LANG);
  });
})();
