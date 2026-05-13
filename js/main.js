// ─── main.js ──────────────────────────────────────────────
// Shared across all pages: cursor, starfield, scroll reveal.

// ─── Custom Cursor ────────────────────────────────────────

const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

if (cursor && cursorRing) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animateCursor() {
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';

    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;

    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

// ─── Starfield ────────────────────────────────────────────

const canvas = document.getElementById('stars');

if (canvas) {
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    const count = window.innerWidth < 768 ? 80 : 160;

    for (let i = 0; i < count; i++) {
      stars.push({
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height,
        r:       Math.random() * 1.2,
        alpha:   Math.random() * 0.6 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
      s.twinkle += 0.015;
      const a = s.alpha * (0.7 + 0.3 * Math.sin(s.twinkle));

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 180, 255, ${a})`;
      ctx.fill();
    });

    requestAnimationFrame(drawStars);
  }

  resize();
  initStars();
  drawStars();

  window.addEventListener('resize', () => {
    resize();
    initStars();
  });
}

// ─── Scroll Reveal ────────────────────────────────────────

const reveals = document.querySelectorAll('.reveal');

if (reveals.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 70);
      }
    });
  }, { threshold: 0.08 });

  reveals.forEach(el => observer.observe(el));
}

// ─── Work Card Glow (homepage only) ──────────────────────

document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});
