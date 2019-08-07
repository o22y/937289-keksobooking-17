'use strict';

(function () {
  var OFFSET_X_MAX = 1135;
  var OFFSET_Y_MIN = 130;
  var OFFSET_Y_MAX = 630;

  // Перетаскивание метки
  window.mainPin.addEventListener('mousedown', function (evt) {
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
      var positionX = window.mainPin.offsetLeft - shift.x;
      var positionY = window.mainPin.offsetTop - shift.y;

      positionX = positionX < 0 ? 0 : positionX;
      positionX = positionX > OFFSET_X_MAX ? OFFSET_X_MAX : positionX;

      positionY = positionY < OFFSET_Y_MIN ? OFFSET_Y_MIN : positionY;
      positionY = positionY > OFFSET_Y_MAX ? OFFSET_Y_MAX : positionY;

      window.mainPin.style.top = (positionY) + 'px';
      window.mainPin.style.left = (positionX) + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.setCoordinate();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          window.mainPin.removeEventListener('click', onClickPreventDefault);
        };
        window.mainPin.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  // Обработчик активации страницы
  window.mainPin.addEventListener('click', window.active.dataToLocalData);
})();
