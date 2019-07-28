'use strict';

(function () {
  var xhr = new XMLHttpRequest();
  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    console.log(data);
  };

  xhr.addEventListener('load', function (evt) {
    if (xhr.status === 200) {
      onSuccess(xhr.response);
      window.data = JSON.parse(xhr.responseText);
    } else {
      onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  });

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
  xhr.send();

  xhr.timeout = 10000; // 10s
})();
