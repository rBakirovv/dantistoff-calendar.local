window.addEventListener("DOMContentLoaded", function () {
  ymaps.ready(init);

  function init() {
    let center;
    if (window.innerWidth > 981) {
      center = [55.757704, 37.318759];
    } else {
      center = [55.489311, 37.595243]
    }
    const myMap = new ymaps.Map('map', {
      center: center,
      zoom: window.innerWidth > 981 ? 10.5 : 10.2
    });

    myMap.behaviors.disable("scrollZoom");
  }
})