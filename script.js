document.addEventListener('DOMContentLoaded', () => {
  // 1. Core Integrations
  document.getElementById('year').textContent = new Date().getFullYear();

  // 2. Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Init

  // 3. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  let isMenuOpen = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      mobileMenu.classList.remove('hidden');
      menuIcon.setAttribute('data-lucide', 'x');
    } else {
      mobileMenu.classList.add('hidden');
      menuIcon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons(); // Refresh icon
  };

  mobileMenuBtn.addEventListener('click', toggleMenu);

  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) toggleMenu();
    });
  });

  // 4. Contact Form Logic
  const MY_PHONE = "+94764362126";
  const inquiryForm = document.getElementById('inquiry-form');
  if (inquiryForm) {
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const formSuccess = document.getElementById('form-success');

    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(inquiryForm);
      const text = `*New Website Inquiry*\n\n*Name:* ${formData.get('firstName')} ${formData.get('lastName')}\n*Email:* ${formData.get('email')}\n*Message:* ${formData.get('message')}`;
      
      submitBtn.disabled = true;
      btnText.textContent = 'Processing...';

      setTimeout(() => {
        inquiryForm.classList.add('hidden');
        formSuccess.classList.remove('hidden');
        window.open(`https://wa.me/${MY_PHONE.replace('+', '')}?text=${encodeURIComponent(text)}`, '_blank');

        setTimeout(() => {
          inquiryForm.reset();
          inquiryForm.classList.remove('hidden');
          formSuccess.classList.add('hidden');
          submitBtn.disabled = false;
          btnText.textContent = 'Send via WhatsApp';
        }, 4000);
      }, 800);
    });
  }

  // 5. Lightbox Overlay Logic
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const destCards = document.querySelectorAll('.lightbox-trigger');

    destCards.forEach(card => {
      card.addEventListener('click', () => {
        const imgTarget = card.querySelector('.dest-img').src;
        lightboxImg.src = imgTarget;
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
      });
    });

    const closeLightbox = () => {
      lightbox.classList.add('hidden');
      document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // 6. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all others
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        });

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  }

  // 7. Testimonial Slider Logic
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('slider-dots');
  if (slides.length > 0 && dotsContainer) {
    let currentSlide = 0;
    // Generate dots
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');
    
    const goToSlide = (n) => {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    };

    // Auto-advance
    setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  // 8. Interactive Map (Leaflet.js)
  const mapEl = document.getElementById('interactive-map');
  if (mapEl) {
    setTimeout(() => {
      // Wait for DOM layout
      const map = L.map('interactive-map').setView([7.8731, 80.7718], 7); // Center Sri Lanka
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      const locations = [
        { name: "Ella", coords: [6.8667, 81.0466], desc: "Lush green tea plantations" },
        { name: "Sigiriya", coords: [7.9570, 80.7603], desc: "Ancient rock fortress" },
        { name: "Yala", coords: [6.3687, 81.5165], desc: "Wildlife & Leopards" },
        { name: "Mirissa", coords: [5.9483, 80.4533], desc: "Whale watching" }
      ];

      locations.forEach(loc => {
        const marker = L.marker(loc.coords).addTo(map);
        marker.bindPopup(`<h3>${loc.name}</h3><p>${loc.desc}</p>`);
      });
    }, 100);
  }

  // 9. Multi-Language Support Logic
  const translations = {
    en: {
      "nav-dest": "Destinations",
      "nav-about": "About",
      "nav-faq": "FAQ",
      "nav-auth": "Sign In",
      "nav-cta": "Plan Your Trip",
      "hero-badge": "Welcome to the Pearl of the Indian Ocean",
      "hero-title": "Discover the Magic of <span class='text-emerald'>Sri Lanka</span>",
      "hero-subtitle": "Embark on an unforgettable journey through ancient ruins, pristine beaches, misty mountains, and vibrant wildlife.",
      "hero-btn1": "Start Exploring",
      "hero-btn2": "WhatsApp Us",
      "about-title": "Why Travel With Us?",
      "about-desc": "We provide premium, hassle-free travel experiences tailored to your desires.",
      "feat1-title": "Curated Itineraries",
      "feat1-desc": "Tailor-made journeys designed by local experts.",
      "feat2-title": "Tropical Climate",
      "feat2-desc": "Year-round sunshine and diverse weather zones.",
      "feat3-title": "Scenic Beauty",
      "feat3-desc": "From misty mountains to golden sandy beaches.",
      "feat4-title": "Eco-Tourism",
      "feat4-desc": "Sustainable travel protecting our island's nature.",
      "dest-title": "Places You Must Visit",
      "dest-hint": "Click images to view full screen",
      "dest1-title": "Ella & Nine Arch Bridge",
      "dest2-title": "Sigiriya Rock Fortress",
      "dest3-title": "Yala National Park",
      "dest4-title": "Mirissa & South Coast",
      "dest5-title": "Kandy Temple of the Tooth",
      "dest6-title": "Galle Dutch Fort",
      "dest7-title": "Nuwara Eliya",
      "dest8-title": "Polonnaruwa Ruins",
      "dest1-desc": "Lush green tea plantations and iconic railway journeys.",
      "dest2-desc": "Ancient palace and fortress complex with breathtaking views.",
      "dest3-desc": "Spot leopards, elephants, and exotic wildlife in their natural habitat.",
      "dest4-desc": "Pristine beaches, surf breaks, and blue whale watching.",
      "dest5-desc": "The spiritual heart of Sri Lanka and a serene misty lake.",
      "dest6-desc": "Beautiful colonial architecture, boutique shops, and vibrant sunsets.",
      "dest7-desc": "Known as 'Little England' with majestic waterfalls and cool climates.",
      "dest8-desc": "Discover the ancient stone temples of deeply rooted kingdoms.",
      "search-placeholder": "Search destinations...",
      "map-title": "Explore The Regions",
      "map-desc": "Discover our top destinations scattered across the island.",
      "form-title": "Send an Inquiry",
      "form-btn": "Send via WhatsApp"
    },
    de: {
      "nav-dest": "Reiseziele",
      "nav-about": "Über uns",
      "nav-faq": "FAQ",
      "nav-auth": "Anmelden",
      "nav-cta": "Reise planen",
      "hero-badge": "Willkommen auf der Perle des Indischen Ozeans",
      "hero-title": "Entdecke die Magie von <span class='text-emerald'>Sri Lanka</span>",
      "hero-subtitle": "Begeben Sie sich auf eine unvergessliche Reise durch antike Ruinen und unberührte Strände.",
      "hero-btn1": "Erkunden",
      "hero-btn2": "WhatsApp uns",
      "about-title": "Warum mit uns reisen?",
      "about-desc": "Wir bieten erstklassige, stressfreie Reiseerlebnisse, die auf Ihre Wünsche zugeschnitten sind.",
      "feat1-title": "Maßgeschneiderte Routen",
      "feat1-desc": "Von lokalen Experten entworfene Reisen.",
      "feat2-title": "Tropisches Klima",
      "feat2-desc": "Ganzjähriger Sonnenschein und diverse Wetterzonen.",
      "feat3-title": "Malerische Schönheit",
      "feat3-desc": "Von nebligen Bergen bis zu goldenen Sandstränden.",
      "feat4-title": "Ökotourismus",
      "feat4-desc": "Nachhaltiges Reisen zum Schutz unserer Insel.",
      "dest-title": "Orte, die man besuchen muss",
      "dest-hint": "Klicken Sie auf Bilder, um den Vollbildmodus anzuzeigen",
      "dest1-title": "Ella & Neun-Bogen-Brücke",
      "dest2-title": "Sigiriya Felsenfestung",
      "dest3-title": "Yala Nationalpark",
      "dest4-title": "Mirissa & Südküste",
      "dest5-title": "Kandy Zahntempel",
      "dest6-title": "Galle Fort",
      "dest7-title": "Nuwara Eliya",
      "dest8-title": "Polonnaruwa Ruinen",
      "dest1-desc": "Üppig grüne Teeplantagen und malerische Zugfahrten.",
      "dest2-desc": "Antike Felsenfestung mit atemberaubender Aussicht.",
      "dest3-desc": "Beobachten Sie Leoparden und asiatische Elefanten in freier Wildbahn.",
      "dest4-desc": "Unberührte Strände, gute Surfspots und Blauwalbeobachtung.",
      "dest5-desc": "Das spirituelle Herz Sri Lankas an einem friedlichen See.",
      "dest6-desc": "Kolonialarchitektur, Boutiquen und farbenprächtige Sonnenuntergänge.",
      "dest7-desc": "Bekannt als 'Little England' mit dichten Teefeldern.",
      "dest8-desc": "Entdecken Sie alte Steintempel verfallener Königreiche.",
      "search-placeholder": "Reiseziele suchen...",
      "map-title": "Erkunden Sie die Regionen",
      "map-desc": "Entdecken Sie unsere Top-Reiseziele auf der ganzen Insel verteilt.",
      "form-title": "Anfrage senden",
      "form-btn": "Über WhatsApp senden"
    },
    fr: {
      "nav-dest": "Destinations",
      "nav-about": "À propos",
      "nav-faq": "FAQ",
      "nav-auth": "Se connecter",
      "nav-cta": "Planifier",
      "hero-badge": "Bienvenue sur la Perle de l'Océan Indien",
      "hero-title": "Découvrez la Magie du <span class='text-emerald'>Sri Lanka</span>",
      "hero-subtitle": "Embarquez pour un voyage inoubliable à travers des ruines antiques et des plages immaculées.",
      "hero-btn1": "Explorer",
      "hero-btn2": "WhatsApp Nous",
      "about-title": "Pourquoi voyager avec nous ?",
      "about-desc": "Nous offrons des expériences de voyage haut de gamme et sans tracas adaptées à vos désirs.",
      "feat1-title": "Itinéraires Sur Mesure",
      "feat1-desc": "Des voyages conçus par des experts locaux.",
      "feat2-title": "Climat Tropical",
      "feat2-desc": "Du soleil toute l'année et diverses zones climatiques.",
      "feat3-title": "Beauté Pittoresque",
      "feat3-desc": "Des montagnes brumeuses aux plages de sable doré.",
      "feat4-title": "L'écotourisme",
      "feat4-desc": "Des voyages durables pour protéger la nature de notre île.",
      "dest-title": "Lieux Incontournables",
      "dest-hint": "Cliquez pour voir en plein écran",
      "dest1-title": "Pont à Neuf Arches d'Ella",
      "dest2-title": "Forteresse de Sigiriya",
      "dest3-title": "Parc National de Yala",
      "dest4-title": "Mirissa et Côte Sud",
      "dest5-title": "Temple de la Dent de Kandy",
      "dest6-title": "Fort hollandais de Galle",
      "dest7-title": "Nuwara Eliya",
      "dest8-title": "Ruines de Polonnaruwa",
      "dest1-desc": "Plantations de thé luxuriantes et trajets en train emblématiques.",
      "dest2-desc": "Complexe palatial antique avec des vues à couper le souffle.",
      "dest3-desc": "Observez des léopards et des éléphants dans leur habitat naturel.",
      "dest4-desc": "Plages immaculées, spots de surf et observation des baleines bleues.",
      "dest5-desc": "Le cœur spirituel du Sri Lanka avec un lac brumeux serein.",
      "dest6-desc": "Architecture coloniale, boutiques et couchers de soleil vibrants.",
      "dest7-desc": "Surnommée 'Petite Angleterre' avec ses collines verdoyantes.",
      "dest8-desc": "Découvrez les anciens temples de pierre des royaumes passés.",
      "search-placeholder": "Rechercher des destinations...",
      "map-title": "Explorez les Régions",
      "map-desc": "Découvrez nos meilleures destinations dispersées à travers l'île.",
      "form-title": "Envoyer une Demande",
      "form-btn": "Envoyer via WhatsApp"
    }
  };

  const setLanguage = (lang) => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key]; 
      }
    });
    
    // special handling for placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang] && translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    // sync dropdown
    const globalSelect = document.getElementById('lang-select-global');
    if (globalSelect) globalSelect.value = lang;
  };

  const globalSelect = document.getElementById('lang-select-global');
  if (globalSelect) globalSelect.addEventListener('change', (e) => setLanguage(e.target.value));

  // 10. Destination Live Search
  const searchInput = document.getElementById('dest-search');
  if(searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.dest-card');
      
      cards.forEach(card => {
        const title = card.querySelector('.dest-info h3').textContent.toLowerCase();
        const desc = card.querySelector('.dest-info p').textContent.toLowerCase();
        
        if (title.includes(term) || desc.includes(term)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

});
