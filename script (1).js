(function themeInit(){
  // Enhanced theme init: apply to both html and body
  const saved = localStorage.getItem('theme');
  const root = document.documentElement;
  const body = document.body;
  
  if (saved === 'light') {
    root.classList.add('light');
    body.classList.add('light');
  } else {
    root.classList.remove('light');
    body.classList.remove('light');
  }
  
  const toggle = document.querySelector('[data-toggle-theme]');
  if (toggle) toggle.addEventListener('click', () => {
    const isLight = root.classList.contains('light');
    const newTheme = isLight ? 'dark' : 'light';
    
    root.classList.toggle('light');
    body.classList.toggle('light');
    localStorage.setItem('theme', newTheme);
  });
})();

// Mobile menu toggle
(function mobileMenuInit(){
  const toggle = document.querySelector('.mobile-menu-btn');
  const dropdown = document.querySelector('.mobile-dropdown');
  if (!toggle || !dropdown) return;

  // Toggle mobile dropdown on button click
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');
  });

  // Close dropdown when clicking on a link
  dropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      dropdown.classList.remove('active');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !toggle.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
})();

// Простые табы
function initTabs(root=document){
  root.querySelectorAll('[data-tabs]')?.forEach(tabsEl => {
    const tabBtns = tabsEl.querySelectorAll('[data-tab]');
    const panes = tabsEl.querySelectorAll('[data-pane]');
    tabBtns.forEach(btn => btn.addEventListener('click', () => {
      tabBtns.forEach(b=>b.classList.remove('active'));
      panes.forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      const pane = tabsEl.querySelector(`[data-pane="${btn.dataset.tab}"]`);
      pane?.classList.add('active');
    }));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  
  // Fix: Add card styling to Russian interactive section tables to match physics style
  if (document.title.includes('Русский язык') || document.querySelector('h1')?.textContent.includes('Русский язык')) {
    const interactivePane = document.querySelector('[data-pane="interactive"]');
    if (interactivePane) {
      const tableSections = interactivePane.querySelectorAll('.table-section');
      tableSections.forEach(section => {
        if (!section.classList.contains('card')) {
          section.classList.add('card');
          section.style.marginBottom = '16px';
        }
      });
      // Also ensure the interactive container has proper background
      const container = interactivePane.querySelector('.interactive-container');
      if (container && !container.querySelector('.card')) {
        // Wrap tables in card if needed
        tableSections.forEach(section => {
          section.style.background = 'var(--card)';
          section.style.border = '1px solid var(--border)';
          section.style.borderRadius = '14px';
          section.style.padding = '18px';
        });
      }
    }
  }
});

// Утилиты
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

// Микро-хелперы для меню/плавной прокрутки при необходимости
$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const id = a.getAttribute('href');
  if (id.length > 1) {
    const el = document.querySelector(id);
    if (el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
  }
}));
