'use strict';

var body = document.querySelector('.page__body');
var accordionBlocks = document.querySelectorAll('.accordion-block');
var accordionTitleWrappers = document.querySelectorAll('.footer__title-wrapper');

if (accordionBlocks) {
  var accordionButtons = document.querySelectorAll('.accordion-block__button');
  var accordionContentBlocks = document.querySelectorAll('.accordion-block__content');

  var toggleAccordion = function (btn) {
    var currentIndex = Array.from(accordionButtons).indexOf(btn);
    // находим все активные элементы (уже развернутые вкладки аккордеона)
    for (var j = 0; j < accordionContentBlocks.length; j++) {
      if (j !== currentIndex && accordionContentBlocks[j].classList.contains('active')) {
        accordionContentBlocks[j].classList.remove('active');
        accordionButtons[j].classList.remove('footer__mobile-button--hide');
      }
    }

    accordionContentBlocks[Array.from(accordionButtons).indexOf(btn)].classList.toggle('active');
    btn.classList.toggle('footer__mobile-button--hide');
  }

  // При загрузке js, скрывает вкладки, которые открыты по умолчанию без js
  // и показываем кнопки
  for (var i = 0; i < accordionBlocks.length; i++) {
    accordionButtons[i].classList.remove('visually-hidden');
    accordionButtons[i].classList.add('footer__mobile-button--show');
    accordionContentBlocks[i].classList.remove('active');
  }

  accordionTitleWrappers.forEach(function (wrapper) {
    var button = wrapper.querySelector('.accordion-block__button')
    wrapper.addEventListener('click', function (evt) {
      evt.preventDefault();
      toggleAccordion(button);

      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        toggleAccordion(button);
      });
    });
  });
}

// Функция для создания маски для поля ввода телефона

var MASK = '+7(000)000-00-00';

function maskInput(inputName, mask, evt) {
  try {
    var value = inputName.value;
    // If user pressed DEL or BACK SPACE, clean the value
    try {
      var e = (evt.which) ? evt.which : evt.keyCode;
      if ((e === 46) || (e === 8)) {
        inputName.value = '';
        return;
      }
    } catch (e1) {
      // Здесь будет сообщение об ошибке
    }

    var literalPattern = /[0\*]/;
    var numberPattern = /[0-9]/;
    var newValue = '';

    for (var vId = 0, mId = 0; mId < mask.length;) {
      if (mId >= value.length) {
        break;
      }
      // Number expected but got a different value, store only the valid portion
      if (mask[mId] === '0' && value[vId].match(numberPattern) === null) {
        break;
      }
      // Found a literal
      while (mask[mId].match(literalPattern) === null) {
        if (value[vId] === mask[mId]) {
          break;
        }
        newValue += mask[mId++];
      }
      newValue += value[vId++];
      mId++;
    }
    inputName.value = newValue;
  } catch (e2) {
    // Здесь будет сообщение об ошибке
  }
}

// Созданиу маски для поля ввода телефона в секции feedback
var phoneInputFeedback = document.querySelector('#phone');

phoneInputFeedback.addEventListener('input', function (evt) {
  maskInput(phoneInputFeedback, MASK, evt);
});

// Скрипт для localStorage

var modalForm = document.querySelector('.modal__wrapper form');
if (modalForm) {
  var modalName = modalForm.querySelector('#call-name');
  var modalPhone = modalForm.querySelector('#call-phone');
  var modalQuestion = modalForm.querySelector('#call-question');

  var isStorageSupport = true;
  var storageModalName = '';
  var storageModalPhone = '';
  var storagemodalQuestion = '';

  try {
    storageModalName = localStorage.getItem('modalName');
    storageModalPhone = localStorage.getItem('modalPhone');
    storagemodalQuestion = localStorage.getItem('modalQuestion');
  } catch (err) {
    isStorageSupport = false;
  }

  window.addEventListener('load', function () {
    if (storageModalName) {
      modalName.value = storageModalName;
    }

    if (storageModalPhone) {
      modalPhone.value = storageModalPhone;
    }

    if (storagemodalQuestion) {
      modalQuestion.value = storagemodalQuestion;
    }
  });

  modalForm.addEventListener('submit', function () {
    if (isStorageSupport) {
      localStorage.setItem('modalName', modalName.value);
      localStorage.setItem('modalPhone', modalPhone.value);
      localStorage.setItem('modalQuestion', modalQuestion.value);
    }
  });

  // Скрипт для открытия и закрытия модального окна

  var modalLink = document.querySelector('.header__link-call');

  var modalWindow = document.querySelector('.modal');
  var modalClose = modalWindow.querySelector('.modal__button-close');
  var modalCloseWindow = modalWindow.querySelector('.modal__button-close-window');

  var closeModal = function () {
    modalWindow.classList.remove('modal--open');
    body.classList.remove('overflow-hidden');
  }

  var openModal = function () {
    modalWindow.classList.add('modal--open');
    modalName.focus();
    body.classList.add('overflow-hidden');
  }

  document.addEventListener('keyup', function (evt) {
    if (evt.defaultPrevented) {
      return;
    }

    var key = evt.key;

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      closeModal();
    }
  });

  modalClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeModal();
  });

  modalCloseWindow.addEventListener('click', function () {
    closeModal();
  });

  modalLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    openModal();
  });

  modalPhone.addEventListener('input', function (evt) {
    maskInput(modalPhone, MASK, evt);
  });
}

var smoothLinks = document.querySelectorAll('a[href^="#free-consultation"]');
smoothLinks.forEach(function (smoothLink) {
  smoothLink.addEventListener('click', function (e) {
    e.preventDefault();
    var id = smoothLink.getAttribute('href');
    var linkSelector = 'a[name="' + id.slice(1, id.length) + '"]';

    document.querySelector(linkSelector).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});
