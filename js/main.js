   
  
   function initMap() {

        var mapOptions = {
            center: {
                lat: 35.345570,
                lng: 49.284599
            },
            zoom: 4,
            gestureHandling: 'greedy',
            minZoom: 4 // Adjust the minimum zoom level as desired
        };

        var map = new google.maps.Map(document.getElementById('map'), mapOptions);




        var FamilyHouse = {
            url: './image/FamilyHouse.png',
            scaledSize: new google.maps.Size(42, 42),
        };

        var School = {
            url: './image/School.png',
            scaledSize: new google.maps.Size(42, 42)
        };

        var NotRentedH = {
            url: './image/NotRentedH.png',
            scaledSize: new google.maps.Size(42, 42)
        };

        var RentedH = {
        
            url: './image/RentedH.png',
            scaledSize: new google.maps.Size(42, 42)
        };
        
        var FriendH = {
            url: './image/FriendHouse.png',
            scaledSize: new google.maps.Size(42, 42)
        };


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


function createRentalH(markersData) {
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
            icon: RentedH,
            content: `
        <img src="${image}" style="max-width: 300px" /> <br><br>
        <strong> House Location:</strong> ${location}<br>
        <strong>Occupancy:</strong> Rental Residency<br>
        <strong>Area:</strong> ${area}<br>
        <strong>Location:</strong> <a href="https://maps.google.com/maps?q=${lat},${lng}">View on Google Maps</a>
      `
        };
    });
}



// Usage
var markers = [
    ...createFamilyHouse([
       {position: {
                lat: 41.29108, 
                lng: 69.22685
            },
            image: "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
            area: "226m2",
            location: "Tashkent, Uzbekistan"
        },
       
         {position: {
                lat: 41.31637, 
                lng: 69.33335
            },
            image: "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
            area: "321m2",
            location: "Tashkent, Uzbekistan"
        },

    ]),
    ...createRentalH([
        
          {position: {
                            lat: 41.2913, 
                            lng: 69.2257
                        },
                        image: "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
                        area: "226m2",
                        location: "Tashkent, Uzbekistan"
                    }, // add more rentals
       
            {position: {
                lat: 41.29108,
                lng: 63.22685
            },
            image: "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
            area: "226m2",
            location: "Antalya, Turkey"
              },
       
        {position: {
                lat: 41.29021, 
                lng: 69.22714
            },
            image: "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
            area: "226m2",
            location: "Tashkent, Uzbekistan"
              },

       
])
];




        var infoWindows = [];

        // Create markers and info windows dynamically
        markers.forEach(function (markerData) {
            var marker = new google.maps.Marker({
                position: markerData.position,
                map: map,
                title: markerData.title,
                icon: markerData.icon
            });

            var infoWindow = new google.maps.InfoWindow({
                content: markerData.content
            });

            marker.addListener('click', function () {
                infoWindows.forEach(function (window) {
                    window.close(); // Close any open info windows
                });
                infoWindow.open(map, marker);
            });

            infoWindows.push(infoWindow);
        });
        // Function to handle the click event on the link
        // Attach the click event listener to each link
        var mapLinks = document.getElementsByClassName('mapLink');
        Array.from(mapLinks).forEach(function (link) {
            link.addEventListener('click', handleMapLinkClick);
        });

        // Function to handle the click event on each link
        function handleMapLinkClick(event) {
            event.preventDefault(); // Prevent the default link behavior

            // Get the location data from the clicked link's data attributes
            var lat = parseFloat(this.getAttribute('data-lat'));
            var lng = parseFloat(this.getAttribute('data-lng'));
            var zoom = parseInt(this.getAttribute('data-zoom'));

            // Pan the map to the target location and set the zoom level
            map.panTo({
                lat: lat,
                lng: lng
            });
            map.setZoom(zoom);
        }

        var familyHouseCount = markers.filter(function (marker) {
            return marker.icon === FamilyHouse;
        }).length;

        var rentedH = markers.filter(function (marker) {
            return marker.icon === RentedH;
        }).length;


        document.getElementById('familyHouseCount').textContent = +familyHouseCount;
        document.getElementById('rentedH').textContent = +rentedH;

    }
initMap()

