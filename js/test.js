function initMap() {
  var mapOptions = {
    center: {
      lat: 35.345570,
      lng: 49.284599
    },
    zoom: 4,
    gestureHandling: 'greedy',
    minZoom: 4
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var FamilyHouse = {
    url: './image/FamilyHouse.png',
    scaledSize: new google.maps.Size(42, 42),
  };

  var RentedH = {
    url: './image/RentedH.png',
    scaledSize: new google.maps.Size(42, 42)
  };

  var markers = [];
  var infoWindows = [];

  function createFamilyHouse(markersData) {
    return markersData.map(data => {
      const {
        position,
        image,
        area,
        location
      } = data;
      const {
        lat,
        lng
      } = position;

      return {
        position: position,
        icon: FamilyHouse,
        content: `
          <img src="${image}" style="max-width: 300px" /> <br><br>
          <strong> House Location: </strong> ${location}<br>
          <strong>Occupancy:</strong> Family Residency<br>
          <strong>Area:</strong> ${area}<br>
          <strong>Location:</strong> <a href="https://maps.google.com/maps?q=${lat},${lng}">View on Google Maps</a>
        `
      };
    });
  }

  function createInfoWindowContent(markerData) {
    return `
      <img src="${markerData.image}" style="max-width: 300px" /> <br><br>
      <strong> House Location: </strong> ${markerData.location}<br>
      <strong>Occupancy:</strong> Family Residency<br>
      <strong>Area:</strong> ${markerData.area}<br>
      <strong>Location:</strong> <a href="https://maps.google.com/maps?q=${markerData.position.lat},${markerData.position.lng}">View on Google Maps</a>
    `;
  }

  // Existing code...

  // Add event listener to the "Add" button
  document.getElementById('addMarkerBtn').addEventListener('click', function () {
    var location = prompt('Enter the location:');
    var lat = parseFloat(prompt('Enter the latitude:'));
    var lng = parseFloat(prompt('Enter the longitude:'));
    var area = prompt('Enter the area:');
    var imageUrl = prompt('Enter the image URL:');

    var markerData = {
      position: {
        lat: lat,
        lng: lng
      },
      image: imageUrl,
      area: area,
      location: location
    };

    var marker = new google.maps.Marker({
      position: markerData.position,
      map: map,
      icon: FamilyHouse
    });

    var infoWindow = new google.maps.InfoWindow({
      content: createInfoWindowContent(markerData)
    });

    marker.addListener('click', function () {
      infoWindows.forEach(function (window) {
        window.close();
      });
      infoWindow.open(map, marker);
    });

    markers.push(marker);
    infoWindows.push(infoWindow);

    var familyHouseCount = markers.filter(function (marker) {
      return marker.icon === FamilyHouse;
    }).length;
    document.getElementById('familyHouseCount').textContent = familyHouseCount;
  });

  // Existing code...
}

initMap();
