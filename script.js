// ===== CUSTOMIZE HERE =====
const CONFIG = {
  name: "Jacqualine Claresta Gani",           // Nama pacarmu
  birthday: { month: 4, day: 25 }, // Tanggal lahir (bulan, tanggal)
  yourName: "herdi",      // Namamu sendiri
  letter: [
    "Happy 23rd birthday, love. In this new chapter, I hope you don't just chase your dreams, but also enjoy every step of the journey.",
    "Thank you for being the most beautiful part of my life. I will always be by your side, supporting you, and loving you more than I did yesterday.",
    "I hope you become an even better person in every way. Happy birthday, my favorite person!"
  ]
};

// ===== NAV =====
const pages = ['page-landing', 'page-wish', 'page-photo', 'page-letter', 'page-end'];
let current = 'page-landing';

function navigate(targetId) {
  const from = document.getElementById(current);
  const to = document.getElementById(targetId);
  if (!to || current === targetId) return;

  from.classList.add('exit');
  setTimeout(() => {
    from.classList.remove('active', 'exit');
    to.classList.add('active');
    current = targetId;
    updateDots();

    if (targetId === 'page-wish') initWish();
    if (targetId === 'page-letter') initLetter();
    if (targetId === 'page-end') startEndCanvas();
  }, 350);
}

function updateDots() {
  document.querySelectorAll('.prog-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.page === current);
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initBgCanvas();
  buildPhotoGrid();
  setupPhotoInput();
});

// ===== WISH PAGE =====
function initWish() {
  const nameEl = document.getElementById('wishName');
  if (nameEl) nameEl.textContent = CONFIG.name;

  const dateEl = document.getElementById('wishDate');
  if (dateEl) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    dateEl.textContent = `${months[CONFIG.birthday.month - 1]} ${CONFIG.birthday.day}`;
  }
}

// ===== LETTER PAGE =====
function initLetter() {
  const body = document.getElementById('letterBody');
  if (body) body.innerHTML = CONFIG.letter.map(p => `<p>${p}</p>`).join('');

  const from = document.getElementById('letterFrom');
  if (from) from.textContent = `— ${CONFIG.yourName}`;
}

// ===== PHOTO GRID =====
const labels = ['Favorite', 'Us', 'Memory', 'Together', 'Smile', 'Forever'];
const photoFiles = ['2.jpeg', '3.jpeg', '5.jpeg', '10.jpeg', '11.jpeg', '13.jpeg'];

function buildPhotoGrid() {
  const grid = document.getElementById('photoGrid');
  if (!grid) return;
  grid.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    const frame = document.createElement('div');
    frame.className = 'photo-frame loaded';
    frame.dataset.idx = i;
    frame.innerHTML = `
      <img src="${photoFiles[i]}" alt="${labels[i]}" />
      <div class="caption">${labels[i]}</div>
    `;
    grid.appendChild(frame);
  }
}

function setupPhotoInput() {
  // Photos are pre-loaded from the image folder — no manual input needed
}

// ===== END NAME =====
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('endName');
  if (el) el.textContent = CONFIG.name;
});

// ===== BACKGROUND CANVAS (subtle dust particles) =====
function initBgCanvas() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  resize();

  const dots = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 0.5 + Math.random() * 1,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.1,
    a: Math.random() * 0.4
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0) d.x = canvas.width;
      if (d.x > canvas.width) d.x = 0;
      if (d.y < 0) d.y = canvas.height;
      if (d.y > canvas.height) d.y = 0;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,169,110,${d.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
}

// ===== END CANVAS (gentle light streaks) =====
let endAnimRunning = false;

function startEndCanvas() {
  const canvas = document.getElementById('endCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (endAnimRunning) return;
  endAnimRunning = true;

  const streaks = Array.from({ length: 18 }, () => makeStreak(canvas));

  function makeStreak(c) {
    return {
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      len: 60 + Math.random() * 120,
      angle: -0.3 + Math.random() * 0.15,
      speed: 0.4 + Math.random() * 0.6,
      a: 0, maxA: 0.05 + Math.random() * 0.1,
      growing: true
    };
  }

  function draw() {
    if (!endAnimRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    streaks.forEach(s => {
      s.y -= s.speed;
      if (s.growing) { s.a += 0.002; if (s.a >= s.maxA) s.growing = false; }
      else { s.a -= 0.001; }
      if (s.a <= 0 || s.y < -s.len) Object.assign(s, makeStreak(canvas), { y: canvas.height + s.len });

      const grad = ctx.createLinearGradient(s.x, s.y, s.x + Math.sin(s.angle) * s.len, s.y - s.len);
      grad.addColorStop(0, `rgba(201,169,110,0)`);
      grad.addColorStop(0.5, `rgba(201,169,110,${s.a})`);
      grad.addColorStop(1, `rgba(201,169,110,0)`);
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x + Math.sin(s.angle) * s.len, s.y - s.len);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    requestAnimationFrame(draw);
  }
  draw();
}
