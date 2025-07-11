import MobileMenu from 'mmenu-light';
import Swal from 'sweetalert2';
import Anime from './partials/anime';
import initTootTip from './partials/tooltip';
import AppHelpers from "./app-helpers";

class App extends AppHelpers {
  constructor() {
    super();
    window.app = this;
  }

  loadTheApp() {
    this.setTimeout();
    this.copycontent();
    this.scrollTopButton();
    this.commonThings();
    this.initiateNotifier();
    this.initiateMobileMenu();
    if (header_is_sticky) {
      this.initiateStickyMenu();
    }
    this.initAddToCart();
    this.initiateAdAlert();
    this.initiateDropdowns();
    this.initiateModals();
    this.initiateCollapse();
    this.changeMenuDirection();
    initTootTip();
    this.loadModalImgOnclick();

    salla.comment.event.onAdded(() => window.location.reload());

    this.status = 'ready';
    document.dispatchEvent(new CustomEvent('theme::ready'));
    this.log('Theme Loaded 🎉');
  }

  log(message) {
    salla.log(`ThemeApp(Raed)::${message}`);
    return this;
  }

  changeMenuDirection() {
    app.all('.root-level.has-children', item => {
      if (item.classList.contains('change-menu-dir')) return;
      app.on('mouseover', item, () => {
        let submenu = item.querySelector('.sub-menu .sub-menu');
        if (!submenu) return;
        let rect = submenu.getBoundingClientRect();
        (rect.left < 10 || rect.right > window.innerWidth - 10) && app.addClass(item, 'change-menu-dir');
      });
    });
  }

  loadModalImgOnclick() {
    document.querySelectorAll('.load-img-onclick').forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        let modal = document.querySelector('#' + link.dataset.modalId),
            img = modal.querySelector('img'),
            imgSrc = img.dataset.src;
        modal.open();
        if (img.classList.contains('loaded')) return;
        img.src = imgSrc;
        img.classList.add('loaded');
      });
    });
  }

  commonThings() {
    this.cleanContentArticles('.content-entry');
  }

  cleanContentArticles(elementsSelector) {
    let articleElements = document.querySelectorAll(elementsSelector);
    if (articleElements.length) {
      articleElements.forEach(article => {
        article.innerHTML = article.innerHTML.replace(/\&nbsp;/g, ' ');
      });
    }
  }

  isElementLoaded(selector) {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (document.querySelector(selector)) {
          clearInterval(interval);
          return resolve(document.querySelector(selector));
        }
      }, 160);
    });
  }

  copyToClipboard(event) {
    event.preventDefault();
    let aux = document.createElement("input"),
        btn = event.currentTarget;
    aux.setAttribute("value", btn.dataset.content);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    this.toggleElementClassIf(btn, 'copied', 'code-to-copy', () => true);
    setTimeout(() => {
      this.toggleElementClassIf(btn, 'code-to-copy', 'copied', () => true);
    }, 1000);
  }

  initiateNotifier() {
    salla.notify.setNotifier((message, type) => {
      if (typeof message == 'object') {
        return Swal.fire(message).then(type);
      }

      return Swal.mixin({
        toast: true,
        position: salla.config.get('theme.is_rtl') ? 'top-start' : 'top-end',
        showConfirmButton: false,
        timer: 3500,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      }).fire({
        icon: type,
        title: message,
        showCloseButton: true,
        timerProgressBar: true
      });
    });
  }

  initiateMobileMenu() {
    this.isElementLoaded('#mobile-menu').then(menu => {
      const mobileMenu = new MobileMenu(menu, "(max-width: 1024px)", "(slidingSubmenus: false)");

      salla.lang.onLoaded(() => {
        mobileMenu.navigation({ title: salla.lang.get('blocks.header.main_menu') });
      });

      const drawer = mobileMenu.offcanvas({ position: salla.config.get('theme.is_rtl') ? "right" : 'left' });

      this.onClick("a[href='#mobile-menu']", event => {
        document.body.classList.add('menu-opened');
        event.preventDefault();
        drawer.open();
      });

      this.onClick(".close-mobile-menu", event => {
        document.body.classList.remove('menu-opened');
        event.preventDefault();
        drawer.close();
      });
    });
  }

  initiateStickyMenu() {
    let header = this.element('#mainnav'),
        height = this.element('#mainnav .inner')?.clientHeight;
    if (!header) return;

    window.addEventListener('load', () => setTimeout(() => this.setHeaderHeight(), 500));
    window.addEventListener('resize', () => this.setHeaderHeight());

    window.addEventListener('scroll', () => {
      window.scrollY >= header.offsetTop + height
        ? header.classList.add('fixed-pinned', 'animated')
        : header.classList.remove('fixed-pinned');
      window.scrollY >= 200
        ? header.classList.add('fixed-header')
        : header.classList.remove('fixed-header', 'animated');
    }, { passive: true });
  }

  setHeaderHeight() {
    let height = this.element('#mainnav .inner').clientHeight,
        header = this.element('#mainnav');
    header.style.height = height + 'px';
  }

  initiateAdAlert() {
    let ad = this.element(".salla-advertisement");
    if (!ad) return;

    if (!salla.storage.get('statusAd-' + ad.dataset.id)) {
      ad.classList.remove('hidden');
    }

    this.onClick('.ad-close', function (event) {
      event.preventDefault();
      salla.storage.set('statusAd-' + ad.dataset.id, 'dismissed');

      Anime({
        targets: '.salla-advertisement',
        opacity: [1, 0],
        duration: 300,
        height: [ad.clientHeight, 0],
        easing: 'easeInOutQuad',
      });
    });
  }

  initiateDropdowns() {
    this.onClick('.dropdown__trigger', ({ target: btn }) => {
      btn.parentElement.classList.toggle('is-opened');
      document.body.classList.toggle('dropdown--is-opened');

      window.addEventListener('click', ({ target: el }) => {
        if (!el.closest('.dropdown__menu') && el !== btn || el.classList.contains('dropdown__close')) {
          btn.parentElement.classList.remove('is-opened');
          document.body.classList.remove('dropdown--is-opened');
        }
      });
    });
  }

  initiateModals() {
    this.onClick('[data-modal-trigger]', e => {
      let id = '#' + e.target.dataset.modalTrigger;
      this.removeClass(id, 'hidden');
      setTimeout(() => this.toggleModal(id, true));
    });

    salla.event.document.onClick("[data-close-modal]", e => this.toggleModal('#' + e.target.dataset.closeModal, false));
  }

  toggleModal(id, isOpen) {
    this.toggleClassIf(`${id} .s-salla-modal-overlay`, 'ease-out duration-300 opacity-100', 'opacity-0', () => isOpen)
      .toggleClassIf(`${id} .s-salla-modal-body`,
        'ease-out duration-300 opacity-100 translate-y-0 sm:scale-100',
        'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
        () => isOpen)
      .toggleElementClassIf(document.body, 'modal-is-open', 'modal-is-closed', () => isOpen);
    if (!isOpen) {
      setTimeout(() => this.addClass(id, 'hidden'), 350);
    }
  }

  initiateCollapse() {
    document.querySelectorAll('.btn--collapse').forEach(trigger => {
      const content = document.querySelector('#' + trigger.dataset.show);
      const state = { isOpen: false };

      const onOpen = () => Anime({
        targets: content,
        duration: 225,
        height: content.scrollHeight,
        opacity: [0, 1],
        easing: 'easeOutQuart',
      });

      const onClose = () => Anime({
        targets: content,
        duration: 225,
        height: 0,
        opacity: [1, 0],
        easing: 'easeOutQuart',
      });

      const toggleState = (isOpen) => {
        state.isOpen = !isOpen;
        this.toggleElementClassIf(content, 'is-closed', 'is-opened', () => isOpen);
      };

      trigger.addEventListener('click', () => {
        const { isOpen } = state;
        toggleState(isOpen);
        isOpen ? onClose() : onOpen();
      });
    });
  }

  anime(selector, options = null) {
    let anime = new Anime(selector, options);
    return options === false ? anime : anime.play();
  }

  initAddToCart() {
    salla.cart.event.onUpdated(summary => {
      document.querySelectorAll('[data-cart-total]').forEach(el => el.innerText = salla.money(summary.total));
      document.querySelectorAll('[data-cart-count]').forEach(el => el.innerText = salla.helpers.number(summary.count));
    });

    salla.cart.event.onItemAdded((response, prodId) => {
      app.element('salla-cart-summary').animateToCart(app.element(`#product-${prodId} img`));
    });
  }

  setTimeout() {
    return new Promise(resolve => {
      setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
        resolve();
      }, 3000);
    });
  }

  closeMarquee() {
    var marquee = document.querySelector('.marquee');
    if (marquee) {
      marquee.style.display = 'none';
    }
  }
copycontent() {
  document.querySelectorAll(".contentcode").forEach((item) => {
    item.style.backgroundColor = "var(--color-primary)";
    item.style.color = "#ffffff"; // تأكد أن النص واضح على الخلفية
    item.style.transition = "background-color 0.3s ease";

    if (item.dataset.listenerAttached === "true") return;
    item.dataset.listenerAttached = "true";

    item.addEventListener("click", async (event) => {
      const codeElement = event.target.closest('.flex').querySelector('.code');
      if (!codeElement) {
        console.error("لم يتم العثور على العنصر الذي يحتوي على الكود.");
        return;
      }

      const code = codeElement.innerText;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(code);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = code;
          textarea.setAttribute("readonly", "");
          textarea.style.position = "absolute";
          textarea.style.left = "-9999px";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }

        const originalText = event.target.innerHTML;
        event.target.innerHTML = "Copied ✓";
        event.target.style.backgroundColor = "var(--color-success)";

        setTimeout(() => {
          event.target.innerHTML = originalText;
          event.target.style.backgroundColor = "var(--color-primary)";
        }, 2000);

      } catch (err) {
        console.error("فشل النسخ!", err);
      }
    });
  });
}

  scrollTopButton() {
    document.addEventListener('DOMContentLoaded', () => {
      let lastScrollY = window.scrollY;
      const scrollTopButton = document.querySelector('.scroll-top');

      window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
          if (window.scrollY > lastScrollY) {
            scrollTopButton.classList.add('show');
          } else {
            scrollTopButton.classList.remove('show');
          }
        } else {
          scrollTopButton.classList.remove('show');
        }
        lastScrollY = window.scrollY;
      });

      scrollTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  closeModal() {
    var my = document.getElementById('my_modal');
    my.style.display = "none";
  }
}

salla.onReady(() => (new App).loadTheApp());

