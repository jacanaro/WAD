function createMapMarker(contactObject) {
    var markerReq = new XMLHttpRequest();
    var url = "https://maps.googleapis.com/maps/api/geocode/json?";
    url = url + "address=" + contactObject.StrHsnr + ", " + contactObject.Stadt;
    url = url + "&key=AIzaSyB6r6VNSQh_pXayQ1yY3-NOp_0rKzaukZ4";

    markerReq.open("GET", url, true);

    markerReq.onerror = function () {   // Aufruf, wenn ein Fehler auftritt
        alert("Connecting to server with " + url + " failed!\n");
    };
    markerReq.onload = function (e) {   // Aufruf,wenn die Anfrage erfolgreich war
        var data = this.response;
        var obj = JSON.parse(data);
        //console.log(obj);
        if (this.status == 200) {
            if (obj.status != "ZERO_RESULTS") {
                var lat = obj.results[0].geometry.location.lat;
                var lng = obj.results[0].geometry.location.lng;
                var marker = new google.maps.Marker({
                    position: {lat:lat,lng:lng},
                    map: map
                });
            } else {
                alert("Error: Address could not be resolved!");
            }
        } else {
            alert("HTTP-status: " + obj.status);
        }
    };
    markerReq.send();
}