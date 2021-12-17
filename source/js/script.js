'use strict';

var accordionBlocks = document.querySelectorAll('.accordion-block');
var accordionButtons = document.querySelectorAll('.accordion-block__button');
var accordionContentBlocks = document.querySelectorAll('.accordion-block__content');

// При загрузке js, скрывает вкладки, которые открыты по умолчанию без js
// и показываем кнопки
for (var i = 0; i < accordionBlocks.length; i++) {
  accordionButtons[i].classList.remove('visually-hidden');
  accordionButtons[i].classList.add('footer__mobile-button--show');
  accordionContentBlocks[i].classList.remove('active');
}

accordionButtons.forEach(function (button) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    var currentIndex = Array.from(accordionButtons).indexOf(button);
    // находим все активные элементы (уже развернутые вкладки аккордеона)
    for (var j = 0; j < accordionContentBlocks.length; j++) {
      if (j !== currentIndex && accordionContentBlocks[j].classList.contains('active')) {
        accordionContentBlocks[j].classList.remove('active');
        accordionButtons[j].classList.remove('footer__mobile-button--hide');
        accordionButtons[j].classList.add('footer__mobile-button--show');
      }
    }

    accordionContentBlocks[Array.from(accordionButtons).indexOf(button)].classList.toggle('active');
    button.classList.toggle('footer__mobile-button--show');
    button.classList.toggle('footer__mobile-button--hide');
  });
});

// Скрипт для открытия и закрытия модального окна

var modalLink = document.querySelector('.header__link-call');

var modalWindow = document.querySelector('.modal');
var modalClose = modalWindow.querySelector('.modal__button-close');
var modalCloseWindow = modalWindow.querySelector('.modal__button-close-window');

modalLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalWindow.classList.remove('modal--close');
  modalWindow.classList.add('modal--open');
});

document.addEventListener('keyup', function (evt) {
  if (evt.defaultPrevented) {
    return;
  }

  var key = evt.key;

  if (key === 'Escape' || key === 'Esc' || key === 27) {
    modalWindow.classList.remove('modal--open');
    modalWindow.classList.add('modal--close');
  }
});

modalClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalWindow.classList.remove('modal--open');
  modalWindow.classList.add('modal--close');
});

modalCloseWindow.addEventListener('click', function () {
  modalWindow.classList.remove('modal--open');
  modalWindow.classList.add('modal--close');
});
