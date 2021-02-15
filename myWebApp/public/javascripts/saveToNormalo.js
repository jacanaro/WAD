function saveToNormalo(){

    function getAddNewContactFormData() {
        var newContactObject = {
            "_id": "",
            "Titel": "",
            "m_w_d": "",
            "Vorname": "",
            "Name": "",
            "StrHsnr": "",
            "PLZ": 0,
            "Stadt": "",
            "Land": "",
            "Email": "",
            "Sonstiges": "",
            "isPrivate": false,
            "lat": 0.0,
            "lng": 0.0,
            "ownerID": "",
            "__v": ""
        };

        newContactObject.Titel = document.getElementById("addNewTitle").value;
        newContactObject.m_w_d = document.getElementById("addNewGeschlecht").value;
        newContactObject.Vorname = document.getElementById("addNewVorname").value;
        newContactObject.Name = document.getElementById("addNewNachname").value;
        newContactObject.StrHsnr = document.getElementById("addNewStrasseUndHausnummer").value;
        newContactObject.PLZ = document.getElementById("addNewPlz").value;
        newContactObject.Stadt = document.getElementById("addNewStadt").value;
        newContactObject.Land = document.getElementById("addNewLand").value;
        newContactObject.Email = document.getElementById("addNewMailAdr").value;
        newContactObject.Sonstiges = document.getElementById("addNewSonstiges").value;
        newContactObject.isPrivate = document.getElementById("addNewPrivatCheck").checked;

        //get lat and long of addr
        var markerReq = new XMLHttpRequest();
        var url = "https://maps.googleapis.com/maps/api/geocode/json?";
        url = url + "address=" + newContactObject.StrHsnr + ", " + newContactObject.Stadt;
        url = url + "&key=AIzaSyB6r6VNSQh_pXayQ1yY3-NOp_0rKzaukZ4";

        markerReq.open("GET", url, true);

        markerReq.onerror = function() {   // Aufruf, wenn ein Fehler auftritt
            alert("Server couldn't connect to " + url + " !\n");
        };

        markerReq.onload = function (e) {   // Aufruf,wenn die Anfrage erfolgreich war
            var data = this.response;
            var obj = JSON.parse(data);
            if (this.status == 200) {
                if (obj.status != "ZERO_RESULTS") {
                    var lat = obj.results[0].geometry.location.lat;
                    var lng = obj.results[0].geometry.location.lng;
                    newContactObject.lat = lat;
                    newContactObject.lng = lng;

                    newContactObject.ownerID = "normalo";

                    $.post("http://localhost:3000/adviz/contacts",newContactObject, function (data) {
                        if (data ==="success") {
                            alert("Contact added!");

                            if(allContactsAredisplayed == true){
                                showAllContacts();
                            }
                            else{
                                showMyContacts();
                            }
                        } else if (data === "contactExists") {
                            alert("Contact already exists");
                        }
                        else {
                            alert("Contact could not be sent to Server!");
                        }
                    });

                } else {
                    alert("Error: Address could not be resolved!");
                }
            } else {
                alert("HTTP-status: " + obj.status);
            }
        };
        markerReq.send();
        displayAddNewContact(false);


    }
    getAddNewContactFormData();
}
