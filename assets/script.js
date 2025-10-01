// ===== Theme handling =====
(function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);
  const toggle = () => {
    const now = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', now);
    localStorage.setItem('theme', now);
  };
  window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', toggle);
  });
})();

// ===== Utilities =====
function slugify(text) {
  return text.toLowerCase().trim()
    .replace(/[\s\n\r]+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-+/g, '-')
    .replace(/^\-+|\-+$/g, '');
}
function smoothScrollTo(el) {
  if (!el) return;
  el.classList.remove('flash-highlight'); // restart animation if already there
  el.offsetWidth; // reflow
  el.classList.add('flash-highlight');
  const y = el.getBoundingClientRect().top + window.pageYOffset - 72; // header offset
  window.scrollTo({ top: y, behavior: 'smooth' });
}

// ===== Build Sticky Header & ToC (H2 only) =====
window.addEventListener('DOMContentLoaded', () => {
  const article = document.getElementById('article');
  const sticky = document.getElementById('sticky-header');
  const titleEl = document.getElementById('article-title');
  const headerTitle = sticky.querySelector('.article-title');
  headerTitle.textContent = titleEl ? titleEl.textContent : document.title;

  // Show sticky header after small scroll
  let visible = false;
  const onScroll = () => {
    const shouldShow = window.scrollY > 120;
    if (shouldShow !== visible) {
      visible = shouldShow;
      sticky.classList.toggle('visible', shouldShow);
      sticky.setAttribute('aria-hidden', String(!shouldShow));
    }
  };
  document.addEventListener('scroll', onScroll, { passive: true });

  // Build anchors & ToC entries from H2 only
  const tocMenu = document.getElementById('toc-menu');
  const btn = document.getElementById('toc-button');
  btn.addEventListener('click', () => {
    const open = tocMenu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => {
    if (!tocMenu.contains(e.target) && e.target !== btn) {
      tocMenu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  const headings = [...article.querySelectorAll('h2')]; // H2 only
  const usedIds = new Set();
  const makeId = (t) => {
    let base = slugify(t);
    let id = base;
    let i = 2;
    while (usedIds.has(id) || document.getElementById(id)) {
      id = `${base}-${i++}`;
    }
    usedIds.add(id);
    return id;
  };

  headings.forEach(h => {
    if (!h.id) h.id = makeId(h.textContent || h.innerText || 'section');
    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    a.className = `toc-level-2`;
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      smoothScrollTo(document.getElementById(h.id));
      tocMenu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
    tocMenu.appendChild(a);
  });
});

// ===== Code block language badges =====
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre').forEach(pre => {
    if (!pre.dataset.lang) {
      const code = pre.querySelector('code');
      const m = code && /language-([a-z0-9+\-#]+)/i.exec(code.className);
      if (m) pre.dataset.lang = m[1];
    }
  });
});

// ===== References: parse inline [keys], build list (numbers only), hover tooltips =====
window.addEventListener('DOMContentLoaded', () => {
  const refSection = document.getElementById('references-section');
  const refList = document.getElementById('references');
  const catalogTpl = document.getElementById('ref-catalog');

  // Build a map key -> HTML (from catalog) for tooltips only
  const catalog = {};
  if (catalogTpl) {
    const tmp = document.createElement('ol');
    tmp.innerHTML = catalogTpl.innerHTML.trim();
    tmp.querySelectorAll('li[data-key]').forEach(li => {
      catalog[li.dataset.key] = li.innerHTML;
    });
  }

  // Walk text nodes to find [key] patterns, excluding code/pre and links
  const walker = document.createTreeWalker(
    document.getElementById('article'),
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.includes('[')) return NodeFilter.FILTER_REJECT;
        const p = node.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        const tag = p.tagName.toLowerCase();
        if (['code', 'pre', 'a', 'script', 'style', 'template'].includes(tag)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const order = [];               // keys in appearance order
  const indexByKey = Object.create(null); // key -> number
  const nodesToReplace = [];

  const citationRegex = /\[([A-Za-z0-9:_\-]+)\]/g;

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = node.nodeValue;
    let lastIndex = 0;
    let match;
    const frag = document.createDocumentFragment();

    let changed = false;
    while ((match = citationRegex.exec(text)) !== null) {
      const key = match[1];
      const before = text.slice(lastIndex, match.index);
      if (before) frag.appendChild(document.createTextNode(before));

      if (!(key in indexByKey)) {
        indexByKey[key] = order.length + 1;
        order.push(key);
      }
      const num = indexByKey[key];

      const a = document.createElement('a');
      a.href = `#ref-${key}`;
      a.className = 'citation';
      a.dataset.key = key;
      a.textContent = `[${num}]`;
      if (!catalog[key]) a.title = `Missing reference for key: ${key}`;
      frag.appendChild(a);

      lastIndex = match.index + match[0].length;
      changed = true;
    }
    if (changed) {
      const after = text.slice(lastIndex);
      if (after) frag.appendChild(document.createTextNode(after));
      nodesToReplace.push([node, frag]);
    }
  }
  nodesToReplace.forEach(([n, f]) => n.parentNode.replaceChild(f, n));

  // Build the ordered, de-duplicated reference list — numbers only
  order.forEach((key, i) => {
    const li = document.createElement('li');
    li.id = `ref-${key}`;
    li.dataset.key = key;

    const label = document.createElement('span');
    label.className = 'ref-label';
    label.textContent = `[${i + 1}]`;
    li.appendChild(label);

    // Keep content (for accessibility / copy) but hide via CSS
    const content = document.createElement('span');
    content.className = 'ref-content';
    content.innerHTML = catalog[key] || `<em>Missing entry for <code>${key}</code></em>`;
    li.appendChild(content);

    refList.appendChild(li);
  });

  // Hover tooltip for citations still shows the real citation
  const tooltip = document.getElementById('ref-tooltip');
  function showTooltip(evt, key) {
    const html = catalog[key] || `<em>Missing entry for <code>${key}</code></em>`;
    tooltip.innerHTML = html;
    tooltip.style.left = Math.min(evt.clientX + 14, window.innerWidth - 30) + 'px';
    tooltip.style.top = (evt.clientY + 16) + 'px';
    tooltip.classList.add('visible');
    tooltip.setAttribute('aria-hidden', 'false');
  }
  function hideTooltip() {
    tooltip.classList.remove('visible');
    tooltip.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('a.citation').forEach(a => {
    const key = a.dataset.key;
    a.addEventListener('mouseenter', (e) => showTooltip(e, key));
    a.addEventListener('mouseleave', hideTooltip);
    a.addEventListener('mousemove', (e) => showTooltip(e, key));

    // Click -> scroll to ref and flash
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(`ref-${key}`);
      smoothScrollTo(target);
      history.replaceState(null, '', `#ref-${key}`);
    });
  });
});