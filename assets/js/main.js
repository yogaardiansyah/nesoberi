document.addEventListener("DOMContentLoaded", () => {
  // ======== SHARED STATE ========
  let currentLang = "id";

  // ======== UI ELEMENTS ========
  const header = document.getElementById("main-header");
  const hamburgerButton = document.getElementById("hamburger-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const previewImage = document.getElementById("preview-image");
  const previewTitle = document.getElementById("preview-title");
  const previewDescription = document.getElementById("preview-description");
  const selectionPanel = document.getElementById("selection-panel");

  // ======== DATA ========
  const sizeData = [
    {
      id: "keychain",
      img: "https://placehold.co/400x400/18181b/ffffff?text=Keychain",
      title: { id: "Gantungan Kunci", en: "Keychain" },
      desc: {
        id: "Unit mikro untuk mobilitas.",
        en: "Micro unit for mobility.",
      },
      active: false,
    },
    {
      id: "standard",
      img: "https://placehold.co/500x500/18181b/ffffff?text=Standard",
      title: { id: "Standar", en: "Standard" },
      desc: {
        id: "Ukuran dasar akuisisi umum.",
        en: "Baseline model for acquisition.",
      },
      active: true,
    },
    {
      id: "mega-jumbo",
      img: "https://placehold.co/500x500/18181b/ffffff?text=Mega+Jumbo",
      title: { id: "Mega Jumbo", en: "Mega Jumbo" },
      desc: {
        id: "Unit besar untuk interaksi pelukan.",
        en: "Large unit for huggable interaction.",
      },
      active: false,
    },
    {
      id: "tera-jumbo",
      img: "https://placehold.co/600x600/18181b/ffffff?text=Tera+Jumbo",
      title: { id: "Tera Jumbo", en: "Tera Jumbo" },
      desc: {
        id: "Edisi kolektor pamungkas.",
        en: "Ultimate collector's edition.",
      },
      active: false,
    },
  ];

  // ======== CORE FUNCTIONS ========

  // [PERBAIKAN] Navbar & Mobile Menu Logic
  const initNav = () => {
    const heroSection = document.getElementById("hero");

    // Fungsi untuk memeriksa posisi scroll dan menampilkan/menyembunyikan header
    const checkHeaderVisibility = () => {
      // Tentukan titik pemicu, yaitu setelah melewati tinggi hero section
      // Diberi sedikit buffer (misal, 90% dari tinggi) agar transisi lebih mulus
      const triggerPoint = heroSection.offsetHeight * 0.9;

      if (window.scrollY > triggerPoint) {
        // Jika sudah melewati jumbotron, tampilkan header
        header.classList.remove("-translate-y-full");
      } else {
        // Jika masih di dalam jumbotron, sembunyikan header
        header.classList.add("-translate-y-full");
      }
    };

    // Tambahkan event listener untuk scroll
    window.addEventListener("scroll", checkHeaderVisibility);

    // Logika untuk menu mobile (hamburger) tetap sama
    const toggleMenu = () => {
      mobileMenu.classList.toggle("translate-x-full");
      document.getElementById("hamburger-open-icon").classList.toggle("hidden");
      document
        .getElementById("hamburger-close-icon")
        .classList.toggle("hidden");
    };
    hamburgerButton.addEventListener("click", toggleMenu);
    document
      .querySelectorAll(".mobile-nav-link")
      .forEach((link) => link.addEventListener("click", toggleMenu));
  };

  // Animate sections on scroll
  const initScrollAnimations = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll(".content-section")
      .forEach((section) => observer.observe(section));
  };

  // Language update logic
  const updateTexts = () => {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-lang-id]").forEach((el) => {
      const text = el.getAttribute(`data-lang-${currentLang}`);
      if (text) {
        el.innerHTML = text;
      }
    });
    document.querySelectorAll(".lang-switcher").forEach((switcher) => {
      switcher.textContent = switcher.getAttribute(`data-lang-${currentLang}`);
    });
    renderSelectionPanel(); // Re-render dynamic parts
  };

  // --- Character Select Logic ---
  const updatePreview = (item) => {
    previewImage.classList.add("animate-glitch");
    setTimeout(() => {
      previewImage.src = item.img;
      previewImage.alt = item.title[currentLang];
      previewTitle.textContent = item.title[currentLang];
      previewDescription.textContent = item.desc[currentLang];
      previewImage.classList.remove("animate-glitch");
    }, 150);
  };

  const renderSelectionPanel = () => {
    selectionPanel.className =
      "w-full md:w-1/2 p-6 md:p-8 grid grid-cols-2 gap-4 content-center";
    selectionPanel.innerHTML = "";

    sizeData.forEach((item) => {
      const card = document.createElement("div");
      const baseClasses =
        "group transition-all duration-300 p-4 rounded-lg cursor-pointer flex flex-col items-center justify-center aspect-square border-2";
      const stateClasses = item.active
        ? "bg-mono-surface/80 border-mono-accent shadow-lg shadow-white/10"
        : "bg-mono-surface/50 border-transparent hover:bg-mono-surface/70 hover:border-mono-accent/50";
      card.className = `${baseClasses} ${stateClasses}`;

      card.innerHTML = `
                <h4 class="font-bold text-lg text-center ${
                  item.active ? "text-mono-accent" : "text-mono-text"
                } group-hover:text-mono-accent transition-colors">${
        item.title[currentLang]
      }</h4>
                <div class="w-8 h-1 mt-2 rounded-full transition-all duration-300 ${
                  item.active
                    ? "bg-mono-accent"
                    : "bg-mono-subtle/50 group-hover:bg-mono-accent/70"
                }"></div>
            `;

      card.addEventListener("click", () => {
        sizeData.forEach((d) => (d.active = false));
        item.active = true;
        updatePreview(item);
        renderSelectionPanel();
      });
      selectionPanel.appendChild(card);
    });

    const activeItem = sizeData.find((d) => d.active);
    if (activeItem) updatePreview(activeItem);
  };

  // Event listener for language switchers
  document.querySelectorAll(".lang-switcher").forEach((switcher) => {
    switcher.addEventListener("click", () => {
      currentLang = currentLang === "id" ? "en" : "id";
      updateTexts();
    });
  });

  // --- Interactive Care Section Logic ---
  const initCareSection = () => {
    const careButtons = document.querySelectorAll(".care-button");
    const carePanels = document.querySelectorAll(".care-panel");
    const activeClasses = "bg-mono-accent text-mono-dark font-semibold";
    const inactiveClasses =
      "bg-mono-border/40 text-mono-text hover:bg-mono-border/70";

    careButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.dataset.target;
        const targetPanel = document.getElementById(targetId);

        // Update button styles
        careButtons.forEach((btn) => {
          btn.className = `care-button p-2 rounded-md text-sm transition-colors duration-200 ${inactiveClasses}`;
        });
        button.className = `care-button p-2 rounded-md text-sm transition-colors duration-200 ${activeClasses}`;

        // Update panel visibility
        carePanels.forEach((panel) => {
          panel.classList.add("opacity-0", "hidden");
        });

        if (targetPanel) {
          targetPanel.classList.remove("hidden");
          // Use a timeout to allow the display property to change before starting the transition
          setTimeout(() => {
            targetPanel.classList.remove("opacity-0");
          }, 10);
        }
      });
    });

    // Trigger a click on the first button to show default content on load
    if (careButtons.length > 0) {
      careButtons[0].click();
    }
  };

  // ======== INITIALIZATION ========
  initNav();
  initScrollAnimations();
  initCareSection();
  updateTexts();
});
