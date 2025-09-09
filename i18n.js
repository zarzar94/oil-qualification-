document.addEventListener("DOMContentLoaded", () => {
  const switcher = document.querySelector("[data-lang-switcher]");
  let currentLang = "en";
  const loadLang = async (lang) => {
    try {
      const res = await fetch(`assets/i18n/${lang}.json`);
      const dict = await res.json();
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) el.textContent = dict[key];
      });
    } catch (e) { console.warn("i18n load failed:", e); }
  };
  const setLang = (lang) => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    loadLang(lang);
  };
  if (switcher) {
    switcher.addEventListener("change", (e) => setLang(e.target.value));
    setLang(currentLang);
  }
});