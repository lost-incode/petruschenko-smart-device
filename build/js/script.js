'use strict';

var accordionBlocks = document.querySelectorAll('.accordion-block');
var accordionButtons = document.querySelectorAll('.accordion-block__button');
var accordionContentBlocks = document.querySelectorAll('.accordion-block__content')

for (var i = 0; i < accordionBlocks.length; i++) {
  accordionButtons[i].classList.remove('visually-hidden');
  accordionButtons[i].classList.add('footer__mobile-button--show');
  accordionContentBlocks[i].classList.remove('active');
}

accordionButtons.forEach(function(button) {
  button.addEventListener('click', function(evt) {
    evt.preventDefault();
    var currentIndex = Array.from(accordionButtons).indexOf(button);
    // находим все активные элементы (уже развернутые вкладки аккордеона)
    for (var j = 0; j < accordionContentBlocks.length; j++) {
      if (j != currentIndex && accordionContentBlocks[j].classList.contains('active')) {
        accordionContentBlocks[j].classList.remove('active');
        accordionButtons[j].classList.remove('footer__mobile-button--hide');
        accordionButtons[j].classList.add('footer__mobile-button--show');
      }
    }

    // console.log(accordionContentBlocks[Array.from(accordionButtons).indexOf(button)]);
    // if (this.classList.contains('footer__mobile-button--show')) {
    //   this.classList.remove('footer__mobile-button--show');
    //   this.classList.add('footer__mobile-button--hide');
    //   accordionContentBlocks[Array.from(accordionButtons).indexOf(button)].classList.add('active');
    // } else {
    //   this.classList.add('footer__mobile-button--show');
    //   this.classList.remove('footer__mobile-button--hide');
    //   accordionContentBlocks[Array.from(accordionButtons).indexOf(button)].classList.remove('active');
    // }

    accordionContentBlocks[Array.from(accordionButtons).indexOf(button)].classList.toggle('active');
    this.classList.toggle('footer__mobile-button--show');
    this.classList.toggle('footer__mobile-button--hide');
  });
});
