'use strict';

(function () {
  // Активация страницы
  var activatePage = function () {
    var map = document.querySelector('.map');
    // Активация карты
    map.classList.remove('map--faded');
    // Активация формы
    var form = document.querySelector('.ad-form');
    form.classList.remove('ad-form--disabled');
    window.data.renderPins();
    window.form.activeFieldsets();
    window.mainPin.removeEventListener('click', activatePage);
  };

  // Обработчик активации страницы
  window.mainPin.addEventListener('click', activatePage);
})();
