'use strict';

(function () {
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  // Активация страницы
  var activatePage = function () {
    // Активация карты
    map.classList.remove('map--faded');
    // Активация формы
    form.classList.remove('ad-form--disabled');
    window.form.activeFieldsets();
    window.mainPin.removeEventListener('click', activatePage);
  };
  // Отрисовка меток
  var renderPins = function (data) {
    window.pin = document.querySelector('#pin').content.querySelector('.map__pin');
    for (var i = 0; i < data.length; i++) {
      var element = window.pin.cloneNode(true);
      element.style.left = data[i].location.x + 'px';
      element.style.top = data[i].location.y + 'px';
      element.querySelector('img').src = data[i].author.avatar;
      element.querySelector('img').alt = data[i].offer.type;

      window.mapPins.appendChild(element);
    }
  };

  var activeScreen = function (data) {
    window.succesData = data;
    activatePage();
    renderPins(data);
    window.card.renderPinsMarkup(window.successData);
  };

  var dataToLocalData = function () {
    window.data.load(activeScreen);
  };

  window.active = {
    renderPins: renderPins,
    activatePage: activatePage,
    dataToLocalData: dataToLocalData
  };

})();
