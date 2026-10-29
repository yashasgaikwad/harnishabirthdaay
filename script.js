let soundEnabled = true;
let activeImgTargetId = null;

// Switch between pages
function nextPage(pageNumber, event) {
  if (event) {
    spawnBurstHearts(event.clientX, event.clientY);
  }
  playPopSound();

  const slides = document.querySelectorAll('.page-slide');
  slides.forEach(slide => slide.classList.remove('active'));

  const target = document.getElementById(`page-${pageNumber}`);
  if (target) {
    target.classList.add('active');
  }
}

// Sound effects using Web Audio API
function playPopSound() {
  if (!soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  document.getElementById('soundIcon').textContent = soundEnabled ? '🔊' : '🔇';
}

// Burst hearts on button click
function spawnBurstHearts(x, y) {
  const container = document.getElementById('particle-container');
  const emojis = ['💗', '❤️', '🌸', '✨', '🎀'];
  for (let i = 0; i < 10; i++) {
    const el = document.createElement('div');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.position = 'fixed';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.fontSize = `${Math.random() * 14 + 16}px`;
    el.style.pointerEvents = 'none';
    el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    container.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 90 + 40;
    requestAnimationFrame(() => {
      el.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 40}px) scale(0.4)`;
      el.style.opacity = '0';
    });

    setTimeout(() => el.remove(), 850);
  }
}

// Photo upload handler
function triggerPhotoUpload(imgId) {
  activeImgTargetId = imgId;
  document.getElementById('photoUploadInput').click();
}

document.getElementById('photoUploadInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file && activeImgTargetId) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      document.getElementById(activeImgTargetId).src = evt.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Background floating hearts
setInterval(() => {
  const heart = document.createElement('div');
  heart.className = 'bg-floating-heart';
  heart.textContent = ['💗', '❤️', '🌷', '🌸'][Math.floor(Math.random() * 4)];
  heart.style.left = `${Math.random() * 96}vw`;
  heart.style.fontSize = `${Math.random() * 14 + 16}px`;
  heart.style.animationDuration = `${Math.random() * 6 + 7}s`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 13000);
}, 1400);