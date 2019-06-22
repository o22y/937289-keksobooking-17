'use strict';

var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

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
      max: 828
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

var pool = document.querySelector('#pin');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var fragment = document.createDocumentFragment();

for (var i = 1; i < 8; i++) {
  var newElement = document.createElement('button');
  var pinLocation = newElement.className = 'map__pin';
  var pinImage = newElement.innerHTML = 'image';
  pinLocation.setAttribute('style="left: data.arr.location.x px; top: data.arr.location.y px;"');
  pinImage.setAttribute('src="data.arr.author.avatar", alt="data.arr.offer.type"');

  fragment.appendChild(newElement);
  // document.querySelector('#pin').insertAdjacentHTML('beforeend', pinTemplate);
}
pool.appendChild(fragment);


document.querySelector('.map').classList.remove('map-faded');
