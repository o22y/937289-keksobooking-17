'use strict';

// Функция рандомных чисел
var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

// Размеры метки
var PIN_WIDTH = 65;
var PIN_HEIGHT = 85;

// Создания макета метки
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

var MOCK = {
  author: {
    avatar: 'img/avatars/user0'
  },
  offer: {
    type: ['house', 'palace', 'flat', 'bungalo']
  },
  location: {
    x: {
      min: 100,
      max: 1000
    },
    y: {
      min: 130,
      max: 630
    }
  }
};

// Заполнение шаблона метки
var generateData = function (MOCK) {
  var arr = [];
  for (var i = 0; i < 8; i++) {
    arr[i] = {
      author: {
        avatar: MOCK.author.avatar + (i + 1) + '.png',
      },
      offer: {
        type: MOCK.offer.type[Math.floor(Math.random() * 3)]
      },
      location: {
        x: randomInteger(MOCK.location.x.min, MOCK.location.x.max),
        y: randomInteger(MOCK.location.y.min, MOCK.location.y.max)
      }
    };
  }
  return arr;
};

var data = generateData(MOCK);

var mainPin = document.querySelector('.map__pin--main');

// Отрисовка меток
var renderPins = function () {
  for (var i = 0; i < data.length; i++) {
    var element = pin.cloneNode(true);
    element.style.left = data[i].location.x + 'px';
    element.style.top = data[i].location.y + 'px';
    element.querySelector('img').src = data[i].author.avatar;
    element.querySelector('img').alt = data[i].offer.type;

    mapPins.appendChild(element);
  }
};

// Отключение полей
var fieldsets = document.querySelectorAll('fieldset');
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

// Активация страницы
var activatePage = function () {
  var map = document.querySelector('.map');
  // Активация карты
  map.classList.remove('map--faded');
  // Активация формы
  var form = document.querySelector('.ad-form');
  form.classList.remove('ad-form--disabled');
  renderPins();
  activeFieldsets();
  mainPin.removeEventListener('click', activatePage);
};

// Обработчик активации страницы
mainPin.addEventListener('click', activatePage);

// Добавление координат в input
var address = document.querySelector('#address');
mainPin.addEventListener('mouseup', function () {
  var pinCoordinate = mainPin.getBoundingClientRect();
  address.value = '';
  address.value += ((pinCoordinate.left + PIN_WIDTH / 2) + ', ' + (pinCoordinate.top + PIN_HEIGHT / 2));
});

// Изменение минимальной цены при разных типах жилья
var houseType = document.querySelector('#type');
var housePrice = document.querySelector('#price');
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

// Перетаскивание метки
mainPin.style.cursor = 'pointer';
mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    // Предотвращает выход метки за рамки экрана
    var positionX = mainPin.offsetLeft - shift.x;
    var positionY = mainPin.offsetTop - shift.y;

    var OFFSET_X_MAX = 1135;
    var OFFSET_Y_MIN = 130;
    var OFFSET_Y_MAX = 630;

    positionX = positionX < 0 ? 0 : positionX;
    positionX = positionX > OFFSET_X_MAX ? OFFSET_X_MAX : positionX;

    positionY = positionY < OFFSET_Y_MIN ? OFFSET_Y_MIN : positionY;
    positionY = positionY > OFFSET_Y_MAX ? OFFSET_Y_MAX : positionY;

    mainPin.style.top = (positionY) + 'px';
    mainPin.style.left = (positionX) + 'px';
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    mainPin.style.cursor = 'crosshair';
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        mainPin.removeEventListener('click', onClickPreventDefault);
      };
      mainPin.addEventListener('click', onClickPreventDefault);
    }
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
