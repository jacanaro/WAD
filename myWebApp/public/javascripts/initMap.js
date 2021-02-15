let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 52.462600, lng: 13.523220 },
        zoom: 11,
    });
}
