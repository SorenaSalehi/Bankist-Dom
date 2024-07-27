"use strict";


//cm:elements////////////////////////////////
const header = document.querySelector(".header");
const allSections = document.body.querySelectorAll(".section"); //it will make a node list
const allButtons = document.getElementsByTagName("button");
const allBTN = document.getElementsByClassName("btn");
const message = document.createElement("div"); //here we should just write the tag name
const modalWindow = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnOpenModal = document.querySelectorAll(".btn-open-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnAccount = document.querySelectorAll(".btn-account");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const allSection = document.querySelectorAll(".section");
const sectoin1 = document.querySelector(".section-1");
const sectoin2 = document.querySelector(".section-2");
const sectoin3 = document.querySelector(".section-3");
const sectoin4 = document.querySelector(".section-4");
const navBar = document.querySelector(".nav");
const navFeatures = document.querySelector(".features--link");
const navOperations = document.querySelector(".operations--link");
const navTestimonials = document.querySelector(".testimonials--link");
const navLinks = document.querySelectorAll(".nav-links");
const navLinkItem = document.querySelectorAll(".link-item");
const navLink = document.querySelectorAll(".nav-link");
const tabs = document.querySelectorAll(".operation-tab");
const tabContainer = document.querySelector(".tabs-container");
const tabsContent = document.querySelectorAll(".operation-content");
const imgTargets = document.querySelectorAll("img[data-src]"); //the imges element wich contains "data-src"
const sliderContainer = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const slideLeft = document.querySelector(".slider__btn--left");
const slideRight = document.querySelector(".slider__btn--right");
const dotsContainer = document.querySelector(".dots");
const feature1 = document.querySelector(".feature-1");

//functions /////////////////////////////////////////////////////////////////////////////////////////////////

// Modal window 
const modalWindowF =function(){

  //open modal
  const openModal = function (e) {
    e.preventDefault();
    modalWindow.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

  //close modal
  const closeModal = function () {
    modalWindow.classList.add("hidden");
    overlay.classList.add("hidden");
  };
  
  btnOpenModal.forEach((btn) => btn.addEventListener("click", openModal));


//modal event
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
//keyboard action
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeModal();
});





}



//Tabs 
const tabsFunction =function(){
  tabContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".operation-tab"); //tip: in this element we have to element so we do this to understand wich element we have clicked
  
    //new: Guard clause:
    //this is a way that when our function return falsy value, the function will imadidatly return and close
    if (!clicked) return; //if the click is somewhere else than not return null and closed the function
  
    //active tab
    tabs.forEach((t) => t.classList.remove("operations__tab--active"));
    tabsContent.forEach((c) => c.classList.remove("operation-active"));
    clicked.classList.add("operations__tab--active");
  
    //active contant
    document
      .querySelector(`.operation-content-${clicked.dataset.tab}`)
      .classList.add("operation-active");
  });
  }



//new:menu fade animation 
const menuFade =function(){

//handle hover
const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav-link"); //tip:for getting the siblings , we go to the parent and than takke all the childeren
    const logo = link.closest(".nav").querySelector(".logo");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = opacity;
      logo.style.opacity = opacity;
    });
    link.style.opacity = 1;
  }
};

navBar.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
});
navBar.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});
}

//new: implementing sticky navbar(old way) 
const stickyNav=function(){


//set van height from document
const navHeight = navBar.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navBar.classList.add("sticky");
  else navBar.classList.remove("sticky");
};

//set the intersecting
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, //complitly the header out hidden
  rootMargin: `-${navHeight}px`, //with this property we can set the functionality better
});
headerObserver.observe(header);
}

//reveal section (showing the sections) ///////////////////////////////////////////////////////////////////////////////////////////////////////////
const section = function(){
const sectionReveal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");

  observer.unobserve(entry.target); //we turn off the  observer after that obsrving ones
};
const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.15, //when 15% of target is intersecting
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section-hidden"); //adding this class from JS , because some body are disabble JS on there browsers , so if we add this class in HTML ,they will not see the page
});
}

//loading images /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const loadingImage=function(){
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //replace src with data-src
  entry.target.src = entry.target.dataset.src;

//load the img
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px", //we add this margin root ,because we dont want to the user now about our lazy load
});

imgTargets.forEach((img) => imgObserver.observe(img));
}

//slider implement ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const slider = function(){


let currSlide = 0;
const sliderLength = slides.length;

//add transform
const goToSlide = function (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
    //0% , 100% , 200%
  });
};

//create Dots
const createDots = function () {
  //using the slide index for setting the dots dataset
  slides.forEach(function (_, i){
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      ` <button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
goToSlide(0);
createDots();

//active Dot
const activeDot = function (currSlide) {
  const dot = document.querySelectorAll(".dots__dot");
  dot.forEach((d) => {
    d.classList.remove("dots__dot--active");
    if (d.dataset.slide == currSlide) d.classList.add("dots__dot--active");
  });
};
activeDot(currSlide);

//BTN
const nextSlide = function () {
  //slider length - 1 , because the length is not o base
  if (currSlide == sliderLength - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlide(currSlide);
  activeDot(currSlide);
};
const prevSlide = function () {
  if (currSlide == 0) {
    currSlide = sliderLength - 1;
  } else {
    currSlide--;
  }
  goToSlide(currSlide);
  activeDot(currSlide);
};

//next slide
slideRight.addEventListener("click", nextSlide);

//preveus slide
slideLeft.addEventListener("click", prevSlide);

//slider with key
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    nextSlide();
  }
  e.key === "ArrowLeft" && prevSlide(); //short serceting
});

//Dots
dotsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    //using destructering
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activeDot(slide);
  }
});
}

//Event listener ////////////////////////////////////////////////////////////////////////////

//nav links event
document.querySelector(".nav-links").addEventListener("click", function (e) {
  e.preventDefault();

  //new: maching strategy
  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href"); //cm:setting the current element by href
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
//smoth scrolling
btnScrollTo.addEventListener("click", function () {
  sectoin1.scrollIntoView({ behavior: "smooth" });
});



//calling function
tabsFunction()
menuFade()
stickyNav()
section()
loadingImage()

modalWindowF()
slider();