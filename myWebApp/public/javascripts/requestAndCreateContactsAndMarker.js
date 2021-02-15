function requestAndCreateContactsAndMarker(userID) {
    var xhr = new XMLHttpRequest();
    var url1 = `http://localhost:3000/adviz/contacts?userId=`;
    url1 += userID;

    xhr.open("GET", url1, true);
    xhr.onload = function (e) {// diese Funktion wird ausgefuehrt, wenn die Anfrage erfolgreich war
        var data1 = this.response;
        var contacts = JSON.parse(data1);

        if (this.status == 200) {
            for (var i = 0; i < contacts.length; i++) {
                if(contacts[i]!=null)
                createContactFormAndMapMarker(contacts[i]);
            }


        } else {
            console.log(contacts.status);
        }
    };
    xhr.send();
}