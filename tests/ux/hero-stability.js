(function () {
  // Sample h1 text + hero height over time to prove the hero is stable.
  const h1 = document.querySelector('h1');
  const hero = document.querySelector('main section');
  const samples = [];
  let n = 0;
  return new Promise((res) => {
    const t = setInterval(() => {
      samples.push({
        txt: h1.textContent.trim().length,
        h1h: Math.round(h1.getBoundingClientRect().height),
        heroh: Math.round(hero.getBoundingClientRect().height),
      });
      if (++n >= 24) {
        clearInterval(t);
        const uniq = (k) => [...new Set(samples.map((s) => s[k]))];
        res(JSON.stringify({
          textLens: uniq('txt'),
          h1Heights: uniq('h1h'),
          heroHeights: uniq('heroh'),
          fullName: h1.textContent.trim() === 'Navyro Bagaskara',
        }));
      }
    }, 140);
  });
})()
