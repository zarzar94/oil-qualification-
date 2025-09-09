
(function() {
  let translations = {};
  async function loadLang(lang) {
    const res = await fetch('assets/i18n/' + lang + '.json');
    translations = await res.json();
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[key]) {
        el.setAttribute('placeholder', translations[key]);
      }
    });
    localStorage.setItem('lang', lang);
  }
  document.addEventListener('DOMContentLoaded', function() {
    const lang = localStorage.getItem('lang') || 'en';
    const switcher = document.querySelector('[data-lang-switcher]');
    if (switcher) {
      switcher.value = lang;
      switcher.addEventListener('change', () => loadLang(switcher.value));
    }
    loadLang(lang);
  });
})();
