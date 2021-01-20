function createContactFormAndMapMarker(contactObject) {
    //create marker on map
    var mapMarker=[];
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
        console.log(obj);
        if (this.status == 200) {
            if (obj.status != "ZERO_RESULTS") {
                var lat = obj.results[0].geometry.location.lat;
                var lng = obj.results[0].geometry.location.lng;
                mapMarker[0] = new google.maps.Marker({
                    position: {lat:lat,lng:lng},
                    map: map
                });
            } else {
                alert("Die Adresse konnte nicht aufgelöst werden!");
            }
        } else {
            alert("HTTP-status code was: " + obj.status);
        }
    };
    markerReq.send();

    var details = document.createElement("details");


    var summary = document.createElement("summary");
    summary.innerHTML = contactObject.Vorname + " " + contactObject.Name;
    details.appendChild(summary);

    var form = document.createElement("form");
    form.setAttribute('onsubmit', "return false;");
    //form.setAttribute('action', "/contacts");


    var br = document.createElement("br");
    form.appendChild(br);

    var inputTitel = document.createElement("input"); //input element, text
    inputTitel.setAttribute('type', "text");
    inputTitel.setAttribute('name', "titel");
    inputTitel.setAttribute('placeholder', "Titel");
    inputTitel.id = "titel" + contactObject._id;
    inputTitel.value = contactObject.Titel;
    form.appendChild(inputTitel);
    var br = document.createElement("br");
    form.appendChild(br);
    var br = document.createElement("br");
    form.appendChild(br);


    var label = document.createElement("label");
    label.setAttribute("for", "Geschlecht");
    label.innerHTML = "Geschlecht: "
    form.appendChild(label);

    var select = document.createElement("select");
    select.setAttribute("name", "Geschlecht");
    var options = ["keine Angabe", "männlich", "weiblich"];
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i];
        option.text = options[i];
        select.appendChild(option);
    }
    select.id = "geschlecht" + contactObject._id;
    select.value = contactObject.m_w_d;
    form.appendChild(select);
    var br = document.createElement("br");
    form.appendChild(br);
    var br = document.createElement("br");
    form.appendChild(br);


    var inputVorname = document.createElement("input"); //input element, text
    inputVorname.setAttribute('type', "text");
    inputVorname.setAttribute('name', "vorname");
    inputVorname.setAttribute('placeholder', "Vorname");
    inputVorname.required = true;
    inputVorname.id = "vorname" + contactObject._id;
    inputVorname.value = contactObject.Vorname;
    form.appendChild(inputVorname);
    var br = document.createElement("br");
    form.appendChild(br);
    var br = document.createElement("br");
    form.appendChild(br);

    var inputNachname = document.createElement("input"); //input element, text
    inputNachname.setAttribute('type', "text");
    inputNachname.setAttribute('name', "nachname");
    inputNachname.setAttribute('placeholder', "Nachname");
    inputNachname.required = true;
    inputNachname.id = "name" + contactObject._id;
    inputNachname.value = contactObject.Name;
    form.appendChild(inputNachname);
    var br = document.createElement("br");
    form.appendChild(br);
    var br = document.createElement("br");
    form.appendChild(br);

    var inputStrasseUndHausnummer = document.createElement("input"); //input element, text
    inputStrasseUndHausnummer.setAttribute('type', "text");
    inputStrasseUndHausnummer.setAttribute('name', "StrasseUndHausnummer");
    inputStrasseUndHausnummer.setAttribute('placeholder', "Straße und Hausnummer");
    inputStrasseUndHausnummer.required = true;
    inputStrasseUndHausnummer.id = "strHsnr" + contactObject._id;
    inputStrasseUndHausnummer.value = contactObject.StrHsnr;
    form.appendChild(inputStrasseUndHausnummer);
    var br = document.createElement("br");
    form.appendChild(br);
    var br = document.createElement("br");
    form.appendChild(br);

    var inputPLZ = document.createElement("input"); //input element, text
    inputPLZ.setAttribute('type', "number");
    inputPLZ.setAttribute('name', "PLZ");
    inputPLZ.setAttribute('placeholder', "Postleitzahl");
    inputPLZ.required = true;
    inputPLZ.id = "plz" + contactObject._id;
    inputPLZ.value = contactObject.PLZ;
    form.appendChild(inputPLZ);
    var br = document.createElement("br");
    form.appendChild(br);
    var br = document.createElement("br");
    form.appendChild(br);

    var inputStadt = document.createElement("input"); //input element, text
    inputStadt.setAttribute('type', "text");
    inputStadt.setAttribute('name', "Stadt");
    inputStadt.setAttribute('placeholder', "Stadt");
    inputStadt.required = true;
    inputStadt.id = "stadt" + contactObject._id;
    inputStadt.value = contactObject.Stadt;
    form.appendChild(inputStadt);
    var br = document.createElement("br");
    form.appendChild(br);
    var br = document.createElement("br");
    form.appendChild(br);

    var inputLand = document.createElement("input"); //input element, text
    inputLand.setAttribute('type', "text");
    inputLand.setAttribute('name', "Land");
    inputLand.setAttribute('placeholder', "Land");
    inputLand.required = true;
    inputLand.id = "land" + contactObject._id;
    inputLand.value = contactObject.Land;
    form.appendChild(inputLand);
    var br = document.createElement("br");
    form.appendChild(br);
    var br = document.createElement("br");
    form.appendChild(br);

    var inputMailAdr = document.createElement("input"); //input element, text
    inputMailAdr.setAttribute('type', "text");
    inputMailAdr.setAttribute('name', "MailAdr");
    inputMailAdr.setAttribute('placeholder', "Mail-Adresse");
    inputMailAdr.id = "email" + contactObject._id;
    inputMailAdr.value = contactObject.Email;
    form.appendChild(inputMailAdr);
    var br = document.createElement("br");
    form.appendChild(br);
    var br = document.createElement("br");
    form.appendChild(br);

    var inputSonstiges = document.createElement("input"); //input element, text
    inputSonstiges.setAttribute('type', "text");
    inputSonstiges.setAttribute('name', "Sonstiges");
    inputSonstiges.setAttribute('placeholder', "Sonstiges");
    inputSonstiges.id = "sonstiges" + contactObject._id;
    inputSonstiges.value = contactObject.Sonstiges;
    form.appendChild(inputSonstiges);
    var br = document.createElement("br");
    form.appendChild(br);
    var br = document.createElement("br");
    form.appendChild(br);


    var label = document.createElement("label");
    label.setAttribute("for", "privContakt");
    label.innerHTML = "Privater Kontakt: "
    form.appendChild(label);

    var inputIsPrivat = document.createElement("input"); //input element, text
    inputIsPrivat.setAttribute('type', "checkbox");
    inputIsPrivat.setAttribute('name', "isPrivContact");
    inputIsPrivat.id = "isPrivat" + contactObject._id;
    inputIsPrivat.checked = contactObject.isPrivate;
    form.appendChild(inputIsPrivat);
    var br = document.createElement("br");
    form.appendChild(br);
    var br = document.createElement("br");
    form.appendChild(br);


    var updateButton = document.createElement("button"); //input element, Submit button
    updateButton.textContent = 'Update Contact';

    updateButton.onclick = function updateContact() {
        var newContactObject = {
            _id: contactObject._id,
            Titel: inputTitel.value,
            m_w_d: select.value,
            Vorname: inputVorname.value,
            Name: inputNachname.value,
            StrHsnr: inputStrasseUndHausnummer.value,
            PLZ: inputPLZ.value,
            Stadt: inputStadt.value,
            Land: inputLand.value,
            Email: inputMailAdr.value,
            Sonstiges: inputSonstiges.value,
            isPrivate: inputIsPrivat.value,
            lat: 52.4626,
            lng: 13.52322,
            ownerID: contactObject.ownerID,
            __v: 0
        };
        //get lat and long of addr
        mapMarker=[];
        var markerReq = new XMLHttpRequest();
        var url = "https://maps.googleapis.com/maps/api/geocode/json?";
        url = url + "address=" + inputStrasseUndHausnummer.value + ", " + inputStadt.value;
        url = url + "&key=AIzaSyB6r6VNSQh_pXayQ1yY3-NOp_0rKzaukZ4";

        markerReq.open("GET", url, false);

        markerReq.onerror = function () {   // Aufruf, wenn ein Fehler auftritt
            alert("Connecting to server with " + url + " failed!\n");
        };
        markerReq.onload = function (e) {   // Aufruf,wenn die Anfrage erfolgreich war
            var data = this.response;
            var obj = JSON.parse(data);
            console.log(obj);
            if (this.status == 200) {
                if (obj.status != "ZERO_RESULTS") {
                    var lat = obj.results[0].geometry.location.lat;
                    var lng = obj.results[0].geometry.location.lng;
                    marker = new google.maps.Marker({
                        position: {lat:lat,lng:lng},
                        map: map
                    });
                    newContactObject.lat=lat;
                    newContactObject.lng=lng;
                } else {
                    alert("Die Adresse konnte nicht aufgelöst werden!");
                }
            } else {
                alert("HTTP-status code was: " + obj.status);
            }
        };
        markerReq.send();

        if (inputVorname.value != "" && inputNachname.value != "" && inputStrasseUndHausnummer.value != "" && inputPLZ.value != "" && inputStadt.value != "" && inputLand.value != "") {
            $.ajax({
                url: 'http://localhost:3000/adviz/contacts/id',
                type: 'PUT',
                data: newContactObject,
                success: function (data) {
                    if (data == "yes") {
                        alert("Kontakt aktualisiert!");
                    } else {
                        alert("didnt reach server");
                    }
                    ;
                }
            });
        }
    };


    form.appendChild(updateButton);
    var br = document.createElement("br");
    form.appendChild(br);
    var br = document.createElement("br");
    form.appendChild(br);

    var deleteContact = document.createElement("button");
    deleteContact.textContent = 'Delete Contact';
    deleteContact.onclick = function deleteContact() {
        var contactID = {_id: contactObject._id};

        $.ajax({
            url: 'http://localhost:3000/adviz/contacts/id',
            type: 'DELETE',
            data: contactID,
            success: function (data) {
                if (data == "yes") {
                    while (details.firstChild) {
                        details.removeChild(details.lastChild);
                    }
                    details.remove();
                } else {
                    alert("didnt reach server");
                }
                ;
            }
        });

    };

    form.appendChild(deleteContact);
    var br = document.createElement("br");
    form.appendChild(br);
    var br = document.createElement("br");
    form.appendChild(br);

    details.appendChild(form);

    document.getElementById('displayedContacts').appendChild(details);


    const All_Details = document.querySelectorAll('details');

    All_Details.forEach(deet => {
        deet.addEventListener('toggle', toggleOpenOneOnly)
    })

    function toggleOpenOneOnly(e) {
        if (this.open) {
            All_Details.forEach(deet => {
                if (deet != this && deet.open) deet.open = false
            });
        }
    }
}
