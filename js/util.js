'use strict';
(function () {
  window.mapPins = document.querySelector('.map__pins');
  window.mainPin = document.querySelector('.map__pin--main');
  // Функция рандомных чисел
  var randomInteger = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  };
  window.util = {
    randomInteger: randomInteger,
  };
})();
