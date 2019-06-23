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

var makeElement = function (tagName, className, idName) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  element.id = idName;

  return element;
};

var renderPins = function (pin, data) {
  var pinTemplate = makeElement('template', 'pin__template', 'pin');

  var button = makeElement('button', 'map__pin');
  button.setAttribute('style', 'left:data.location.x; top:data.location.y;');
  pinTemplate.appendChild(button);

  var picture = makeElement('img');
  picture.src = data.author.avatar;
  picture.alt = data.offer.type;
  pinTemplate.appendChild(picture);

  return pinTemplate;
};

for (var i = 0; i < 8; i++) {
  var cardItem = renderPins(data[i]);
  document.appendChild(cardItem);
}

renderPins(data);


document.querySelector('.map').classList.remove('map-faded');
