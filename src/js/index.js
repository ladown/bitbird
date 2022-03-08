"use strict";

import Swiper, { Navigation, Pagination, Grid, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";

import IMask from "imask";

import "./pug-files";
import "../scss/style.scss";

window.addEventListener("DOMContentLoaded", () => {
  let a = "1";
  const body = document.body;
  const header = document.querySelector("header.header");

  // Header menu
  const openMenuBtn = document.querySelector('[data-menu="open-btn"]');

  openMenuBtn.addEventListener("click", () => {
    body.scrollIntoView({ behavior: "smooth" });
    header.classList.toggle("header__menu--opened");
    body.classList.toggle("blocked-scroll");
  });

  // Search field
  const searchBtn = document.querySelectorAll('[data-search="header-btn"]');

  searchBtn.forEach((btn) => {
    btn.parentElement;
    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      header.classList.add("header__search--opened");
      if (this.getAttribute("type") === "button") {
        setTimeout(() => {
          this.setAttribute("type", "submit");
        }, 1);
      }
    });
  });

  body.addEventListener("click", (event) => {
    if (header.classList.contains("header__search--opened")) {
      let path = event.path || (event.composedPath && event.composedPath());
      let parentEl = event.target.parentElement;
      let input = parentEl.querySelector("input");
      if (!path.includes(input)) {
        header.classList.remove("header__search--opened");
        searchBtn.forEach((btn) => {
          btn.setAttribute("type", "button");
        });
      }
    }
  });

  // Catalog opening
  const catalogOpenBtn = document.querySelector('[data-catalog="open-btn"]');
  const catalogBlock = document.querySelector('[data-catalog="block"]');

  catalogOpenBtn.addEventListener("click", (event) => {
    event.preventDefault();
    header.classList.add("header__catalog--opened");
    body.classList.add("blocked-scroll");
  });

  catalogBlock.addEventListener("click", (event) => {
    if (event.target && (event.target.dataset.catalog === "overlay" || event.target.dataset.catalog === "close-btn")) {
      header.classList.remove("header__catalog--opened");
      body.classList.remove("blocked-scroll");
    }
  });

  // Catalog opening mobile
  const openCatalogMobBtn = document.querySelector('[data-catalog-mob="open-btn"]');

  openCatalogMobBtn.addEventListener("click", (event) => {
    event.preventDefault();
    header.classList.toggle("header__catalog-mob--opened");
  });

  const openCataloAccordionBtns = document.querySelectorAll('[data-catalog-accordion="open-btn"]');
  openCataloAccordionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      let parentEl = this.parentElement;
      if (parentEl.classList.contains("header-mob__catalog-item--opened")) {
        parentEl.classList.remove("header-mob__catalog-item--opened");
      } else {
        openCataloAccordionBtns.forEach((item) => {
          item.parentElement.classList.remove("header-mob__catalog-item--opened");
        });
        parentEl.classList.add("header-mob__catalog-item--opened");
      }
    });
  });

  // Close catalog and menu block on resize
  window.addEventListener("resize", (event) => {
    if (
      event.target.innerWidth >= 1024 &&
      (header.classList.contains("header__menu--opened") || catalogBlock.classList.contains("header__catalog--opened"))
    ) {
      header.classList.remove("header__menu--opened", "header__catalog--opened");
      body.classList.remove("blocked-scroll");
    }
    if (event.target.innerWidth <= 1024 && header.classList.contains("header__catalog--opened")) {
      header.classList.remove("header__catalog--opened");
      body.classList.remove("blocked-scroll");
    }
  });

  // Close catalog and menu block on press esp

  document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "escape" && event.code.toLowerCase() === "escape") {
      header.classList.remove("header__catalog--opened", "header__menu--opened");
      body.classList.remove("blocked-scroll");
    }
  });

  // Catalog-outer slider
  if (document.querySelector('[data-slider="catalog-popular"]')) {
    new Swiper('[data-slider="catalog-popular"]', {
      loop: true,
      spaceBetween: 15,
      modules: [Navigation, Grid],
      preventClicksPropagation: false,
      navigation: {
        nextEl: '[data-slider="catalog-popular-btns"] .catalog-popular__btn-next',
        prevEl: '[data-slider="catalog-popular-btns"] .catalog-popular__btn-prev',
      },
      breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      },
      on: {
        init: function (swiper) {
          if (window.outerWidth <= 576) {
            if (swiper.enabled) {
              swiper.disable();
            }
          } else {
            if (!swiper.enabled) {
              swiper.enable();
            }
          }
        },
        resize: function (swiper) {
          if (window.outerWidth <= 576) {
            if (swiper.enabled) {
              swiper.disable();
            }
          } else {
            if (!swiper.enabled) {
              swiper.enable();
            }
          }
        },
      },
    });
  }

  // Card sliders

  if (document.querySelector(".card-promo__sliders")) {
    const thumbsSlider = new Swiper('[data-slider="thumbs"]', {
      slidesPerView: 2,
      spaceBetween: 15,
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        475: {
          slidesPerView: 3,
        },
        660: {
          slidesPerView: 4,
        },
      },
      on: {
        init: function (swiper) {
          if (window.outerWidth <= 660) {
            if (swiper.enabled) {
              swiper.disable();
            }
          } else {
            if (!swiper.enabled) {
              swiper.enable();
            }
          }
        },
        resize: function (swiper) {
          if (window.outerWidth <= 660) {
            if (swiper.enabled) {
              swiper.disable();
            }
          } else {
            if (!swiper.enabled) {
              swiper.enable();
            }
          }
        },
      },
    });
    new Swiper('[data-slider="main"]', {
      slidesPerView: 1,
      spaceBetween: 15,
      modules: [Thumbs],
      thumbs: {
        swiper: thumbsSlider,
      },
    });
  }

  // Card tabs
  if (document.querySelector(".card-descr")) {
    tabs(
      '[data-card="tab-btn"]',
      '[data-card="tab-content"]',
      '[data-card="tabs-parent"]',
      "card-descr__content",
      "card-descr__tab--active",
      "card-descr__tab",
    );
  }

  // Sliders tabs

  if (document.querySelector(".card-sliders")) {
    const sliders = document.querySelectorAll('[data-card-slider="content"]');
    const buttonsParentBlock = document.querySelector(".card-sliders__btns-wrap");
    const buttonsWrap = [];
    const sliderBtns = [];

    sliders.forEach((slider, i) => {
      generateBtns(
        [
          ["card-sliders__btn", "card-sliders__btn-prev"],
          ["card-sliders__btn", "card-sliders__btn-next"],
        ],
        sliderBtns,
        "card-sliders__btns",
        buttonsWrap,
        buttonsParentBlock,
      );
      new Swiper(slider, {
        spaceBetween: 15,
        modules: [Navigation],
        observer: true,
        preventClicksPropagation: false,
        navigation: sliderBtns[i],
        breakpoints: {
          0: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        },
      });
    });

    tabs(
      '[data-card-slider="tab"]',
      '[data-card-slider="content"]',
      '[data-card-slider="tabs"]',
      "card-sliders__content",
      "card-sliders__tab--active",
      "card-sliders__tab",
      buttonsWrap,
    );
  }

  // Code input
  const openCodeInputBtn = document.querySelector('[data-code="btn"]');
  if (openCodeInputBtn) {
    if (window.outerWidth <= 600) {
      openCodeInputBtn.setAttribute("type", "submit");
    }
    openCodeInputBtn.addEventListener("click", function () {
      if (window.outerWidth >= 601) {
        this.parentElement.classList.add("order-code--opened");
        this.textContent = "Подтвердить";
        setTimeout(() => {
          this.setAttribute("type", "submit");
        }, 1);
      }
    });
  }

  if (document.querySelector(".promo")) {
    new Swiper('[data-promo="slider"]', {
      slidesPerView: 1,
      spaceBetween: 15,
      loop: true,
      modules: [Navigation, Pagination],
      navigation: {
        prevEl: '[data-promo="prev-btn"]',
        nextEl: '[data-promo="next-btn"]',
      },
      pagination: {
        el: '[data-promo="pagination"]',
        clickable: true,
      },
    });
  }

  // Clean basket

  if (document.querySelector(".basket")) {
    const cleanBasketModalBtn = document.querySelector('[data-basket="clean-btn"]');
    const basketModalBlock = document.querySelector('[data-basket="modal"]');

    cleanBasketModalBtn.addEventListener("click", () => {
      basketModalBlock.classList.add("basket-modal--opened");
      body.classList.add("blocked-scroll");
    });

    basketModalBlock.addEventListener("click", (event) => {
      if (event.target && (event.target.dataset.basket === "overlay" || event.target.dataset.basket === "btn-cansel")) {
        basketModalBlock.classList.remove("basket-modal--opened");
        body.classList.remove("blocked-scroll");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "escape" && event.code.toLowerCase() === "escape") {
        basketModalBlock.classList.remove("basket-modal--opened");
        body.classList.remove("blocked-scroll");
      }
    });
  }

  // Feedback modal
  const openFeedbackBtn = document.querySelector('[data-feedback="modal-btn"]');

  if (openFeedbackBtn) {
    const feedbackBlock = document.querySelector('[data-feedback="modal-block"]');
    openFeedbackBtn.addEventListener("click", () => {
      feedbackBlock.classList.add("card-descr__feedback--opened");
      body.classList.add("blocked-scroll");
    });
    feedbackBlock.addEventListener("click", (event) => {
      if (event.target && (event.target.dataset.feedback === "overlay" || event.target.dataset.feedback === "close-btn")) {
        feedbackBlock.classList.remove("card-descr__feedback--opened");
        body.classList.remove("blocked-scroll");
      }
    });

    window.addEventListener("resize", (event) => {
      if (event.target.innerWidth >= 1024 && feedbackBlock.classList.contains("card-descr__feedback--opened")) {
        feedbackBlock.classList.remove("card-descr__feedback--opened");
        body.classList.remove("blocked-scroll");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "escape" && event.code.toLowerCase() === "escape") {
        feedbackBlock.classList.remove("card-descr__feedback--opened");
        body.classList.remove("blocked-scroll");
      }
    });
  }

  // Feedback items
  const feedbackItemsWrap = document.querySelector('[data-feedback="items"]');
  if (feedbackItemsWrap) {
    const feedbackShowItemsBtns = document.querySelector('[data-feedback="more-btn"]');
    feedbackShowItemsBtns.addEventListener("click", function () {
      if (!feedbackItemsWrap.classList.contains("card-descr__feedback-items--opened")) {
        feedbackItemsWrap.classList.add("card-descr__feedback-items--opened");
        this.textContent = "Скрыть";
      } else {
        feedbackItemsWrap.classList.remove("card-descr__feedback-items--opened");
        feedbackItemsWrap.scrollIntoView();
        this.textContent = "Показать все";
      }
    });
  }

  // Tabs
  new Swiper('[data-card="tabs-parent"]', {
    slidesPerView: "auto",
    centeredSlides: true,
    slideToClickedSlide: true,
    simulateTouch: true,
    breakpoints: {
      576: {
        centeredSlides: false,
      },
    },
  });

  // Feedback stars
  const feedbackRatingWrap = document.querySelector(".card-descr__feedback-stars");

  if (feedbackRatingWrap) {
    setTimeout(() => {
      let starsWrap = feedbackRatingWrap.querySelector("span");
      starsWrap.setAttribute("data-total-value", 0);
      feedbackRatingWrap.querySelectorAll("a").forEach((star, index) => {
        star.textContent = "";
        star.setAttribute("class", `start-${5 - index}`);
        star.setAttribute("data-value", 5 - index);
        star.innerHTML = `<svg width="21" height="20" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.9189 11.82C15.6599 12.071 15.5409 12.434 15.5999 12.79L16.4889 17.71C16.5639 18.127 16.3879 18.549 16.0389 18.79C15.6969 19.04 15.2419 19.07 14.8689 18.87L10.4399 16.56C10.2859 16.478 10.1149 16.434 9.93988 16.429H9.66888C9.57488 16.443 9.48288 16.473 9.39888 16.519L4.96888 18.84C4.74988 18.95 4.50188 18.989 4.25888 18.95C3.66688 18.838 3.27188 18.274 3.36888 17.679L4.25888 12.759C4.31788 12.4 4.19888 12.035 3.93988 11.78L0.328876 8.28C0.0268758 7.987 -0.0781242 7.547 0.0598758 7.15C0.193876 6.754 0.535876 6.465 0.948876 6.4L5.91888 5.679C6.29688 5.64 6.62888 5.41 6.79888 5.07L8.98888 0.58C9.04088 0.48 9.10788 0.388 9.18888 0.31L9.27888 0.24C9.32588 0.188 9.37988 0.145 9.43988 0.11L9.54888 0.07L9.71888 0H10.1399C10.5159 0.039 10.8469 0.264 11.0199 0.6L13.2389 5.07C13.3989 5.397 13.7099 5.624 14.0689 5.679L19.0389 6.4C19.4589 6.46 19.8099 6.75 19.9489 7.15C20.0799 7.551 19.9669 7.991 19.6589 8.28L15.9189 11.82Z"></path></svg>`;
        star.addEventListener("click", function (event) {
          event.preventDefault();
          starsWrap.setAttribute("data-total-value", this.getAttribute("data-value"));
        });
      });
    }, 100);
  }

  if (document.querySelector('[data-makers="slider"]')) {
    new Swiper('[data-makers="slider"]', {
      loop: true,
      modules: [Navigation],
      breakpoints: {
        0: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        576: {
          spaceBetween: 20,
          slidesPerView: 4,
        },
        768: {
          spaceBetween: 40,
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: "auto",
          spaceBetween: 60,
        },
        1200: {
          spaceBetween: 80,
          slidesPerView: "auto",
        },
      },
      navigation: {
        nextEl: '[data-makers="next-btn"]',
        prevEl: '[data-makers="prev-btn"]',
      },
    });
  }

  // Main page slider

  if (document.querySelector(".sliders")) {
    const sliders = document.querySelectorAll('[data-sliders="slider"]');
    const buttonsParentBlock = document.querySelector(".sliders__btns-wrap");
    const buttonsWrap = [];
    const sliderBtns = [];

    sliders.forEach((slider, i) => {
      generateBtns(
        [
          ["sliders__btn", "sliders__btn-prev"],
          ["sliders__btn", "sliders__btn-next"],
        ],
        sliderBtns,
        "sliders__btns",
        buttonsWrap,
        buttonsParentBlock,
      );
      new Swiper(slider, {
        spaceBetween: 15,
        preventClicksPropagation: false,
        modules: [Navigation],
        observer: true,
        navigation: sliderBtns[i],
        breakpoints: {
          0: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        },
      });
    });

    tabs(
      '[data-sliders-tab="btn"]',
      '[data-sliders-tab="content"]',
      '[data-sliders-tab="parent"]',
      "sliders__slider",
      "sliders__tab--active",
      "sliders__tab",
      buttonsWrap,
    );
  }

  if (document.querySelector('[data-banners="slider"]')) {
    new Swiper('[data-banners="slider"]', {
      slidesPerView: 2,
      modules: [Navigation],
      navigation: {
        prevEl: '[data-banners="btns"] .banners__btn-prev',
        nextEl: '[data-banners="btns"] .banners__btn-next',
      },
      breakpoints: {
        577: {
          spaceBetween: 10,
        },
        768: {
          spaceBetween: 20,
        },
        1024: {
          spaceBetween: 30,
        },
        1200: {
          spaceBetween: 40,
        },
      },
      on: {
        init: function (swiper) {
          if (window.outerWidth <= 577) {
            if (swiper.enabled) {
              swiper.disable();
            }
          } else {
            if (!swiper.enabled) {
              swiper.enable();
            }
          }
        },
        resize: function (swiper) {
          if (window.outerWidth <= 577) {
            if (swiper.enabled) {
              swiper.disable();
            }
          } else {
            if (!swiper.enabled) {
              swiper.enable();
            }
          }
        },
      },
    });
  }

  if (document.querySelector(".service-office")) {
    const accordionBtns = document.querySelectorAll("[data-service-office='btn']");
    const iframes = document.querySelectorAll('[data-service-office="iframe"]');

    accordionBtns.forEach((_, index) => {
      accordionBtns[index].addEventListener("click", function () {
        let parentEl = this.parentElement;
        let panel = this.nextElementSibling;
        if (parentEl.classList.contains("service-office__item--opened")) {
          parentEl.classList.remove("service-office__item--opened");
          panel.style.maxHeight = null;
        } else {
          accordionBtns.forEach((item) => {
            item.parentElement.classList.remove("service-office__item--opened");
            item.nextElementSibling.style.maxHeight = null;
          });
          iframes.forEach((iframe) => {
            iframe.classList.remove("service-office__iframe--showed");
          });
          parentEl.classList.add("service-office__item--opened");
          panel.style.maxHeight = panel.scrollHeight + "px";
          iframes[index].classList.add("service-office__iframe--showed");
        }
      });
    });
  }

  if (document.querySelector(".service-feedback")) {
    new Swiper('[data-service-feedback="slider"]', {
      loop: true,
      modules: [Navigation, Pagination],
      pagination: {
        type: "fraction",
        el: '[data-service-feedback="pagination"]',
      },
      navigation: {
        nextEl: ".service-feedback__controls .service-feedback__btn-next",
        prevEl: ".service-feedback__controls .service-feedback__btn-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 25,
        },
      },
    });
  }

  // Input tel mask
  const telInputs = document.querySelectorAll('input[type="tel"]');

  if (telInputs.length) {
    telInputs.forEach((input) => {
      IMask(input, { mask: "+{7}(000)000-00-00" });
    });
  }

  // Callback modal
  const openCallbackModal = document.querySelectorAll('[data-callback-modal="open-btn"]');
  const callbackModal = document.querySelector('[data-callback-modal="block"]');

  if (openCallbackModal.length && callbackModal) {
    openCallbackModal.forEach((btn) => {
      btn.addEventListener("click", () => {
        callbackModal.classList.add("callback-modal--opened");
        body.classList.add("blocked-scroll");
      });
    });

    callbackModal.addEventListener("click", (event) => {
      if (event.target && (event.target.dataset.callbackModal === "overlay" || event.target.dataset.callbackModal === "close-btn")) {
        callbackModal.classList.remove("callback-modal--opened");
        body.classList.remove("blocked-scroll");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "escape" && event.code.toLowerCase() === "escape") {
        callbackModal.classList.remove("callback-modal--opened");
        body.classList.remove("blocked-scroll");
      }
    });
  }

  // Success modal
  const successModal = document.querySelector('[data-modal-success="block"]');

  if (successModal) {
    successModal.addEventListener("click", (event) => {
      if (event.target && event.target.dataset.modalSuccess === "overlay") {
        successModal.classList.remove("modal-success--opened");
        body.classList.remove("blocked-scroll");
      }
    });
  }

  // Card modal
  const cardModalOpenBtns = document.querySelectorAll('[data-card-modal="open-btn"]');

  if (cardModalOpenBtns.length) {
    const cardModal = document.querySelector('[data-card-modal="modal"]');

    const form = document.querySelector("form.cart");
    let observer = new MutationObserver((mutationRecords) => {
      let addedNodes = mutationRecords[0].addedNodes;
      addedNodes.forEach((item) => {
        if (item.tagName.toLowerCase() === "a" && item.classList.contains("added_to_cart")) {
          cardModal.classList.add("card-modal--opened");
          body.classList.add("blocked-scroll");
        }
      });
    });
    observer.observe(form, {
      childList: true,
      subtree: true,
    });

    cardModal.addEventListener("click", (event) => {
      if (event.target && (event.target.dataset.cardModal === "overlay" || event.target.dataset.cardModal === "btn-cansel")) {
        cardModal.classList.remove("card-modal--opened");
        body.classList.remove("blocked-scroll");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "escape" && event.code.toLowerCase() === "escape") {
        cardModal.classList.remove("card-modal--opened");
        body.classList.remove("blocked-scroll");
      }
    });
  }
});

function generateBtns(btnClasses, btnsArray, btnsWrapClass, buttonsWrap, wrap) {
  let btnsWrap = document.createElement("div");
  let prevBtn = document.createElement("button");
  let nextBtn = document.createElement("button");
  prevBtn.classList.add(...btnClasses[0]);
  nextBtn.classList.add(...btnClasses[1]);
  prevBtn.innerHTML = `<svg width="14" height="21" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6777 20.1589C13.2942 20.6383 12.5945 20.7161 12.1151 20.3325L0.997456 11.4384C0.733729 11.2274 0.580206 10.908 0.580206 10.5703C0.580206 10.2325 0.73373 9.91311 0.997456 9.70213L12.1151 0.808041C12.5945 0.424471 13.2942 0.502207 13.6777 0.981669C14.0613 1.46113 13.9836 2.16075 13.5041 2.54432L3.47165 10.5703L13.5041 18.5962C13.9836 18.9798 14.0613 19.6794 13.6777 20.1589Z" fill="#6F5CEA"></path></svg>`;
  nextBtn.innerHTML = `<svg width="15" height="21" viewBox="0 0 15 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.908213 1.16729C1.29178 0.68783 1.99141 0.610094 2.47087 0.993663L13.5885 9.88776C13.8522 10.0987 14.0057 10.4182 14.0057 10.7559C14.0057 11.0936 13.8522 11.4131 13.5885 11.624L2.47086 20.5181C1.9914 20.9017 1.29178 20.824 0.90821 20.3445C0.524642 19.865 0.602378 19.1654 1.08184 18.7819L11.1143 10.7559L1.08184 2.72994C0.602381 2.34637 0.524645 1.64675 0.908213 1.16729Z" fill="#6F5CEA"></path></svg>`;
  btnsArray.push({
    nextEl: nextBtn,
    prevEl: prevBtn,
  });
  btnsWrap.classList.add(btnsWrapClass);
  btnsWrap.append(prevBtn, nextBtn);
  buttonsWrap.push(btnsWrap);
  wrap.append(btnsWrap);
}

function tabs(tabsSelector, tabsContentSelector, tabsParantSelector, tabsContentClass, tabsClass, tabBtnSelector, sliderBtns = false) {
  const tabs = document.querySelectorAll(tabsSelector);
  const tabsContent = document.querySelectorAll(tabsContentSelector);
  const tabsParant = document.querySelector(tabsParantSelector);

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add(`${tabsContentClass}--hide`);
      item.classList.remove(`${tabsContentClass}--show`);
    });

    tabs.forEach((item) => {
      item.classList.remove(tabsClass);
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add(`${tabsContentClass}--show`);
    tabsContent[i].classList.remove(`${tabsContentClass}--hide`);
    tabs[i].classList.add(tabsClass);
  }

  hideTabContent();
  showTabContent();

  tabsParant.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains(tabBtnSelector)) {
      tabs.forEach((item, i) => {
        if (event.target === item) {
          hideTabContent();
          showTabContent(i);
          if (sliderBtns) {
            sliderBtns.forEach((item) => {
              item.style.display = "none";
            });
            sliderBtns[i].style.display = "flex";
          }
        }
      });
    }
  });
}
