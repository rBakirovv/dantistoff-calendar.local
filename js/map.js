window.addEventListener("DOMContentLoaded", function () {
  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.732120, 37.588526],
        zoom: 16,
      }),
      myStreet1 = new ymaps.Placemark(
        [55.732120, 37.588526], {}, {
          iconLayout: "default#image",
          iconImageHref: "images/map-icon.svg",
          iconImageSize: [102, 102],
          iconImageOffset: [-30, -60],
        }
      );
    myMap.geoObjects.add(myStreet1);
    myMap.behaviors.disable("scrollZoom");
  }
})