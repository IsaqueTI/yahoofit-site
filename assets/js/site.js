/* Interações do site: JavaScript puro, sem compilação. */
(() => {
  "use strict";

  const config = window.YAHOOFIT_CONFIG || {};
  const bootstrap = window.bootstrap;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const contactLinks = document.querySelectorAll("a[data-contact]");
  const contactStatus = document.getElementById("contato-status");
  const contactModal = document.getElementById("contatoPendente");
  const mobileMenu = document.getElementById("menuCelular");
  const menuButton = document.querySelector('[data-bs-target="#menuCelular"]');
  const defaultMessage = "Olá, YahooFit! Gostaria de conhecer a academia.";
  const whatsappNumber = String(config.whatsappNumber || "").replace(/\D/g, "");
  const contactReady = config.whatsappConfirmed === true && /^55\d{10,11}$/.test(whatsappNumber);
  let lastContactTrigger = null;

  function focusSection(target) {
    const focusTarget = target.querySelector("h1, h2, h3") || target;
    if (!focusTarget.hasAttribute("tabindex")) focusTarget.setAttribute("tabindex", "-1");
    focusTarget.focus({ preventScroll: true });
  }

  function goToSection(target, hash) {
    if (target.matches("details")) target.open = true;
    target.scrollIntoView({ behavior: reducedMotion.matches ? "instant" : "smooth", block: "start" });
    focusSection(target);
    if (window.location.protocol !== "file:") window.history.replaceState(null, "", hash);
  }

  function showPendingContact(trigger) {
    lastContactTrigger = trigger;
    if (contactModal && bootstrap?.Modal) {
      bootstrap.Modal.getOrCreateInstance(contactModal).show(trigger);
      return;
    }
    const section = document.getElementById("contato");
    if (contactStatus) contactStatus.textContent = "O número de WhatsApp ainda está em validação com a academia.";
    if (section) goToSection(section, "#contato");
  }

  contactLinks.forEach((link) => {
    if (contactReady) {
      const message = link.dataset.message || defaultMessage;
      link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `${link.textContent.trim()} (abre o WhatsApp em outra aba)`);
      return;
    }
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const menuInstance = mobileMenu && bootstrap?.Offcanvas?.getInstance(mobileMenu);
      if (mobileMenu?.classList.contains("show") && menuInstance) {
        mobileMenu.addEventListener("hidden.bs.offcanvas", () => showPendingContact(link), { once: true });
        menuInstance.hide();
      } else {
        showPendingContact(link);
      }
    });
  });

  if (contactReady && contactStatus) contactStatus.hidden = true;
  mobileMenu?.addEventListener("shown.bs.offcanvas", () => menuButton?.setAttribute("aria-expanded", "true"));
  mobileMenu?.addEventListener("hidden.bs.offcanvas", () => menuButton?.setAttribute("aria-expanded", "false"));
  contactModal?.addEventListener("hidden.bs.modal", () => {
    const menuTrigger = document.querySelector('[data-bs-target="#menuCelular"]');
    const focusTarget = lastContactTrigger?.closest(".offcanvas") ? menuTrigger : lastContactTrigger;
    focusTarget?.focus();
  });

  // A rota exata só é habilitada após a validação do endereço e do link.
  if (config.addressConfirmed === true && config.mapsUrl) {
    try {
      const url = new URL(config.mapsUrl);
      const hosts = ["www.google.com", "google.com", "maps.google.com", "maps.app.goo.gl", "goo.gl"];
      if (url.protocol === "https:" && hosts.includes(url.hostname)) {
        document.querySelectorAll("[data-maps-link]").forEach((link) => {
          link.href = url.href;
          link.textContent = "Como chegar (abre em outra aba)";
        });
        document.querySelectorAll("[data-address-pending]").forEach((badge) => { badge.hidden = true; });
      }
    } catch {
      // Um valor inválido mantém o link seguro para a região do bairro.
    }
  }

  // Fecha o Offcanvas antes de rolar e transfere o foco ao conteúdo escolhido.
  mobileMenu?.querySelectorAll('a[href^="#"]:not([data-contact])').forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      const target = hash && document.getElementById(hash.slice(1));
      if (!target) return;
      const instance = bootstrap?.Offcanvas?.getInstance(mobileMenu);
      if (instance && mobileMenu.classList.contains("show")) {
        event.preventDefault();
        mobileMenu.addEventListener("hidden.bs.offcanvas", () => goToSection(target, hash), { once: true });
        instance.hide();
      }
    });
  });

  // Evita manter a navegação móvel aberta quando a janela passa para desktop.
  const desktop = window.matchMedia("(min-width: 992px)");
  desktop.addEventListener("change", (event) => {
    if (event.matches && mobileMenu) bootstrap?.Offcanvas?.getInstance(mobileMenu)?.hide();
  });

  function openLinkedModality() {
    const id = window.location.hash.slice(1);
    if (!id) return;
    try {
      const target = document.getElementById(decodeURIComponent(id));
      if (target?.matches("details")) target.open = true;
    } catch {
      // Um fragmento externo malformado não interrompe a navegação da página.
    }
  }

  document.querySelectorAll('a[href^="#modalidade-"]').forEach((link) => {
    link.addEventListener("click", () => {
      const target = document.getElementById(link.getAttribute("href").slice(1));
      if (target?.matches("details")) target.open = true;
    });
  });
  window.addEventListener("hashchange", openLinkedModality);
  openLinkedModality();

  // A navegação continua utilizável caso o bundle do Bootstrap não carregue.
  if (!bootstrap) {
    document.querySelectorAll(".accordion-collapse").forEach((panel) => panel.classList.add("show"));
    document.querySelectorAll(".accordion-button").forEach((button) => {
      button.classList.remove("collapsed");
      button.setAttribute("aria-expanded", "true");
    });
    const trigger = document.querySelector('[data-bs-target="#menuCelular"]');
    const close = mobileMenu?.querySelector('[data-bs-dismiss="offcanvas"]');
    trigger?.addEventListener("click", () => {
      mobileMenu?.classList.toggle("yf-menu-fallback");
      trigger.setAttribute("aria-expanded", String(mobileMenu?.classList.contains("yf-menu-fallback")));
      close?.focus();
    });
    close?.addEventListener("click", () => { mobileMenu?.classList.remove("yf-menu-fallback"); trigger?.setAttribute("aria-expanded", "false"); trigger?.focus(); });
    mobileMenu?.querySelectorAll('a[href^="#"]:not([data-contact])').forEach((link) => {
      link.addEventListener("click", () => { mobileMenu.classList.remove("yf-menu-fallback"); trigger?.setAttribute("aria-expanded", "false"); });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mobileMenu?.classList.contains("yf-menu-fallback")) {
        mobileMenu.classList.remove("yf-menu-fallback");
        trigger?.setAttribute("aria-expanded", "false");
        trigger?.focus();
      }
    });
  }
})();
