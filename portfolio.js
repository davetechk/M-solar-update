/* ========================================= */
/* portfolio.js                              */
/* Handles: portfolio.html + portfolio-details.html */
/* Real project data from MO Solar Energy Company Profile */
/* ========================================= */


/* ── PROJECT DATA ──────────────────────────────────────────────────── */

const projects = {

  "equinox-hq": {
    heroTitle:      "Equinox Investment Group",
    heroTitleAmber: "Headquarters, Maitama",
    subtitle:       "250kW fully off-grid solar energy system delivering over 300kWh of clean energy daily for a premium corporate headquarters in Maitama, Abuja.",
    category:       "Commercial Off-Grid Solar",
    location:       "Maitama, Abuja",
    client:         "Equinox Investment Group",
    date:           "2024",
    heroBg:         "IMG_S/Mo Sloar/Our Portfolio/20260325_130747.jpg.jpg",
    challenge:      "The Equinox Investment Group Headquarters in Maitama required a robust power solution to meet the high energy demands of a corporate office environment. Dependence on an unreliable grid supply was disrupting critical business operations, while rising diesel generator costs were significantly impacting operational efficiency.",
    solution:       "MO Solar Energy designed and deployed a 250kW fully off-grid solar energy system tailored to the headquarters. The system generates over 300kWh of clean energy daily, enabling complete independence from grid supply and eliminating reliance on diesel generators. The installation ensures uninterrupted power for all critical business operations.",
    features: [
      "250kW fully off-grid solar system capacity",
      "300kWh+ of clean energy generated daily",
      "Complete grid and diesel independence",
      "Optimized for corporate high-load demands"
    ],
    gallery: [
      "IMG_S/Mo Sloar/Our Portfolio/20260325_130747.jpg.jpg",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop"
    ]
  },

  "equinox-residential": {
    heroTitle:      "Equinox 35-Bedroom",
    heroTitleAmber: "Residential Facility, Maitama",
    subtitle:       "1.232MW fully off-grid solar power system generating approximately 1.52MWh of clean energy daily for a large-scale premium residential building in Maitama.",
    category:       "Residential Off-Grid Solar (Ongoing)",
    location:       "Maitama, Abuja",
    client:         "Equinox Investment Group",
    date:           "Ongoing — 2025",
    heroBg:         "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop",
    challenge:      "A 35-bedroom residential building in Maitama required a high-capacity energy solution capable of meeting the substantial and continuous power demands of a large-scale residential facility, while eliminating costly diesel generator dependence.",
    solution:       "MO Solar Energy is deploying a high-capacity 1.232MW fully off-grid solar power system designed to generate approximately 1.52MWh of clean energy daily. The system ensures reliable and uninterrupted power for the entire facility while delivering efficient, sustainable energy for large-scale residential use.",
    features: [
      "1.232MW solar capacity — largest residential deployment",
      "1.52MWh of clean energy generated daily",
      "Fully off-grid — zero diesel dependence",
      "Advanced lithium battery storage system",
      "Scalable phased implementation approach"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop"
    ]
  },

  "fitness-gym-ibadan": {
    heroTitle:      "24-Hour Fitness Gym",
    heroTitleAmber: "Ibadan",
    subtitle:       "305.28kW fully off-grid solar system generating 456.96kWh daily to power round-the-clock fitness facility operations in Ibadan.",
    category:       "Commercial Off-Grid Solar (Ongoing)",
    location:       "Ibadan, Oyo State",
    client:         "24-Hour Fitness Facility",
    date:           "Ongoing — 2025",
    heroBg:         "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1600&auto=format&fit=crop",
    challenge:      "A 24-hour fitness facility in Ibadan needed a reliable power solution capable of supporting continuous round-the-clock operations including gym equipment, lighting, and climate control systems — all without grid interruptions.",
    solution:       "MO Solar Energy deployed a phased 305.28kW fully off-grid solar power system designed to generate approximately 456.96kWh of clean energy daily. The phased approach allows for scalable implementation while maintaining continuous power availability throughout the development.",
    features: [
      "305.28kW fully off-grid solar system",
      "456.96kWh clean energy generated daily",
      "Supports 24/7 round-the-clock operations",
      "Phased deployment for scalable growth",
      "Powers gym equipment, lighting and climate control"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop"
    ]
  },

  "lamiku-gas": {
    heroTitle:      "Lamiku Liquefied Gas Ltd",
    heroTitleAmber: "Apo, Abuja",
    subtitle:       "189.78kW fully off-grid solar solution generating over 177kWh daily for industrial processes and office operations at a leading liquefied gas company in Apo.",
    category:       "Industrial Off-Grid Solar",
    location:       "Apo, Abuja",
    client:         "Lamiku Liquefied Gas Ltd",
    date:           "2024",
    heroBg:         "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1600&auto=format&fit=crop",
    challenge:      "Lamiku Liquefied Gas Ltd needed a reliable energy solution that could simultaneously meet the demands of both heavy industrial processes and administrative office operations, while eliminating the cost and unreliability of conventional power sources.",
    solution:       "MO Solar Energy delivered a 189.78kW fully off-grid solar solution tailored to meet the dual demands of industrial and office operations. With daily energy generation exceeding 177kWh, the system efficiently powers heavy-duty equipment alongside administrative loads, providing a stable energy backbone for continuous operations.",
    features: [
      "189.78kW fully off-grid solar capacity",
      "177kWh+ clean energy generated daily",
      "Powers heavy-duty industrial equipment",
      "Supports full office administrative operations",
      "Continuous operations without power interruptions"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548336872-5e7df784d0e8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop"
    ]
  },

  "maple-supermarkets": {
    heroTitle:      "Maple Supermarkets",
    heroTitleAmber: "Gudu, Abuja",
    subtitle:       "144.44kW fully off-grid solar power system delivering approximately 257kWh daily to power refrigeration, lighting, and continuous retail operations at Maple Supermarkets in Gudu.",
    category:       "Commercial Off-Grid Solar",
    location:       "Gudu, Abuja",
    client:         "Maple Supermarkets",
    date:           "2024",
    heroBg:         "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    challenge:      "Maple Supermarkets faced high and continuous energy demands typical of a retail environment — refrigeration units, lighting, and core store operations requiring uninterrupted power to maintain product quality and customer experience.",
    solution:       "MO Solar Energy deployed a 144.44kW fully off-grid solar power system for Maple Supermarkets. The system delivers approximately 257kWh of clean energy daily, efficiently powering all refrigeration units, lighting, and core store operations with a dependable energy supply.",
    features: [
      "144.44kW fully off-grid solar system",
      "257kWh clean energy delivered daily",
      "Dedicated power for refrigeration units",
      "Supports full store lighting and operations",
      "Zero power interruptions for seamless customer experience"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop"
    ]
  },

  "gateway-ltd": {
    heroTitle:      "The Gateway Ltd",
    heroTitleAmber: "Gudu, Abuja",
    subtitle:       "75.62kW fully off-grid solar system generating over 161.8kWh daily for a media and communications company with high energy-consumption operations in Gudu, Abuja.",
    category:       "Commercial Off-Grid Solar",
    location:       "Gudu, Abuja",
    client:         "The Gateway Ltd",
    date:           "2024",
    heroBg:         "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1600&auto=format&fit=crop",
    challenge:      "The Gateway Ltd, a media and communications company, had significant energy demands driven by production equipment, office infrastructure, and digital operations — all requiring uninterrupted and stable power that the grid could not reliably provide.",
    solution:       "MO Solar Energy deployed a 75.62kW fully off-grid solar power system for The Gateway Ltd. Designed to support high-consumption operations, the system generates over 161.8kWh of clean energy daily, powering all production equipment, office infrastructure, and digital operations seamlessly.",
    features: [
      "75.62kW fully off-grid solar system",
      "161.8kWh+ clean energy generated daily",
      "Powers production and broadcast equipment",
      "Supports office infrastructure and digital operations",
      "Stable, uninterrupted power for media workflows"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop"
    ]
  }

};


/* ── DETAILS PAGE ──────────────────────────────────────────────────── */

function initDetails() {
  const params = new URLSearchParams(window.location.search);
  const id     = params.get('id');
  const data   = projects[id];

  if (!data) {
    document.title = 'Project Not Found | MO Solar Energy';
    return;
  }

  document.title = data.heroTitle + ' ' + data.heroTitleAmber + ' | MO Solar Energy';

  const heroBg = document.getElementById('pd-hero-bg');
  if (heroBg) {
    heroBg.style.cssText =
      'position:absolute;inset:0;transform:scale(1.03);background:' +
      'linear-gradient(180deg,rgba(12,23,35,.52) 0%,rgba(12,23,35,.74) 60%,rgba(12,23,35,.90) 100%),' +
      'url("' + data.heroBg + '") center/cover no-repeat;';
  }

  setText('pd-title-line1', data.heroTitle);
  setText('pd-title-line2', data.heroTitleAmber);
  setText('pd-subtitle',    data.subtitle);

  setText('pd-category', data.category);
  setText('pd-location', data.location);
  setText('pd-client',   data.client);
  setText('pd-date',     data.date);

  setText('pd-challenge', data.challenge);
  setText('pd-solution',  data.solution);

  var bodyImg = document.getElementById('pd-body-img-el');
  if (bodyImg && data.gallery[1]) {
    bodyImg.src = data.gallery[1];
    bodyImg.alt = data.heroTitle + ' installation';
  }

  const featuresList = document.getElementById('pd-features');
  if (featuresList) {
    data.features.forEach(function(f) {
      var li = document.createElement('li');
      li.innerHTML =
        '<span class="pd-feature-check"><i class="fa-solid fa-check"></i></span>' + f;
      featuresList.appendChild(li);
    });
  }

  const gallery = document.getElementById('pd-gallery');
  if (gallery && data.gallery.length >= 4) {
    var leftCol  = document.createElement('div');
    leftCol.className = 'pd-gallery__col';
    var rightCol = document.createElement('div');
    rightCol.className = 'pd-gallery__col';

    var sizeMap = ['big', 'small', 'small', 'big'];

    data.gallery.forEach(function(src, i) {
      var item = document.createElement('div');
      item.className = 'pd-gallery__item pd-gallery__item--' + sizeMap[i];
      item.style.animationDelay = (i * 0.12) + 's';
      item.innerHTML = '<img src="' + src + '" alt="Installation photo ' + (i + 1) + '" loading="lazy">';
      (i === 0 || i === 2 ? leftCol : rightCol).appendChild(item);
    });

    gallery.appendChild(leftCol);
    gallery.appendChild(rightCol);
  }
}


/* ── PORTFOLIO LIST: FILTER ────────────────────────────────────────── */

function initFilter() {
  var filterBtns = document.querySelectorAll('.pf-filter button');
  var cards      = document.querySelectorAll('.pf-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var value = btn.dataset.filter;

      cards.forEach(function(card) {
        if (value === 'all' || card.dataset.cat === value) {
          card.style.display = 'block';
          requestAnimationFrame(function() {
            card.style.opacity  = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity  = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(function() { card.style.display = 'none'; }, 340);
        }
      });
    });
  });
}


/* ── PORTFOLIO LIST: STAT COUNTERS ─────────────────────────────────── */

function initCounters() {
  var counters = document.querySelectorAll('.pf-stat h3');
  if (!counters.length) return;

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;

      var el     = entry.target;
      var target = parseFloat(el.dataset.count);
      var current = 0;
      var speed   = target / 80;

      (function update() {
        current += speed;
        if (current < target) {
          el.textContent = (target % 1 !== 0)
            ? current.toFixed(1) + '+'
            : Math.floor(current) + '+';
          requestAnimationFrame(update);
        } else {
          el.textContent = (target % 1 !== 0)
            ? target.toFixed(1) + '+'
            : target + '+';
        }
      })();

      obs.unobserve(el);
    });
  }, { threshold: 0.55 });

  counters.forEach(function(c) { obs.observe(c); });
}


/* ── SCROLL REVEAL ─────────────────────────────────────────────────── */

function initReveal() {
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.10 });

  els.forEach(function(el) { obs.observe(el); });
}


/* ── NAV TOGGLE (mobile) ───────────────────────────────────────────── */

function initNav() {
  var toggle    = document.querySelector('.nav__toggle');
  var navLinks  = document.querySelector('.nav__links');
  var dropdowns = document.querySelectorAll('.nav__dropdown');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function() {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('is-open');
    });
  }

  dropdowns.forEach(function(dd) {
    var btn = dd.querySelector('.nav__link--btn');
    if (btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        dd.classList.toggle('open');
      });
    }
  });

  document.addEventListener('click', function() {
    dropdowns.forEach(function(dd) { dd.classList.remove('open'); });
  });
}


/* ── HELPER ────────────────────────────────────────────────────────── */

function setText(id, value) {
  var el = document.getElementById(id);
  if (el) el.textContent = value;
}


/* ── BOOT ──────────────────────────────────────────────────────────── */

var isDetailsPage = !!document.getElementById('pd-title-line1');

if (isDetailsPage) {
  initDetails();
} else {
  initFilter();
  initCounters();
}

initNav();
initReveal();