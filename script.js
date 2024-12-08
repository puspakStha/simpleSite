'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sec1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     // el.scrollIntoView
//   });
// });

//event delegation

//1. add event listener to common parent element
//2.determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  //matching strategy
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//tab components

// tabsContainer.addEventListener('click', function (e) {
//   const clicked = e.target.closest('.operations__tab');
//   // console.log(clicked);

//   //guard clause
//   if (!clicked) return;
//   //active tabs
//   tabs.forEach(t => t.classList.remove('operations__tab--active'));
//   tabsContent.forEach(t => t.classList.remove('operations__content--active'));
//   clicked.classList.add('operations__tab--active');

//   //Active content area
//   console.log(clicked.dataset.tab);
//   document
//     .querySelector(`.operations__content--${clicked.dataset.tab}`)
//     .classList.add('operations__content--active'); //because there is only tab in the data-tab after data
// });

// tabsContainer.addEventListener('click', function (e) {
//   const clicked = e.target.closest('.operations__tab');
//   console.log(clicked);

//   if (!clicked) return;

//   tabs.forEach(t => t.classList.remove('operations__tab--active'));
//   tabsContent.forEach(t => t.classList.remove('operations__content--active'));
//   clicked.classList.add('operations__tab--active');
//   console.log(clicked.dataset.tab);
//   document
//     .querySelector(`.operations__content--${clicked.dataset.tab}`)
//     .classList.add('operations__content--active');
// });

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); //searching parent class
  console.log(clicked);

  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  console.log(clicked.dataset.tab);

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//menu fade animations

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // console.log(e.target);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//passing argument into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//sticky navigation
// const initCords = sec1.getBoundingClientRect();
// console.log(initCords);
// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);

//   if (this.window.scrollY > initCords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

//sticky nav: intersection observer api
// const obCallBack = function (entries, observer) {
//   //this is called each time when observer element is intersection the root and threshold we defined
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obOptions = {
//   root: null, //viewport
//   threshold: [0, 0.2], //percentage of intersection in which the observer callback is called
// };
// const observer = new IntersectionObserver(obCallBack, obOptions);
// observer.observe(sec1);

// const navHeight = nav.getBoundingClientRect().height;
// const stickyNav = function (entries) {
//   const [entry] = entries;
//   console.log(entry);
//   if (!entry.isIntersecting) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// };
// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// });
// headerObserver.observe(header);

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, obsOptions);
headerObserver.observe(header);

//reveal section
const allSection = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return; //guard
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (sec) {
  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
});

//lazy-img
const imgTarget = document.querySelectorAll('img[data-src]');
console.log(imgTarget);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  //replace src with data.src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const lazyObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(function (img) {
  lazyObserver.observe(img);
});

/////////////////////

//sliders
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSide = 0;
  const maxSlide = slides.length;
  // slides.forEach(function (slide, i) {
  //   slide.style.transform = `translateX(${100 * i}%)`;
  // });
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  createDots();

  const activeDots = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide = "${slide}"]`)
      .classList.add('dots__dot--active');
  };
  activeDots(0);

  const gotoSlide = function (slide) {
    slides.forEach(function (s, i) {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  gotoSlide(0);

  //next slide
  const nextSlide = function () {
    if (curSide === maxSlide - 1) {
      curSide = 0;
    } else {
      curSide++;
    }
    gotoSlide(curSide);
    activeDots(curSide);
    //0,100,200,300,400
  };

  const preSlide = function () {
    if (curSide === 0) {
      curSide = maxSlide - 1;
    } else {
      curSide--;
    }

    gotoSlide(curSide);
    activeDots(curSide);

    //-100,0,100,200,300
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', preSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') preSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      console.log('dots');
      const { slide } = e.target.dataset;
      gotoSlide(slide);
      activeDots(slide);
    }
  });
};
slider();

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log(e);
// });

// window.addEventListener('load', function (e) {
//   console.log(e);
// });

// window.addEventListener('beforeunload', function (e) {
//   // this event is called before the page is close
//   e.preventDefault();
//   e.returnvalue = '';
// });
///////////////////////////////////////

//////////
//selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const allSections = document.querySelectorAll('.section');
// document.querySelector('.header');

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('section--1'); //creates html collections
// document.getElementsByClassName('btn');
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();
//   console.log(e.target);
//   if (e.target.classList.contains('nav__link')) {
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   }
// });

//creating and inserting elements
// .insertAdjacentHTML
// const msg = document.createElement('div');
// msg.classList.add('cookie-message');
// msg.textContent = 'We use cookies to improve functionality';
// msg.innerHTML = '<button class = "btn btn-close-cookie">Open</button>';
// // header.prepend(msg);
// header.append(msg);
// // header.append(msg.cloneNode(true));
// // header.before(msg);
// // header.after(msg);

// //delete elements
// document
//   .querySelector('.btn-close-cookie')
//   .addEventListener('click', function () {
//     msg.remove();
//   });

// const heading = document.createElement('div');
// heading.classList.add('cookie-message');
// heading.innerHTML = '<button class = "btn btn-close-heading">Close</button>';
// header.append(heading);

// // const nam = document.createElement('h1');
// // nam.innerHTML = 'Sachin';
// // header.prepend(nam);

// document
//   .querySelector('.btn-close-heading')
//   .addEventListener('click', function () {
//     alert('are you sure');
//   });

// //styles
// heading.style.background = '#37383d';
// heading.style.width = '120%';

// heading.style.height =
//   Number.parseFloat(getComputedStyle(heading).height, 10) + 30 + 'px';
// document.documentElement.style.setProperty('--color-primary', 'blue');

// //attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// logo.alt = 'nice logo';
// console.log(logo.alt);
// console.log(logo.getAttribute('designer'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

//data attributes
// console.log(logo.dataset.er);

//classes
// heading.classList.add('');
// heading.classList.remove('');
// heading.classList.toggle('');
// heading.classList.contains('s');

// //don't use overwrites
// logo.className = 'sachin';

btnScrollTo.addEventListener('click', function (e) {
  // const s1cords = sec1.getBoundingClientRect();
  // console.log(s1cords);
  // console.log(e.target.getBoundingClientRect());

  // console.log('current scroll', window.pageXOffset, window.pageYOffset);

  //sccroling
  // window.scrollTo(
  //   s1cords.left + window.pageXOffset,
  //   s1cords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  sec1.scrollIntoView({
    behavior: 'smooth',
  });
});

// const h1 = document.querySelector('h1');
// const alerth1 = function (e) {
//   alert('add event');
//   // h1.removeEventListener('mouseenter', alerth1);
// };

// h1.addEventListener('mouseenter', alerth1);

// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alerth1);
// }, 3000);
// h1.onmouseenter = function (e) {
//   alert('add event');
// };

//event propagation
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min); //creating random number

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// const nav = document.querySelector('.nav');
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Link', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   //stop propagation
//   // e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('container', e.target, e.currentTarget);
// });
// nav.addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('nav', e.target, e.currentTarget);
// });

// const changeColor = () => {
//   setInterval(() => {
//     nav.style.backgroundColor = randomColor();
//   }, 1000);
// };
// changeColor();

// const btnn = document.createElement('button');
// btnn.classList.add('btn');
// btnn.innerHTML = 'Disco';
// header.prepend(btnn);

// const changeColor = function () {
//   setInterval(() => {
//     btnn.style.backgroundColor = randomColor();
//   }, 1000);
// };
// changeColor();

// const h1 = document.querySelector('h1');
// //selecting class inside of a class
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';

// //going upwards meaning parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var( --gradient-secondary)';
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
