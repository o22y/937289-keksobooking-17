'use strict';

(function () {
  var fieldsets = document.querySelectorAll('fieldset');
  var address = document.querySelector('#address');
  var houseType = document.querySelector('#type');
  var housePrice = document.querySelector('#price');
  // Размеры метки
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 85;

  // Отключение полей
  var disabledFieldsets = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'true');
    }
  };
  disabledFieldsets();

  // Включение полей
  var activeFieldsets = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled', 'true');
    }
  };
  // Добавление координат в input
  var setCoordinate = function () {
    var pinCoordinate = window.mainPin.getBoundingClientRect();
    address.value = '';
    address.value += ((pinCoordinate.left + PIN_WIDTH / 2) + ', ' + (pinCoordinate.top + PIN_HEIGHT / 2));
  };

  // Изменение минимальной цены при разных типах жилья
  var changeValue = function () {
    if (houseType.value === 'bungalo') {
      housePrice.min = '0';
      housePrice.placeholder = '0';
    } if (houseType.value === 'flat') {
      housePrice.min = '1000';
      housePrice.placeholder = '1000';
    } if (houseType.value === 'house') {
      housePrice.min = '5000';
      housePrice.placeholder = '5000';
    } if (houseType.value === 'palace') {
      housePrice.min = '10000';
      housePrice.placeholder = '10000';
    }
  };

  houseType.addEventListener('change', changeValue);

  // Синхронизация полей въезда и выезда
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var changeTimeIn = function () {
    timeOut.value = timeIn.value;
  };
  var changeTimeOut = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener('change', changeTimeIn);
  timeOut.addEventListener('change', changeTimeOut);

  window.form = {
    activeFieldsets: activeFieldsets,
    setCoordinate: setCoordinate,
  };

})();
