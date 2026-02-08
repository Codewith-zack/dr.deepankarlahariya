w
function openWhatsApp() {
  const phone = "917354646045"; // change if needed
  const message = "Hello Doctor, I want to consult regarding my health.";
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
}

function sendEnquiry(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const msg = document.getElementById("message").value;

  const text = `Name: ${name}%0APhone: ${phone}%0AIssue: ${msg}`;
  window.open(`https://wa.me/917354646045?text=${text}`, "_blank");
}

function toggleMenu() {
  const navMenu = document.querySelector('.nav-menu');
  navMenu.classList.toggle('active');
}

// Close menu when clicking outside or on a link
document.addEventListener('click', function(event) {
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');
  if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
    navMenu.classList.remove('active');
  }
});

document.getElementById("enquiryForm")?.addEventListener("submit", sendEnquiry);

// Load navbar and footer components
async function loadComponent(url, position) {
  try {
    // Show loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-indicator';
    loadingDiv.innerHTML = '<div class="spinner"></div>';
    loadingDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255,255,255,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    `;
    document.body.appendChild(loadingDiv);

    const response = await fetch(url);
    const html = await response.text();
    const body = document.body;
    if (position === 'prepend') {
      body.insertAdjacentHTML('afterbegin', html);
    } else if (position === 'append') {
      body.insertAdjacentHTML('beforeend', html);
    }

    // Hide loading indicator
    document.body.removeChild(loadingDiv);
  } catch (error) {
    console.error('Error loading component:', error);
    // Hide loading indicator on error
    const loadingDiv = document.getElementById('loading-indicator');
    if (loadingDiv) document.body.removeChild(loadingDiv);
  }
}

// Close mobile menu when clicking a link
document.addEventListener('click', function(e) {
  if (e.target.matches('.nav-menu a')) {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

function loadFooter() {
  loadComponent('components/footer.html', 'append');
}

// Load components on page load
document.addEventListener('DOMContentLoaded', function() {
  loadFooter();
});

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});
