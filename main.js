// Wait for DOM so selectors exist
document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // GSAP Animations
  // =========================
  gsap.registerPlugin(ScrollTrigger);

  // Hero intro
  gsap.from(".navbar", { y: -50, opacity: 0, duration: 1 });
  gsap.from(".hero-content h1", { y: 50, opacity: 0, duration: 1, delay: 0.3 });
  gsap.from(".hero-content p",  { y: 50, opacity: 0, duration: 1, delay: 0.6 });
  gsap.from(".btn", {
    scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)", delay: 0.9
  });
  gsap.from(".socials a", {
    y: 30, opacity: 0, stagger: 0.2, duration: 0.5, delay: 1.2
  });

  // Scroll reveal
  gsap.utils.toArray("section").forEach((sec) => {
    gsap.from(sec, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: { trigger: sec, start: "top 80%" }
    });
  });

  // Button hover glow
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.fromTo(btn,
        { boxShadow: "0 0 0px rgba(243,168,94,0)" },
        { boxShadow: "0 0 25px rgba(243,168,94,1)", duration: 0.4, ease: "power2.out" }
      );
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { boxShadow: "0 0 0px rgba(243,168,94,0)", duration: 0.4 });
    });
  });

  // =========================
  // Simple i18n (EN <-> AR) with animated swap
  // =========================
  const dict = {
    en: {
      nav_products: "Products",
      nav_flavours: "Flavours",
      nav_gifting: "Gifting",
      nav_signup: "Sign Up",
      hero_title: "Everyday is Chocolate Day",
      hero_sub: "Drizzle, crunch & melt – the sweet indulgence you deserve.",
      cta_shop: "Shop Now",
      bags_title: "Chocolate Bags",
      bags_sub: "Perfect for cosy evenings. Shareable, smooth, and rich with flavour.",
      cat_title: "What are you looking for?",
      tab_gifting: "Gifting",
      tab_fav: "Favourites",
      tab_brands: "Our Brands",
      tile_toffee_fudge: "Toffee & Fudge",
      tile_gifts: "Personalised Gifts",
      tile_boxes: "Chocolate Boxes",
      flavours_title: "Our Flavours",
      flav_toffee: "Toffee",
      flav_milk: "Milk Chocolate",
      flav_fudge: "Fudge",
      signup_title: "Sign Up",
      signup_sub: "Be the first to hear about our exclusive offers and chocolate treats.",
      signup_btn: "Sign Up",
      footer_copy: "© 2025 ChocoLux • Crafted with love"
    },
    ar: {
      nav_products: "المنتجات",
      nav_flavours: "النّكهات",
      nav_gifting: "الهدايا",
      nav_signup: "اشترك",
      hero_title: "كل يوم هو يوم الشوكولاتة",
      hero_sub: "انسياب وقِرمشة وذوبان — متعة حلوة تستحقها.",
      cta_shop: "تسوّق الآن",
      bags_title: "أكياس الشوكولاتة",
      bags_sub: "مثالية للأمسيات الدافئة. قابلة للمشاركة وناعمة وغنية بالنكهة.",
      cat_title: "عمّ تبحث؟",
      tab_gifting: "الهدايا",
      tab_fav: "المفضّلة",
      tab_brands: "علاماتنا",
      tile_toffee_fudge: "توفي وفدج",
      tile_gifts: "هدايا مخصّصة",
      tile_boxes: "علب الشوكولاتة",
      flavours_title: "نكهاتنا",
      flav_toffee: "توفي",
      flav_milk: "شوكولاتة بالحليب",
      flav_fudge: "فدج",
      signup_title: "اشترك",
      signup_sub: "كن أوّل من يعرف عروضنا الحصرية وأشهى الشوكولاتة.",
      signup_btn: "اشترك",
      footer_copy: "© 2025 شوكولاكس • صُنعت بحبّ"
    }
  };

  function swapTextsAnimated(lang){
    const els = document.querySelectorAll("[data-i18n]");
    // fade out all, swap, fade in
    return gsap.timeline()
      .to(els, { opacity: 0, y: 6, duration: 0.18, stagger: 0.01, ease: "power1.out" })
      .add(() => {
        els.forEach(el => {
          const key = el.getAttribute("data-i18n");
          if (dict[lang][key] !== undefined) el.textContent = dict[lang][key];
        });
        // direction & lang attrs
        document.body.classList.toggle("rtl", lang === "ar");
        document.documentElement.setAttribute("lang", lang);
        document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
        const btn = document.querySelector("#langToggle");
        if (btn) btn.textContent = lang === "ar" ? "EN" : "AR";
        localStorage.setItem("lang", lang);
      })
      .to(els, { opacity: 1, y: 0, duration: 0.22, stagger: 0.01, ease: "power1.out" });
  }

  // Initial language
  const savedLang = localStorage.getItem("lang") || "en";
  swapTextsAnimated(savedLang);

  // Toggle
  document.querySelector("#langToggle")?.addEventListener("click", () => {
    const current = localStorage.getItem("lang") || "en";
    swapTextsAnimated(current === "en" ? "ar" : "en");
  });
});
