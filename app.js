
// Modal and accessibility handlers
const modalOverlay = document.getElementById('reviewModal');

function openReviewModal() {
  modalOverlay.classList.add('show');
  modalOverlay.setAttribute('aria-hidden', 'false');
  modalOverlay.setAttribute('role', 'dialog');
  modalOverlay.setAttribute('aria-modal', 'true');
  const firstFocusable = modalOverlay.querySelector('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
  if (firstFocusable) firstFocusable.focus();
  document.addEventListener('keydown', onEscClose);
  document.addEventListener('focus', trapFocus, true);
}

function closeReviewModal() {
  modalOverlay.classList.remove('show');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.removeEventListener('keydown', onEscClose);
  document.removeEventListener('focus', trapFocus, true);
}

function onEscClose(e) {
  if (e.key === 'Escape') closeReviewModal();
}

function trapFocus(e) {
  if (!modalOverlay.classList.contains('show')) return;
  if (!modalOverlay.contains(e.target)) {
    e.stopPropagation();
    const first = modalOverlay.querySelector('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
    if (first) first.focus();
  }
}

function switchTab(e, tabName) {
  document.querySelectorAll('.review-tab').forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-selected', 'false');
  });
  document.querySelectorAll('.review-section').forEach(section => {
    section.classList.remove('active');
    section.setAttribute('hidden', 'true');
  });
  e.currentTarget.classList.add('active');
  e.currentTarget.setAttribute('aria-selected', 'true');
  const section = document.getElementById(tabName + '-section');
  if (section) {
    section.classList.add('active');
    section.removeAttribute('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.review-tab').forEach(btn => {
    // Prefer explicit data-tab attribute; fall back to sanitized text content
    const tab = btn.dataset.tab || btn.textContent.trim().toLowerCase().replace(/\s+/g, '');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('tabindex', '0');
    btn.addEventListener('click', ev => switchTab(ev, tab));
  });
  document.querySelectorAll('.review-section').forEach(sec => sec.setAttribute('role', 'tabpanel'));
  document.querySelectorAll('.score-slider').forEach(slider => {
    slider.addEventListener('input', function() {
      const scoreValue = this.parentElement.querySelector('.score-value');
      if (scoreValue) {
        scoreValue.textContent = this.value;
      }
      updateOverallScore();
    });
  });
  const approve = modalOverlay.querySelector('.decision-btn.approve');
  const reject = modalOverlay.querySelector('.decision-btn.reject');
  const request = modalOverlay.querySelector('.decision-btn.request-changes');
  if (approve) approve.addEventListener('click', () => notify('approved'));
  if (reject) reject.addEventListener('click', () => notify('rejected'));
  if (request) request.addEventListener('click', () => notify('changes requested'));
  initCharts();
});

function updateOverallScore() {
  const sliders = Array.from(document.querySelectorAll('.score-slider'));
  if (!sliders.length) return;
  const scores = sliders.map(s => parseInt(s.value, 10));
  const average = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const el = document.getElementById('overall-score');
  if (el) el.textContent = `${average}/100`;
}

function notify(state) {
  console.log('Decision:', state);
  alert(`Decision recorded: ${state}`);
}

function initCharts() {
  // Placeholder for chart initialization
  console.log('Charts ready');
}

// Expose functions
window.openReviewModal = openReviewModal;
window.closeReviewModal = closeReviewModal;

// Responsive sidebar and table scroll on mobile
document.addEventListener('DOMContentLoaded', () => {
  // Inject mobile menu button
  const topbar = document.querySelector('.topbar');
  if (topbar) {
    const btn = document.createElement('button');
    btn.className = 'menu-toggle';
    btn.setAttribute('aria-label', 'Toggle menu');
    btn.style.cssText = 'border:none;background:#f5f6fa;border-radius:8px;padding:8px 10px;cursor:pointer;display:none';
    btn.textContent = '☰';
    topbar.prepend(btn);

    // Show button only under 992px
    const mql = window.matchMedia('(max-width: 992px)');
    const sidebar = document.querySelector('.sidebar');
    const syncBtn = () => {
      btn.style.display = mql.matches ? 'inline-flex' : 'none';
      if (!mql.matches && sidebar) sidebar.classList.remove('open');
    };
    mql.addEventListener('change', syncBtn);
    syncBtn();

    btn.addEventListener('click', () => {
      if (sidebar) sidebar.classList.toggle('open');
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && sidebar) sidebar.classList.remove('open');
    });
  }

  // Wrap table for horizontal scroll on small screens
  const table = document.querySelector('.applications-table');
  if (table && !table.parentElement.classList.contains('table-scroll')) {
    const wrap = document.createElement('div');
    wrap.className = 'table-scroll';
    table.parentElement.insertBefore(wrap, table);
    wrap.appendChild(table);
  }
});
