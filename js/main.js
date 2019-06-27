'use strict';

// Функция рандомных чисел
var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

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
var map = document.querySelector('.map');

// Обработчик активации страницы
mainPin.addEventListener('click', function () {
  // Активация карты
  map.classList.remove('map--faded');
  // Отрисовка меток
  for (var i = 0; i < data.length; i++) {
    var element = pin.cloneNode(true);
    element.style.left = data[i].location.x + 'px';
    element.style.top = data[i].location.y + 'px';
    element.querySelector('img').src = data[i].author.avatar;
    element.querySelector('img').alt = data[i].offer.type;

    mapPins.appendChild(element);
  }
  // Активация формы
  var form = document.querySelector('.ad-form');
  form.classList.remove('ad-form--disabled');
});

mainPin.removeEventListener('click', function () {
  // Активация карты
  document.querySelector('.map').classList.remove('map-faded');
  // Отрисовка меток
  for (var i = 0; i < data.length; i++) {
    var element = pin.cloneNode(true);
    element.style.left = data[i].location.x + 'px';
    element.style.top = data[i].location.y + 'px';
    element.querySelector('img').src = data[i].author.avatar;
    element.querySelector('img').alt = data[i].offer.type;

    mapPins.appendChild(element);
  }
  // Активация формы
  var form = document.querySelector('.ad-form');
  form.classList.remove('.ad-form--disabled');
});

// Размеры метки
var PIN_WIDTH = 65;
var PIN_HEIGHT = 85;

// Добавление координат в input
var address = document.querySelector('#address');
mainPin.addEventListener('mouseup', function () {
  var pinCoordinate = mainPin.getBoundingClientRect();
  address.value = '';
  address.value += ((pinCoordinate.left + PIN_WIDTH / 2) + ', ' + (pinCoordinate.top + PIN_HEIGHT / 2));
});
