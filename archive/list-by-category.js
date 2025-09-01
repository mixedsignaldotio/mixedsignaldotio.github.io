(function () {
  const DATA = (window.ARTICLES || [])
    .filter(x => x && x.title && x.url && x.date && Array.isArray(x.categories) && x.categories.length)
    .map(x => ({
      ...x,
      dateObj: new Date(x.date)
    }))
    .sort((a, b) => b.dateObj - a.dateObj); // latest first (global)

  const state = {
    activeCategory: "All"
  };

  function uniqueCategories(articles) {
    const set = new Set();
    articles.forEach(a => a.categories.forEach(c => set.add(c)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }

  function buildCategoryBar(categories) {
    const nav = document.getElementById("category-bar");
    nav.innerHTML = "";

    const cats = ["All", ...categories];
    cats.forEach(cat => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cat-pill";
      btn.textContent = cat;
      btn.setAttribute("data-cat", cat);
      if (cat === state.activeCategory) btn.classList.add("active");
      btn.addEventListener("click", () => {
        state.activeCategory = cat;
        updateActivePill();
        renderTable();
        updateHash();
      });
      nav.appendChild(btn);
    });
  }

  function updateActivePill() {
    document.querySelectorAll(".cat-pill").forEach(el => {
      el.classList.toggle("active", el.getAttribute("data-cat") === state.activeCategory);
    });
  }

  function filteredArticles() {
    if (state.activeCategory === "All") return DATA;
    return DATA.filter(a => a.categories.includes(state.activeCategory));
  }

  function renderTable() {
    const tbody = document.querySelector("#articles-table tbody");
    tbody.innerHTML = "";

    const rows = filteredArticles();
    // Ensure latest-first within the selection
    rows.sort((a, b) => b.dateObj - a.dateObj);

    if (!rows.length) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 2;
      td.className = "empty";
      td.textContent = "No articles found.";
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    for (const a of rows) {
      const tr = document.createElement("tr");

      const tdTitle = document.createElement("td");
      const link = document.createElement("a");
      link.href = a.url;
      link.textContent = a.title;
      link.className = "article-link";
      tdTitle.appendChild(link);

      const tdDate = document.createElement("td");
      tdDate.className = "date";
      tdDate.textContent = a.date; // keep ISO; switch to toLocaleDateString() if you prefer
      tr.appendChild(tdTitle);
      tr.appendChild(tdDate);

      tbody.appendChild(tr);
    }
  }

  function readHash() {
    const h = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (!h) return;
    // hash format: #cat=Category%20Name
    const m = h.match(/^cat=(.+)$/);
    if (m && m[1]) {
      state.activeCategory = m[1];
    }
  }

  function updateHash() {
    const val = encodeURIComponent(state.activeCategory);
    history.replaceState(null, "", `#cat=${val}`);
  }

  function init() {
    readHash();
    const categories = uniqueCategories(DATA);
    if (!categories.includes(state.activeCategory) && state.activeCategory !== "All") {
      state.activeCategory = "All";
    }
    buildCategoryBar(categories);
    renderTable();
  }

  document.addEventListener("DOMContentLoaded", init);
})();