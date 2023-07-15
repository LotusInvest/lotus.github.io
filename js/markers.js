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

   handleMapLinkClick();