// Mobile menu
const menuBtn = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const opened = nav.style.display === 'flex';
    nav.style.display = opened ? 'none' : 'flex';
    menuBtn.setAttribute('aria-expanded', String(!opened));
  });
}

// Sticky header shadow on scroll + smooth reveal
const header = document.getElementById('site-header');
const onScroll = () => {
  if (window.scrollY > 8) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll);
onScroll();

// IntersectionObserver for reveal animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1;
      e.target.style.transform = 'translateY(0)';
      observer.unobserve(e.target);
    }
  });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      const el = document.querySelector(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.pageYOffset - 76;
      window.scrollTo({top:y, behavior:'smooth'});
      // close mobile menu
      if (window.innerWidth <= 820) nav.style.display = 'none';
    }
  });
});

// Contact form (front-end only)
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
const waQuick = document.getElementById('waQuick');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.getElementById('name').value || '').trim();
    const email = (document.getElementById('email').value || '').trim();
    const message = (document.getElementById('message').value || '').trim();

    if (!name || !email || !message) {
      msg.textContent = 'Please fill all fields.';
      msg.style.color = '#d93025';
      return;
    }
    // Build WhatsApp prefilled message as lead capture
    const text = encodeURIComponent(
      `Hello VimaBazaar,\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    );
    const waUrl = `https://wa.me/919825112950?text=${text}`;
    if (waQuick) waQuick.href = waUrl;

    msg.textContent = 'Thanks! Opening WhatsApp to send your message...';
    msg.style.color = '#0a2e65';
    window.open(waUrl, '_blank', 'noopener');
    form.reset();
  });
}
