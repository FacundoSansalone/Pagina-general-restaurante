    // ==========================================
    // NAVBAR: efecto sticky + shadow al scrollear
    // ==========================================
    (function () {
      var navbar = document.getElementById('navbar');

      function actualizarNavbar() {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      window.addEventListener('scroll', actualizarNavbar, { passive: true });
      actualizarNavbar();
    })();

    // ==========================================
    // HERO: animación de entrada al cargar
    // ==========================================
    (function () {
      var heroBg = document.getElementById('heroBg');
      if (heroBg) {
        setTimeout(function () {
          heroBg.classList.add('cargado');
        }, 100);
      }

      // Activar los elementos fade-in del hero inmediatamente
      var heroFadeEls = document.querySelectorAll('.hero-contenido .fade-in');
      setTimeout(function () {
        heroFadeEls.forEach(function (el, i) {
          setTimeout(function () {
            el.classList.add('visible');
          }, i * 150);
        });
      }, 200);
    })();

    // ==========================================
    // HAMBURGER MENU MOBILE
    // ==========================================
    (function () {
      var hamburger = document.getElementById('hamburger');
      var mobileMenu = document.getElementById('mobileMenu');
      var menuCerrar = document.getElementById('menuCerrar');
      var mobileLinks = document.querySelectorAll('.mobile-link');

      function abrirMenu() {
        hamburger.classList.add('activo');
        mobileMenu.classList.add('activo');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }

      function cerrarMenu() {
        hamburger.classList.remove('activo');
        mobileMenu.classList.remove('activo');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }

      hamburger.addEventListener('click', abrirMenu);
      menuCerrar.addEventListener('click', cerrarMenu);

      mobileLinks.forEach(function (link) {
        link.addEventListener('click', cerrarMenu);
      });

      // Cerrar al hacer click fuera
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') cerrarMenu();
      });
    })();

    // ==========================================
    // TABS DEL MENÚ
    // ==========================================
    (function () {
      var tabs = document.querySelectorAll('.menu-tab');
      var panels = document.querySelectorAll('.menu-panel');

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var targetTab = this.getAttribute('data-tab');

          // Desactivar todos
          tabs.forEach(function (t) {
            t.classList.remove('activo');
            t.setAttribute('aria-selected', 'false');
          });
          panels.forEach(function (p) {
            p.classList.remove('activo');
          });

          // Activar el seleccionado
          this.classList.add('activo');
          this.setAttribute('aria-selected', 'true');
          var targetPanel = document.getElementById('panel-' + targetTab);
          if (targetPanel) {
            targetPanel.classList.add('activo');
          }
        });
      });
    })();

    // ==========================================
    // INTERSECTION OBSERVER — FADE IN AL SCROLL
    // ==========================================
    (function () {
      var options = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
      };

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, options);

      // Observar todos los elementos con fade-in (excepto el hero que ya se maneja aparte)
      var fadeEls = document.querySelectorAll('section:not(#inicio) .fade-in');
      fadeEls.forEach(function (el) {
        observer.observe(el);
      });
    })();

    // ==========================================
    // FORMULARIO DE RESERVA → WHATSAPP
    // ==========================================
    (function () {
      var form = document.getElementById('reservaForm');
      if (!form) return;

      // Establecer fecha mínima como hoy
      var inputFecha = document.getElementById('fecha');
      if (inputFecha) {
        var hoy = new Date();
        var yyyy = hoy.getFullYear();
        var mm = String(hoy.getMonth() + 1).padStart(2, '0');
        var dd = String(hoy.getDate()).padStart(2, '0');
        inputFecha.min = yyyy + '-' + mm + '-' + dd;
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var nombre = document.getElementById('nombre').value.trim();
        var fecha = document.getElementById('fecha').value;
        var personas = document.getElementById('personas').value;
        var mensaje = document.getElementById('mensaje').value.trim();

        // Validación básica
        if (!nombre || !fecha || !personas) {
          alert('Por favor completá los campos obligatorios: nombre, fecha y cantidad de personas.');
          return;
        }

        // Formatear fecha para mejor legibilidad
        var fechaObj = new Date(fecha + 'T12:00:00');
        var opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var fechaFormateada = fechaObj.toLocaleDateString('es-AR', opciones);

        // Construir el mensaje de WhatsApp
        var textoWA = '¡Hola! Me gustaría hacer una reserva en La Trattoria.\n\n';
        textoWA += '👤 *Nombre:* ' + nombre + '\n';
        textoWA += '📅 *Fecha:* ' + fechaFormateada + '\n';
        textoWA += '👥 *Personas:* ' + personas + '\n';
        if (mensaje) {
          textoWA += '📝 *Notas:* ' + mensaje + '\n';
        }
        textoWA += '\n¡Muchas gracias!';

        var urlWA = 'https://wa.me/5491112345678?text=' + encodeURIComponent(textoWA);
        window.open(urlWA, '_blank', 'noopener,noreferrer');
      });
    })();

    // ==========================================
    // SMOOTH SCROLL para links del navbar
    // (fallback para navegadores sin soporte CSS)
    // ==========================================
    (function () {
      var links = document.querySelectorAll('a[href^="#"]');
      links.forEach(function (link) {
        link.addEventListener('click', function (e) {
          var targetId = this.getAttribute('href');
          if (targetId === '#') return;
          var targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            var offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 72;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
          }
        });
      });
    })();
