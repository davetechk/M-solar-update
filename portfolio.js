/* ========================================= */
/* portfolio.js                              */
/* Handles: portfolio.html + portfolio-details.html */
/* ========================================= */


/* ── PROJECT DATA ──────────────────────────────────────────────────── */

const projects = {

  "maitama": {
    heroTitle:      "Maitama Equinox",
    heroTitleAmber: "Head Office",
    subtitle:       "Redefining urban retail energy consumption through high-efficiency solar integration and intelligent battery storage.",
    category:       "Commercial Solar Grid",
    location:       "Avenue Mall, Downtown",
    client:         "N&W Systems",
    date:           "October 2022",
    heroBg:         "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1600&auto=format&fit=crop",
    challenge:      "Avenue Mall, a premium retail destination, grappled with frequent power disruptions and rising electricity costs. The facility needed a solution that could handle high peak loads during summer afternoons, while ensuring 24/7 reliability for cold storage and lighting across 700+ retail spaces.",
    solution:       "MO Solar Energy engineered a bespoke hybrid system. We deployed 120 high-efficiency monocrystalline panels, establishing a 160kWh lithium-iron phosphate battery pack. The system features a 300kW lithium iron phosphate (LiFePO4) battery bank.",
    features: [
      "Thin Film Modules for maximum coverage",
      "Advanced Load Shifting Algorithms",
      "Remote Monitoring & Real-time Analytics"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop"
    ]
  },

  "gidan-kwano": {
    heroTitle:      "Gidan Kwano",
    heroTitleAmber: "Community Mini-Grid",
    subtitle:       "Delivering reliable 24/7 clean energy to underserved communities through intelligent solar micro-grid technology.",
    category:       "Mini-Grid",
    location:       "Gidan Kwano Village",
    client:         "Federal Government Initiative",
    date:           "March 2023",
    heroBg:         "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1600&auto=format&fit=crop",
    challenge:      "The Gidan Kwano village suffered from frequent power outages and total darkness at night, affecting education, healthcare storage and local business growth. Reliable energy from the main grid was entirely unavailable.",
    solution:       "MO Solar Energy designed and installed a 150kW containerised solar mini-grid with 300kWh of battery storage. This autonomous system provides 24/7 clean energy to the entire community infrastructure.",
    features: [
      "150kW Solar Capacity with battery storage",
      "Smart metering for fair energy distribution",
      "Community revenue sharing model"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548336872-5e7df784d0e8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=800&auto=format&fit=crop"
    ]
  },

  "minigrid": {
    heroTitle:      "Kaduna Community",
    heroTitleAmber: "Power Hub",
    subtitle:       "Scalable solar network serving thousands of homes and businesses with clean, reliable, affordable power.",
    category:       "Mini Grid",
    location:       "Kaduna State, Nigeria",
    client:         "Kaduna State Government",
    date:           "June 2023",
    heroBg:         "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1600&auto=format&fit=crop",
    challenge:      "Over 2,000 households in Kaduna's rural outskirts had no access to reliable electricity. Businesses depended on expensive and polluting diesel generators, raising operational costs significantly.",
    solution:       "MO Solar Energy deployed a distributed mini-grid system with 200kW solar capacity and 500kWh battery storage, creating a reliable power network for the entire community.",
    features: [
      "200kW solar generation capacity",
      "500kWh battery backup storage",
      "Automated load balancing system"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=800&auto=format&fit=crop"
    ]
  },

  "factory": {
    heroTitle:      "Abuja Manufacturing",
    heroTitleAmber: "Plant",
    subtitle:       "High-output hybrid solar system eliminating diesel dependency for major industrial operations in Abuja.",
    category:       "Industrial Solar",
    location:       "Kubwa, Abuja",
    client:         "Sunrise Manufacturing Ltd",
    date:           "January 2024",
    heroBg:         "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1600&auto=format&fit=crop",
    challenge:      "The manufacturing plant was spending over ₦8M monthly on diesel fuel and experiencing production halts due to frequent power interruptions, costing valuable production time and revenue.",
    solution:       "MO Solar Energy designed and implemented a 500kW hybrid solar system integrated with the plant's existing infrastructure, reducing diesel consumption by 85% and stabilising production.",
    features: [
      "500kW industrial-grade solar array",
      "85% diesel cost reduction achieved",
      "Industrial UPS integration & monitoring"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop"
    ]
  },

  "estate": {
    heroTitle:      "Lekki Green",
    heroTitleAmber: "Estate",
    subtitle:       "Comprehensive solar integration with shared storage for a 45-home premium residential estate in Lagos.",
    category:       "Residential Estate",
    location:       "Lekki Phase 1, Lagos",
    client:         "Greenfield Developers",
    date:           "September 2023",
    heroBg:         "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    challenge:      "A luxury residential estate of 45 homes needed a comprehensive power solution to eliminate NEPA outages while maintaining the aesthetic appeal of the buildings and surroundings.",
    solution:       "MO Solar Energy designed a centralised solar and storage system for the entire estate, with individual metering per home and a shared 800kWh battery bank ensuring uninterrupted power.",
    features: [
      "Centralised 300kW estate solar array",
      "Individual home energy metering",
      "800kWh shared battery storage"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop"
    ]
  },

  "school": {
    heroTitle:      "Community School",
    heroTitleAmber: "Project",
    subtitle:       "Reliable solar power enabling quality education for thousands of students across rural communities in Nasarawa.",
    category:       "Education Grid",
    location:       "Nasarawa State, Nigeria",
    client:         "State Education Board",
    date:           "April 2024",
    heroBg:         "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop",
    challenge:      "Multiple school campuses across Nasarawa State had no reliable power, affecting computer labs, science experiments, and administrative operations — severely limiting the quality of education.",
    solution:       "MO Solar Energy installed dedicated solar systems across 8 school campuses, providing 24/7 power for classrooms, computer labs, libraries, and administrative offices.",
    features: [
      "Solar systems deployed across 8 campuses",
      "Priority power routing to computer labs",
      "Battery backup for evening programs"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop"
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

  /* Page title */
  document.title = data.heroTitle + ' ' + data.heroTitleAmber + ' | MO Solar Energy';

  /* Hero background */
  const heroBg = document.getElementById('pd-hero-bg');
  if (heroBg) {
    heroBg.style.cssText =
      'position:absolute;inset:0;transform:scale(1.03);background:' +
      'linear-gradient(180deg,rgba(12,23,35,.52) 0%,rgba(12,23,35,.74) 60%,rgba(12,23,35,.90) 100%),' +
      'url("' + data.heroBg + '") center/cover no-repeat;';
  }

  /* Title lines */
  setText('pd-title-line1', data.heroTitle);
  setText('pd-title-line2', data.heroTitleAmber);
  setText('pd-subtitle',    data.subtitle);

  /* Meta bar */
  setText('pd-category', data.category);
  setText('pd-location', data.location);
  setText('pd-client',   data.client);
  setText('pd-date',     data.date);

  /* Body text */
  setText('pd-challenge', data.challenge);
  setText('pd-solution',  data.solution);

  /* Body side image (use 2nd gallery image as the featured side photo) */
  var bodyImg = document.getElementById('pd-body-img-el');
  if (bodyImg && data.gallery[1]) {
    bodyImg.src = data.gallery[1];
    bodyImg.alt = data.heroTitle + ' installation';
  }

  /* Feature bullets */
  const featuresList = document.getElementById('pd-features');
  if (featuresList) {
    data.features.forEach(function(f) {
      var li = document.createElement('li');
      li.innerHTML =
        '<span class="pd-feature-check"><i class="fa-solid fa-check"></i></span>' + f;
      featuresList.appendChild(li);
    });
  }

  /* Gallery — two flex columns: left[0,2], right[1,3]
     Left  col: item 0 = big (top),   item 2 = small (bottom)
     Right col: item 1 = small (top), item 3 = big   (bottom) */
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
