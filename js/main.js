'use strict';

var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

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
      max: 1200
    },
    y: {
      min: 130,
      max: 630
    }
  }
};

var generateData = function (MOCK) {
  var arr = [];
  for (var i = 0; i < 8; i++) {
    arr[i] = {
      author: {
        avatar: MOCK.author.avatar + i + '.png',
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

for (var i = 0; i < data.length; i++) {
  var element = pin.cloneNode(true);
  element.style.left = data[i].location.x + 'px';
  element.style.top = data[i].location.y + 'px';
  element.querySelector('img').src = data[i].author.avatar;
  element.querySelector('img').alt = data[i].offer.type;

  mapPins.appendChild(element);
}


document.querySelector('.map').classList.remove('map-faded');