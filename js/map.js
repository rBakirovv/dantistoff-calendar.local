window.addEventListener("DOMContentLoaded", function () {
  let mapInfo = [{
      title: "Проспект Мира",
      underground: "Проспект Мира",
      adress: "г. Москва, Проспект Мира 53с1",
      color: "orange",
      position: [55.784804, 37.634170],
      coordinates: "55.784804, 37.634170",
    },
    {
      title: "Беговой",
      underground: "Беговая",
      adress: "г. Москва, Хорошёвское шоссе, 48",
      color: "purple",
      position: [55.776292, 37.535549],
      coordinates: "55.776292, 37.535549",
    },
    {
      title: "Раменках",
      underground: "Раменки",
      adress: "г. Москва, Столетова, 11",
      color: "yellow",
      position: [55.703499, 37.499083],
      coordinates: "55.703499, 37.499083",
    },
    {
      title: "Академическая",
      underground: "Академическая",
      adress: "г. Москва, Винокурова, 2",
      color: "orange",
      position: [55.689312, 37.581490],
      coordinates: "55.689312, 37.581490",
    },
    {
      title: "Савёловская",
      underground: "Савёловская",
      adress: "г. Москва, Складочная, 1 стр 18",
      color: "grey",
      position: [55.801435, 37.592231],
      coordinates: "55.801435, 37.592231",
    },
    {
      title: "Полежаевская",
      underground: "Полежаевская",
      adress: "г. Москва, Хорошевское шоссе, 17",
      color: "purple",
      position: [55.775854, 37.531702],
      coordinates: "55.775854, 37.531702",
    }
  ]

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

    const mapAccordionsList = document.querySelector(".map-accordions-list");
    const template = document.querySelector('.map-template');

    mapInfo.map((mapItem) => {
      const cloneAccordion = template.content.querySelector('.accordion-item').cloneNode(true);

      const mapAddress = cloneAccordion.querySelector("#map-address");
      const mapCoordinates = cloneAccordion.querySelector("#map-coordinates");
      const mapMetro = cloneAccordion.querySelector("#map-metro");
      const accordionHeadTitle = cloneAccordion.querySelector(".accordion-head-title");
      const metroIcon = cloneAccordion.querySelector(".map-panel__metro-icon");

      const coordElement = cloneAccordion.querySelector(".map-panel__panel-coordinates");
      const coordCopyElement = cloneAccordion.querySelector(".scheme__coord-copy");

      const emailElement = cloneAccordion.querySelector("#map-email");
      const emailCopyElement = cloneAccordion.querySelector(".scheme__email-copy");

      mapAddress.textContent = mapItem.adress;
      mapCoordinates.textContent = mapItem.coordinates;
      mapMetro.textContent = mapItem.underground;
      accordionHeadTitle.textContent = mapItem.underground;
      metroIcon.classList.add(`--${mapItem.color}`);

      coordElement.addEventListener("click", () => {
        navigator.clipboard.writeText(mapItem.coordinates)
          .then(() => {
            coordCopyElement.querySelector('.scheme__coord-copy-container').textContent = 'Скопировано в буфер обмена';
          })
          .then(() => {
            setTimeout(() => {
              coordCopyElement.querySelector('.scheme__coord-copy-container').textContent = 'Скопировать координаты';
            }, 3000)
          })
      })

      emailElement.addEventListener("click", () => {
        navigator.clipboard.writeText("info@dantistoff.ru")
          .then(() => {
            emailCopyElement.querySelector('.scheme__email-copy-container').textContent = 'Скопировано в буфер обмена';
          })
          .then(() => {
            setTimeout(() => emailCopyElement.querySelector('.scheme__email-copy-container').textContent = 'Скопировать координаты', 1600)
          })
      })

      mapAccordionsList.appendChild(cloneAccordion);
    })

    const accordionsHeads = mapAccordionsList.querySelectorAll(".accordion-head");

    accordionsHeads[0].parentNode.classList.add("accordion-item_active");

    accordionsHeads.forEach((accordionHead) => {
      accordionHead.addEventListener("click", (e) => {
        accordionsHeads.forEach((item) => {
          item.parentNode.classList.remove("accordion-item_active");
        })

        accordionHead.parentNode.classList.toggle("accordion-item_active");

        updateInfo([...accordionsHeads].indexOf(e.target.closest('.accordion-head')));
        updateMarker([...accordionsHeads].indexOf(e.target.closest('.accordion-head')));
      })
    })

    myMap.behaviors.disable("scrollZoom");

    let marker = './images/map-icon.svg';

    let clusterer = new ymaps.Clusterer({
      clusterIcons: [{
        href: './images/map-icon-group.svg',
        size: [80, 80],
        offset: [-50, -50]
      }],
    });

    let updateInfo = (ind) => {
      accordionsHeads.forEach((accordionHead, index) => {
        if (index !== ind) {
          accordionHead.parentNode.classList.remove("accordion-item_active");
        }
      })

      accordionsHeads[ind].parentNode.classList.add("accordion-item_active");
    }

    let updateMarker = (ind) => {
      myMap.geoObjects.removeAll();

      mapInfo.map((elemNew, indexNew) => {
        if (ind == indexNew) {
          activeMarker = `./images/map-icon-${mapInfo[ind].color}.svg`;
        } else {
          activeMarker = marker;
        }

        myPlacemark = new ymaps.Placemark(elemNew.position, {}, {
          iconLayout: 'default#image',
          iconImageHref: activeMarker,
          iconImageSize: [80, 80],
          iconImageOffset: [-40, -70]
        });
        myMap.geoObjects.add(myPlacemark);

        myPlacemark.events.add('click', function () {
          updateInfo(indexNew);
          updateMarker(indexNew);
        });
      })
    }

    mapInfo.map((elem, index) => {
      if (index == 0) {
        activeMarker = `./images/map-icon-${mapInfo[index].color}.svg`;
        updateInfo(index);
      } else {
        activeMarker = marker;
      }
      myPlacemark = new ymaps.Placemark(elem.position, {}, {
        iconLayout: 'default#image',
        iconImageHref: activeMarker,
        iconImageSize: [80, 80],
        iconImageOffset: [-40, -70]
      });
      myMap.geoObjects.add(myPlacemark);

      myPlacemark.events.add('click', function () {
        updateInfo(index);
        updateMarker(index);
      });

      myMap.geoObjects.add(clusterer);
      clusterer.add(myPlacemark);
    })
  }
})