export default class Drawer {
    constructor(
      selector = '.js-drawer',
      CLASS_IS_OPEN = 'menu-is-open',
      CLASS_OVERLAY_IS_SHOWING = 'page-overlay-shown',
      CLASS_NO_SCROLL = 'u-no-scroll',
      //Accordion
      optionsAttribute = "[data-trigger-number]",
      optionsSelector = ".container-elements"
    ) {
      this.CLASS_IS_OPEN = CLASS_IS_OPEN;
      this.CLASS_OVERLAY_IS_SHOWING = CLASS_OVERLAY_IS_SHOWING;
      this.CLASS_NO_SCROLL = CLASS_NO_SCROLL;
      this.drawer = document.querySelector(selector);
      this.trigger = document.querySelectorAll(`.${this.drawer.getAttribute('data-trigger')}`);
      this.overlay = null;
      //Accordion
      this.optionsAttribute = document.querySelectorAll(optionsAttribute);
      this.options = document.querySelectorAll(optionsSelector);
      this.previousActive = null

      if (this.drawer.getAttribute('data-overlay')) {
        this.overlay = document.querySelector(`.${this.drawer.getAttribute('data-overlay')}`);
      }
    }

    preventScroll() {
      document.body.style.top = `-${window.scrollY}px`;
      document.body.classList.add(this.CLASS_NO_SCROLL);
    }

    enableScroll() {
      const scrollY = document.body.style.top;
      document.body.classList.remove(this.CLASS_NO_SCROLL);
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }

    openMobileMenu() {
      if (this.overlay) {
        document.body.classList.add(this.CLASS_OVERLAY_IS_SHOWING);
      }
      document.body.classList.add(this.CLASS_IS_OPEN);
      this.preventScroll();
    }

    closeMobileMenu() {
      if (this.overlay) {
        document.body.classList.remove(this.CLASS_OVERLAY_IS_SHOWING);
      }
      document.body.classList.remove(this.CLASS_IS_OPEN);
      this.enableScroll();
    }

    closeMobileMenuOnOverlayClick() {
      if (this.overlay) {
        this.overlay.addEventListener('click', () => {
          this.closeMobileMenu();
        });
      }
    }

    //Accordion
    showOptions(el) {
        const selects = document.getElementById(`elements-nav-${el}`)
        Array.from(this.options).map((el) => {
            el.parentElement.children[0].children[1].classList.remove("active-container-arrow")
            el.parentElement.children[0].children[0].classList.remove("show-active-span")
            el.classList.remove('show-container-elements', 'container-elements-active-desktop')
        })

        if (el) {
            selects.classList.add('show-container-elements', 'container-elements-active-desktop')
            selects.parentElement.children[0].children[0].classList.add('show-active-span')
            selects.parentElement.children[0].children[1].classList.add('active-container-arrow')
        }

        if (selects.classList.contains("show-container-elements") && selects.classList.contains("container-elements-active-desktop") && this.previousActive === el) {
            selects.classList.remove('show-container-elements', 'container-elements-active-desktop')
            selects.parentElement.children[0].children[0].classList.remove('show-active-span')
            selects.parentElement.children[0].children[1].classList.remove('active-container-arrow')
            return this.previousActive = null
        }
        
        this.previousActive = el
    }

    init() {
      this.trigger.forEach(btn => {
        btn.addEventListener('click', () => {
          if (document.body.classList.contains(this.CLASS_IS_OPEN)) {
            this.closeMobileMenu();
          } else {
            this.openMobileMenu();
          }
        });
      });

      this.closeMobileMenuOnOverlayClick();

      //Accordion
      this.optionsAttribute.forEach(btn => {
          btn.addEventListener('click', () => {
              let selectNumber = btn.getAttribute("data-trigger-number")
              this.showOptions(selectNumber)
          })
      })
    }
  }