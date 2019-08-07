'use strict';
(function () {
  var TypesMap = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var card = document.querySelector('#card');
  var map = document.querySelector('.map');
  var adTemplate = card.content.querySelector('.map__card');
  var popupPhoto = card.content.querySelector('.popup__avatar');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinTemplate = card.content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var createFeatureFragment = function (adData) {
    var featureFragment = document.createDocumentFragment();
    adData.offer.features.forEach(function (it) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + it;
      featureFragment.appendChild(featureItem);
    });
    return featureFragment;
  };

  var createPhotosFragment = function (adData) {
    var photosFragment = document.createDocumentFragment();
    adData.offer.photos.forEach(function (it) {
      var popupPhotoItem = popupPhoto.cloneNode(true);
      popupPhotoItem.src = it;
      photosFragment.appendChild(popupPhotoItem);
    });
    return photosFragment;
  };

  var createAd = function (adData) {
    var ad = adTemplate.cloneNode(true);
    ad.querySelector('.map__card img').src = adData.author.avatar;
    ad.querySelector('.popup__title').textContent = adData.offer.title;
    ad.querySelector('.popup__text--price').textContent = adData.offer.price + ' ₽/ночь';
    ad.querySelector('.popup__type').textContent = TypesMap[adData.offer.type.toUpperCase()];
    ad.querySelector('.popup__text--capacity').textContent = adData.offer.rooms + ' комнаты для ' + adData.offer.guests + ' гостей';
    ad.querySelector('.popup__text--time').textContent = 'Заезд после ' + adData.offer.checkin + ', выезд до ' + adData.offer.checkout;
    ad.querySelector('.popup__features').innerHTML = '';
    ad.querySelector('.popup__features').appendChild(createFeatureFragment(adData));
    ad.querySelector('.popup__description').textContent = adData.offer.description;
    ad.querySelector('.popup__photos').removeChild(ad.querySelector('.popup__photo'));
    ad.querySelector('.popup__photos').appendChild(createPhotosFragment(adData));
    mapFiltersContainer.insertAdjacentElement('beforebegin', ad);
    var closeAdBtn = ad.querySelector('.popup__close');
    var closeAd = function () {
      ad.remove();
      closeAdBtn.removeEventListener('click', onCloseAdBtnClick);
      document.removeEventListener('keydown', onAdEscDown);
    };
    var onCloseAdBtnClick = function () {
      closeAd();
    };
    closeAdBtn.addEventListener('click', onCloseAdBtnClick);
    var onAdEscDown = function (evt) {
      window.utils.onEscDown(evt, closeAd);
    };
    document.addEventListener('keydown', onAdEscDown);
    return ad;
  };

  var createPinMarkup = function (data) {
    var onPinItemClick = function () {
      window.pinItem = mapPinTemplate.cloneNode(true);
      var mapCardRemovable = map.querySelector('.map__card');
      if (mapCardRemovable) {
        mapCardRemovable.remove();
      }
      createAd(window.succesData);
    };
    window.pinItem.addEventListener('click', onPinItemClick);
    return window.pinItem;
  };

  var renderPinsMarkup = function (data) {
    var mapPinsFragment = document.createDocumentFragment();
    data.forEach(function (it) {
      mapPinsFragment.appendChild(createPinMarkup(it));
    });
    mapPins.appendChild(mapPinsFragment);
  };

  window.card = {
    createAd: createAd,
    renderPinsMarkup: renderPinsMarkup,
  };

})();
