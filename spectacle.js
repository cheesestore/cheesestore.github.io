// Spectacle 2.0 Client
'use strict';

// Sidebar — open/close toggle, close on nav click (mobile), outside click, Escape
(function () {
  var sidebar = document.getElementById('sidebar');
  var openBtn = document.querySelector('[data-drawer-slide]');
  var closeBtn = document.querySelector('[data-drawer-close]');
  if (!sidebar) return;

  function open() {
    sidebar.classList.add('open');
    document.addEventListener('keydown', onKey);
    // Delay so the click that opened doesn't immediately close
    requestAnimationFrame(function () {
      document.addEventListener('click', onOutside);
    });
  }

  function close() {
    sidebar.classList.remove('open');
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('click', onOutside);
  }

  function onKey(e) {
    if (e.key === 'Escape') close();
  }

  function onOutside(e) {
    if (!sidebar.contains(e.target) && e.target !== openBtn) close();
  }

  if (openBtn) openBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);

  // Close sidebar on nav link click (mobile)
  sidebar.addEventListener('click', function (e) {
    var link = e.target.closest('#nav a');
    if (link) close();
  });
})();

// Scroll tracker — IntersectionObserver-based active nav link highlighting
(function () {
  var navLinks = document.querySelectorAll('#nav a');
  var targets = document.querySelectorAll('[data-traverse-target]');
  if (!targets.length) return;

  var currentId = null;

  // Map of traverse-target id → nav link element
  var linkMap = {};
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href.charAt(0) === '#') linkMap[href.slice(1)] = link;
  });

  function activate(id) {
    if (id === currentId) return;
    currentId = id;
    navLinks.forEach(function (link) { link.classList.remove('active'); });
    var active = linkMap[id];
    if (active) {
      active.classList.add('active');
      active.scrollIntoView({ block: 'nearest', behavior: 'auto' });
    }
  }

  // Track which sections are visible; pick the topmost one
  var visibleSections = new Map();

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var id = entry.target.getAttribute('data-traverse-target');
      if (entry.isIntersecting) {
        visibleSections.set(id, entry.target);
      } else {
        visibleSections.delete(id);
      }
    });

    // Pick the topmost visible section (lowest boundingClientRect.top)
    var best = null;
    var bestTop = Infinity;
    visibleSections.forEach(function (el, id) {
      var top = el.getBoundingClientRect().top;
      if (top < bestTop) { bestTop = top; best = id; }
    });

    // Fallback: if nothing visible, find the last section above viewport
    if (!best) {
      for (var i = targets.length - 1; i >= 0; i--) {
        if (targets[i].getBoundingClientRect().top < 10) {
          best = targets[i].getAttribute('data-traverse-target');
          break;
        }
      }
    }

    if (best) activate(best);
  }, {
    // Trigger when section header enters top 20% of viewport
    rootMargin: '0px 0px -80% 0px',
    threshold: 0
  });

  targets.forEach(function (el) { observer.observe(el); });

  // Activate on initial load based on hash or first section
  var hash = window.location.hash.slice(1);
  if (hash && linkMap[hash]) {
    activate(hash);
  } else if (targets.length) {
    activate(targets[0].getAttribute('data-traverse-target'));
  }
})();

// Language tabs — switch tabs within a group, sync across page
(function () {
  var selectedLang = null;

  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.code-samples-tab');
    if (!tab) return;

    var container = tab.closest('.code-samples');
    var index = tab.getAttribute('data-tab-index');
    var lang = tab.textContent.trim();

    // Preserve scroll position so panel height changes don't shift the page
    var scrollY = window.scrollY;

    // Activate this tab locally
    activateTab(container, index);

    // Sync: activate same language in all other code-sample groups
    if (lang !== selectedLang) {
      selectedLang = lang;
      document.querySelectorAll('.code-samples').forEach(function (group) {
        if (group === container) return;
        // Find tab with same language name
        group.querySelectorAll('.code-samples-tab').forEach(function (t) {
          if (t.textContent.trim() === lang) {
            activateTab(group, t.getAttribute('data-tab-index'));
          }
        });
      });
    }

    window.scrollTo(0, scrollY);
  });

  function activateTab(container, index) {
    container.querySelectorAll('.code-samples-tab').forEach(function (t) {
      var isActive = t.getAttribute('data-tab-index') === index;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    container.querySelectorAll('.code-samples-panel').forEach(function (p) {
      p.classList.toggle('active', p.getAttribute('data-panel-index') === index);
    });
  }
})();

// Copy button — clipboard copy with "Copied!" feedback
(function () {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.copy-btn');
    if (!btn) return;
    var wrapper = btn.closest('.code-block-wrapper');
    if (!wrapper) return;
    var code = wrapper.querySelector('code');
    if (!code) return;

    navigator.clipboard.writeText(code.textContent || '').then(function () {
      var span = btn.querySelector('span');
      if (span) span.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function () {
        if (span) span.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 2000);
    });
  });
})();

// Theme toggle — dark/light mode with localStorage persistence
(function () {
  var STORAGE_KEY = 'spectacle-theme';
  var btn = document.getElementById('theme-toggle');
  var root = document.documentElement;

  function getPreferred() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    return 'light';
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', theme === 'dark' ? 'Light mode' : 'Dark mode');
    }
  }

  apply(getPreferred());

  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      apply(next);
    });
  }

  // Respond to system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      apply(e.matches ? 'dark' : 'light');
    }
  });
})();

// Search — client-side search dialog with keyboard navigation
(function () {
  var dialog = document.getElementById('search-dialog');
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var openBtn = document.getElementById('search-open');
  if (!dialog || !input || !results) return;

  // Build search index from nav links + operations
  var entries = [];
  document.querySelectorAll('[data-traverse-target]').forEach(function (el) {
    var id = el.getAttribute('data-traverse-target');
    var method = '', path = '', summary = '', tag = '';

    var methodEl = el.querySelector('.operation-method');
    var pathEl = el.querySelector('.operation-path');
    var summaryEl = el.querySelector('.operation-summary');

    if (methodEl) method = methodEl.textContent.trim();
    if (pathEl) path = pathEl.textContent.trim();
    if (summaryEl) summary = summaryEl.textContent.trim();

    // For non-operations, use the heading text
    if (!method && !path) {
      var heading = el.querySelector('h1, h2');
      if (heading) summary = heading.textContent.trim();
    }

    // Find parent tag
    var tagGroup = el.closest('.tag-group');
    if (tagGroup) {
      var tagLabel = tagGroup.querySelector('.tag-header h1');
      if (tagLabel) tag = tagLabel.textContent.trim();
    }

    entries.push({
      id: id,
      method: method,
      path: path,
      summary: summary,
      tag: tag,
      searchText: [method, path, summary, tag].join(' ').toLowerCase()
    });
  });

  var activeIndex = -1;
  var filtered = [];

  function open() {
    dialog.classList.add('open');
    input.value = '';
    input.focus();
    showResults('');
    document.addEventListener('keydown', onDialogKey);
  }

  function close() {
    dialog.classList.remove('open');
    document.removeEventListener('keydown', onDialogKey);
  }

  function showResults(query) {
    var q = query.toLowerCase().trim();
    if (!q) {
      filtered = entries.slice(0, 20);
    } else {
      var terms = q.split(/\s+/);
      filtered = entries.filter(function (e) {
        return terms.every(function (t) { return e.searchText.indexOf(t) !== -1; });
      });
    }

    activeIndex = filtered.length ? 0 : -1;
    render();
  }

  function render() {
    results.innerHTML = filtered.map(function (e, i) {
      var cls = 'search-result' + (i === activeIndex ? ' active' : '');
      var label = e.method
        ? '<span class="search-result-method method-' + e.method.toLowerCase() + '">' + e.method + '</span> ' +
          '<span class="search-result-path">' + escapeHtml(e.path) + '</span>'
        : '<span class="search-result-path">' + escapeHtml(e.summary) + '</span>';
      var tagLine = e.tag ? '<span class="search-result-tag">' + escapeHtml(e.tag) + '</span>' : '';
      var summaryLine = e.method && e.summary ? '<span class="search-result-summary">' + escapeHtml(e.summary) + '</span>' : '';
      return '<a href="#' + e.id + '" class="' + cls + '" data-index="' + i + '">' +
        '<div class="search-result-main">' + label + summaryLine + '</div>' +
        tagLine + '</a>';
    }).join('');
  }

  function escapeHtml(s) {
    var el = document.createElement('span');
    el.textContent = s;
    return el.innerHTML;
  }

  function navigate(index) {
    if (index < 0 || index >= filtered.length) return;
    var entry = filtered[index];
    close();
    var target = document.getElementById(entry.id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.location.hash = '#' + entry.id;
    }
  }

  function onDialogKey(e) {
    if (e.key === 'Escape') { close(); e.preventDefault(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, filtered.length - 1);
      render();
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      render();
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0) navigate(activeIndex);
      return;
    }
  }

  input.addEventListener('input', function () {
    showResults(input.value);
  });

  results.addEventListener('click', function (e) {
    var result = e.target.closest('.search-result');
    if (result) {
      e.preventDefault();
      navigate(parseInt(result.getAttribute('data-index'), 10));
    }
  });

  // Open search
  if (openBtn) openBtn.addEventListener('click', open);

  // Keyboard shortcut: Ctrl+K or /
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      open();
    }
    if (e.key === '/' && !isEditable(e.target)) {
      e.preventDefault();
      open();
    }
  });

  // Close on backdrop click
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) close();
  });

  function isEditable(el) {
    var tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
  }
})();
