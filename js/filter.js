'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('#housing-features input');

  var getHousingType = function (element) {
    return housingType.value === 'any' ? true : element.offer.type === housingType.value;
  };

  var getHousingPrice = function (element) {
    switch (housingPrice.value) {
      case 'middle' : return element.offer.price >= 10000 && element.offer.price <= 50000;
      case 'low' : return element.offer.price >= 10000;
      case 'high' : return element.offer.price >= 50000;
      default: return true;
    }
  };

  var getHousingRooms = function (element) {
    return housingType.value === 'any' ? true : element.offer.rooms === housingRooms.value;
  };

  var getHousingGuests = function (element) {
    return housingType.value === 'any' ? true : element.offer.guests === housingGuests.value;
  };

  var getHousingFeatures = function (element) {
    var checkedFeatures = Array.from(housingFeatures).filter(function (el) {
      return el.checked;
    }).map(function (el) {
      return el.value;
    });
    return checkedFeatures.every(function (val) {
      return element.offer.features.indexOf(val) !== -1;
    });
  };

  var getAllFilters = function (data) {
    return data.filter(function (el) {
      return getHousingType(el) &&
             getHousingPrice(el) &&
             getHousingRooms(el) &&
             getHousingGuests(el) &&
             getHousingFeatures(el);
    });
  };

  var generalFilter = function () {
    window.util.removePins();
    window.active.renderPins(getAllFilters(window.succesData));
  };

  mapFilters.addEventListener('change', generalFilter);

  window.filter = {
    mapFilters: mapFilters,
    generalFilter: generalFilter
  };

})();
