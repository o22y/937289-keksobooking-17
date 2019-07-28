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
    renderPins(window.data.data);
    window.form.activeFieldsets();
    window.mainPin.removeEventListener('click', activatePage);
  };
  // Отрисовка меток
  var renderPins = function (data) {
    var pin = document.querySelector('#pin').content.querySelector('.map__pin');
    for (var i = 0; i < window.data.length; i++) {
      var element = pin.cloneNode(true);
      element.style.left = window.data[i].location.x + 'px';
      element.style.top = window.data[i].location.y + 'px';
      element.querySelector('img').src = window.data[i].author.avatar;
      element.querySelector('img').alt = window.data[i].offer.type;

      window.mapPins.appendChild(element);
    }
  };
  window.active = {
    renderPins: renderPins,
    activatePage: activatePage,
  };

})();
