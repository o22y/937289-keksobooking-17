'use strict';

(function () {
  // Создания макета метки
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
          x: window.util.randomInteger(MOCK.location.x.min, MOCK.location.x.max),
          y: window.util.randomInteger(MOCK.location.y.min, MOCK.location.y.max)
        }
      };
    }
    return arr;
  };

  var data = generateData(MOCK);

  window.data = {
    data: data,
  };
})();
