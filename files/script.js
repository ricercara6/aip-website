// ============================================================
// AOTEAROA INTELLIGENCE PARTY — shared site behaviour
// ============================================================

// ===== Mobile nav toggle =====
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', links.classList.contains('is-open'));
    });
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => links.classList.remove('is-open'));
    });
  }
})();

// ===== Election countdown (real date: Saturday 7 November 2026) =====
(function () {
  const dEl = document.getElementById('cd-days');
  if (!dEl) return;
  const target = new Date('2026-11-07T09:00:00+13:00').getTime();
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-mins');
  const sEl = document.getElementById('cd-secs');

  function tick() {
    const diff = Math.max(0, target - Date.now());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(mins).padStart(2, '0');
    if (sEl) sEl.textContent = String(secs).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
})();

// ===== Scroll reveal =====
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach((i) => i.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((i) => io.observe(i));
})();

// ===== Benchmark bars animate on scroll =====
(function () {
  const bars = document.querySelectorAll('.bmark-bar-fill');
  if (!bars.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.getAttribute('data-width') + '%';
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  bars.forEach((b) => io.observe(b));
})();

// ===== Terminal typewriter easter egg =====
(function () {
  const body = document.getElementById('terminal-body');
  if (!body) return;

  const script = [
    { type: 'prompt', text: 'sudo rebuild-nation' },
    { type: 'dim', text: 'Loading manifesto...' },
    { type: 'dim', text: 'Optimising bureaucracy...' },
    { type: 'dim', text: 'Refactoring transport...' },
    { type: 'dim', text: 'Downloading bipartisan support...' },
    { type: 'err', text: 'ERROR: Package not found.' },
    { type: 'dim', text: 'Continuing anyway.' },
  ];

  let playing = false;

  function typeInto(span, text, speed, done) {
    let i = 0;
    (function step() {
      span.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) setTimeout(step, speed);
      else if (done) done();
    })();
  }

  function playScript() {
    if (playing) return;
    playing = true;
    body.innerHTML = '';
    let idx = 0;

    function nextLine() {
      if (idx >= script.length) {
        const doneLine = document.createElement('div');
        doneLine.className = 'terminal-line';
        doneLine.innerHTML = '<span class="t-prompt">$</span> <span class="t-cursor"></span>';
        body.appendChild(doneLine);
        playing = false;
        return;
      }
      const item = script[idx];
      const lineEl = document.createElement('div');
      lineEl.className = 'terminal-line';
      if (item.type === 'prompt') {
        lineEl.innerHTML = '<span class="t-prompt">$&nbsp;</span>';
      }
      const span = document.createElement('span');
      if (item.type === 'err') span.className = 't-err';
      if (item.type === 'dim') span.className = 't-dim';
      lineEl.appendChild(span);
      body.appendChild(lineEl);
      const speed = item.type === 'prompt' ? 42 : 20;
      typeInto(span, item.text, speed, () => {
        idx++;
        setTimeout(nextLine, item.type === 'err' ? 500 : 300);
      });
    }
    nextLine();
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playScript();
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  io.observe(body);

  const rerun = document.getElementById('terminal-rerun');
  if (rerun) rerun.addEventListener('click', playScript);
})();

// ===== Footer "live" status flicker =====
(function () {
  const el = document.getElementById('live-latency');
  if (!el) return;
  setInterval(() => {
    el.textContent = (17 + Math.floor(Math.random() * 11)) + ' ms';
  }, 2400);
})();

// ===== Policy portfolio filter (policies.html) =====
(function () {
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('[data-portfolio]');
  if (!chips.length || !cards.length) return;
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.getAttribute('data-filter');
      cards.forEach((card) => {
        card.style.display = filter === 'all' || card.getAttribute('data-portfolio') === filter ? '' : 'none';
      });
    });
  });
})();

// ===== Current year in footer =====
(function () {
  document.querySelectorAll('.js-year').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
