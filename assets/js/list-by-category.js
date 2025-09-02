(function () {
  const DATA = (window.ARTICLES || [])
    .filter(x => x && x.title && x.url && x.date && Array.isArray(x.categories) && x.categories.length)
    .map(x => ({ ...x, dateObj: new Date(x.date) }))
    .sort((a, b) => b.dateObj - a.dateObj); // latest first (global)

  const state = { activeCategory: "All" };

  // "01 Sep. 2025" formatter
  function formatDateYYYYMMDDtoFancy(dateObj) {
    const dd = String(dateObj.getDate()).padStart(2, "0");
    const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
    const m = months[dateObj.getMonth()];
    const yyyy = dateObj.getFullYear();
    return `${dd} ${m} ${yyyy}`;
  }

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

    const rows = filteredArticles().sort((a, b) => b.dateObj - a.dateObj);

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
      // <!-- ARTICLE START -->
      const tr = document.createElement("tr");
      tr.className = "article-item";
      tr.style.border = "none";
      tr.style.padding = "0.5rem 0.5rem 0.5rem 0";

      // Date cell (col 1)
      const tdDate = document.createElement("td");
      tdDate.className = "article-date";
      tdDate.setAttribute(
        "style",
        "text-align:right; font-family:'Courier New',Courier,monospace; font-weight:bold; " +
        "vertical-align:top; white-space:nowrap; font-size:14px; color:#666; " +
        "padding:0; margin:0; line-height:1;"
      );
      tdDate.textContent = `${formatDateYYYYMMDDtoFancy(a.dateObj)}`;

      // Title cell (col 2)
      const tdTitle = document.createElement("td");
      tdTitle.className = "article-title";
      tdTitle.setAttribute(
        "style",
        "text-align:left; vertical-align:top; font-size:16px; padding:0; margin:0; line-height:1;"
      );

      const link = document.createElement("a");
      link.href = a.url;
      link.setAttribute(
        "style",
        "text-align: left; text-decoration:none; display:inline; margin:0; padding:0; line-height:1;"
      );
      link.textContent = `${a.title}`;

      tdTitle.appendChild(link);

      // Append to row in the target order: date first, then title
      tr.appendChild(tdDate);
      tr.appendChild(tdTitle);

      tbody.appendChild(tr);
      // <!-- ARTICLE END -->
    }
  }

  function readHash() {
    const h = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (!h) return;
    // hash format: #cat=Category%20Name
    const m = h.match(/^cat=(.+)$/);
    if (m && m[1]) state.activeCategory = m[1];
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
