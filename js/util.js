'use strict';

window.mapPins = document.querySelector('.map__pins'); // window.util.mapPins
window.mainPin = document.querySelector('.map__pin--main'); // window.util.mainPin

(function () {
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
