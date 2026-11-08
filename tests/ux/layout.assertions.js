/**
 * Layout & accessibility assertions for the portfolio.
 *
 * There is no test runner in this project, so these checks run inside the live page and are
 * driven by scripts/run-ux-checks.sh. Each check returns { id, pass, detail } and the whole
 * suite resolves to a JSON string.
 *
 * The suite first scrolls the page top-to-bottom so scroll-reveal animations settle, then
 * returns to the top. Measuring mid-animation would produce false passes.
 *
 * Run:  bash scripts/run-ux-checks.sh            (all checks, all viewports)
 *       bash scripts/run-ux-checks.sh contact    (only checks whose id starts with "contact")
 */
(function () {
  const px = (n) => Math.round(n * 100) / 100;
  const rect = (el) => el.getBoundingClientRect();
  const visible = (el) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return false;
    const cs = getComputedStyle(el);
    return cs.visibility !== 'hidden' && cs.display !== 'none' && Number(cs.opacity) !== 0;
  };

  const relLum = (rgb) => {
    const [r, g, b] = rgb.map((v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const parseRGB = (s) => (s.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
  const contrast = (fg, bg) => {
    const a = relLum(parseRGB(fg));
    const b = relLum(parseRGB(bg));
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  };
  const bgOf = (el) => {
    let node = el;
    while (node && node !== document.documentElement) {
      const c = getComputedStyle(node).backgroundColor;
      const m = c.match(/[\d.]+/g);
      if (m && (m.length < 4 || Number(m[3]) > 0.5)) return c;
      node = node.parentElement;
    }
    return getComputedStyle(document.body).backgroundColor;
  };

  const run = () => {
    const results = [];
    const push = (id, pass, detail) => results.push({ id, pass: !!pass, detail: String(detail) });

    const header = document.querySelector('header');
    const headerBottom = header ? rect(header).bottom : 0;
    const onHome = location.pathname === '/';
    const onContact = location.pathname === '/contact';

    /* ---------- sticky stack ---------- */
    const progressBar = [...document.querySelectorAll('div')].find(
      (d) => String(d.className).includes('sticky') && (d.textContent || '').includes('Reading Case Study')
    );
    if (progressBar) {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, 900);
      const pb = rect(progressBar);
      push(
        'sticky.progress-bar-under-header',
        Math.abs(pb.top - headerBottom) <= 1,
        `bar.top=${px(pb.top)} header.bottom=${px(headerBottom)} delta=${px(pb.top - headerBottom)}`
      );
      const hit = document.elementFromPoint(pb.left + 40, pb.top + 8);
      push(
        'sticky.progress-bar-not-covered',
        !!hit && !hit.closest('header'),
        hit ? `hit=${String(hit.className).slice(0, 40)}` : 'hit=null'
      );
      const headings = [...document.querySelectorAll('main h3')].filter((h) => /^\d\d\./.test(h.textContent.trim()));
      if (headings.length) {
        push(
          'sticky.heading-below-bar',
          headings.every((h) => rect(h).top >= pb.bottom - 1 || rect(h).top < pb.top),
          `firstHeading.top=${px(rect(headings[0]).top)} bar.bottom=${px(pb.bottom)}`
        );
      }
    }

    /* ---------- mobile menu ---------- */
    const panel = [...document.querySelectorAll('div')].find(
      (d) => String(d.className).includes('fixed inset-x-0') && d.querySelector('nav')
    );
    if (panel) {
      push(
        'sticky.mobile-menu-flush',
        Math.abs(rect(panel).top - headerBottom) <= 1,
        `panel.top=${px(rect(panel).top)} header.bottom=${px(headerBottom)}`
      );
    }

    /* ---------- hero identity ---------- */
    const h1 = document.querySelector('h1');
    if (h1 && onHome) {
      push('hero.h1-is-full-name', h1.textContent.trim() === 'Navyro Bagaskara', `"${h1.textContent.trim()}"`);
    }

    /* ---------- contrast ---------- */
    const skipText = /^[•·|/–—-]+$/;
    const lowContrast = [];
    for (const el of document.querySelectorAll('main *, footer *, header *')) {
      if (!visible(el) || el.children.length) continue;
      const text = (el.textContent || '').trim();
      if (!text || text.length > 200 || skipText.test(text)) continue;
      const cs = getComputedStyle(el);
      const size = parseFloat(cs.fontSize);
      const weight = Number(cs.fontWeight) || 400;
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const ratio = contrast(cs.color, bgOf(el));
      if (ratio < (large ? 3 : 4.5)) {
        lowContrast.push({ text: text.slice(0, 24), ratio: Math.round(ratio * 100) / 100 });
      }
    }
    push('contrast.no-informative-low-contrast', lowContrast.length === 0, JSON.stringify(lowContrast.slice(0, 5)));

    /* ---------- targets ---------- */
    const min = innerWidth <= 767 ? 44 : 24;
    const small = [];
    for (const el of document.querySelectorAll('a[href], button')) {
      if (!visible(el)) continue;
      const r = rect(el);
      if (r.width < min || r.height < min) {
        small.push({
          t: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 20),
          w: Math.round(r.width),
          h: Math.round(r.height),
        });
      }
    }
    push(`targets.min-${min}px`, small.length === 0, JSON.stringify(small.slice(0, 5)) + ` (${small.length} total)`);

    /* ---------- type scale ---------- */
    const sizes = {};
    for (const el of document.querySelectorAll('main *, footer *')) {
      if (!visible(el) || el.children.length) continue;
      if (!(el.textContent || '').trim()) continue;
      const cs = getComputedStyle(el);
      const size = Math.round(parseFloat(cs.fontSize));
      sizes[`${size}px/${cs.fontWeight}`] = (sizes[`${size}px/${cs.fontWeight}`] || 0) + 1;
    }
    const tooSmall = Object.keys(sizes).filter((k) => parseFloat(k) < 12);
    push('type.no-text-below-12px', tooSmall.length === 0, tooSmall.join(', '));

    /* ---------- images ----------
       Criterion: the frame must match the artwork, i.e. the artwork must not be cropped.
       `object-contain` letterboxes (whole image visible, frame wider/taller), `object-cover` crops.
       So the check looks at the effective fit mode + coverage, not at box ratio alone. */
    const badRatio = [];
    for (const img of document.querySelectorAll('main img')) {
      if (!img.naturalWidth) continue;
      const r = rect(img);
      if (r.width < 2 || r.height < 2) continue;
      const srcRatio = img.naturalWidth / img.naturalHeight;
      const boxRatio = r.width / r.height;
      const fit = getComputedStyle(img).objectFit || 'fill';
      // Fraction of the box the artwork covers when it is letterboxed inside this frame.
      const covered =
        fit === 'contain'
          ? srcRatio > boxRatio
            ? boxRatio / srcRatio
            : srcRatio / boxRatio
          : 1;
      const croppedCover = fit === 'cover';
      const distortingFill = fit === 'fill' && Math.abs(srcRatio - boxRatio) / srcRatio > 0.02;
      if (croppedCover || distortingFill || covered < 0.5) {
        badRatio.push({
          src: (img.currentSrc || '').split('/').pop(),
          srcR: Math.round(srcRatio * 100) / 100,
          boxR: Math.round(boxRatio * 100) / 100,
          fit,
          covered: Math.round(covered * 100) / 100,
        });
      }
    }
    push('images.frame-matches-artwork', badRatio.length === 0, JSON.stringify(badRatio.slice(0, 4)));

    /* ---------- card evenness ---------- */
    // Grid items stretch by default, so compare the visible card box inside each item
    // (the element carrying the card surface/border), not the stretched wrapper.
    const cardBox = (item) => {
      const inner = [...item.querySelectorAll('*')].find(
        (n) => visible(n) && /\brounded-card\b/.test(String(n.className))
      );
      return inner || item;
    };
    const ragged = [];
    for (const row of document.querySelectorAll('main .grid')) {
      const kids = [...row.children].filter(visible);
      if (kids.length < 2) continue;
      // Only genuine card rows: every child shares the same layout class signature.
      const sigs = new Set(kids.map((k) => String(k.className)));
      if (sigs.size !== 1) continue;
      const tops = kids.map((k) => Math.round(rect(k).top));
      if (new Set(tops).size !== 1) continue;
      const boxes = kids.map(cardBox);
      const hs = boxes.map((b) => Math.round(rect(b).height));
      const delta = Math.max(...hs) - Math.min(...hs);
      if (delta > 1) ragged.push({ delta, hs });
    }
    push('cards.equal-height-in-row', ragged.length === 0, JSON.stringify(ragged.slice(0, 3)));

    /* ---------- contact transport ---------- */
    if (onContact) {
      const form = document.querySelector('form');
      push('contact.form-present', !!form, form ? 'form rendered' : 'no form on /contact');
      if (form) {
        push(
          'contact.form-has-transport',
          /mailto:|action=/.test(form.outerHTML) ||
            !!window.__CONTACT_TRANSPORT ||
            form.dataset.transport === 'mailto',
          `mailto:/action in markup=${/mailto:|action=/.test(form.outerHTML)} transport=${form.dataset.transport || window.__CONTACT_TRANSPORT || 'none'}`
        );
      }
      push('contact.no-false-success-copy', !/Berhasil Terkirim/.test(document.body.innerText), 'no false "Berhasil Terkirim" claim');
    }

    window.scrollTo(0, 0);
    return JSON.stringify(results);
  };

  // Settle scroll-reveal animations first, then measure.
  const se = document.scrollingElement || document.documentElement;
  const height = se.scrollHeight;
  document.documentElement.style.scrollBehavior = 'auto';
  return new Promise((resolve) => {
    let y = 0;
    const step = () => {
      y += Math.max(200, Math.round(innerHeight * 0.6));
      window.scrollTo(0, y);
      if (y < height) setTimeout(step, 60);
      else setTimeout(() => resolve(run()), 400);
    };
    step();
  });
})();
