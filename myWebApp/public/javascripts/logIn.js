username="";
allContactsAredisplayed=false;
$(document).ready(function () {
    var user, pass;
    $("#loginForm").submit(function (e) {
        e.preventDefault();
        user = $("#user").val();
        pass = $("#password").val();
        $.post("http://localhost:3000/adviz/login", {user: user, password: pass}, function (data) {
            if (data === 'yes') {
                function sendReq() {
                    var httpRequest = new XMLHttpRequest();

                    var url = `http://localhost:3000/adviz/loginData`;

                    httpRequest.open("GET", url, true);

                    httpRequest.onerror = function () {// diese Funktion wird ausgefuehrt, wenn ein Fehler auftritt
                        console.log("Connecting to server with " + url + " failed!\n");
                    };

                    httpRequest.onload = function (e) {// diese Funktion wird ausgefuehrt, wenn die Anfrage erfolgreich war
                        var data = this.response;
                        var obj = JSON.parse(data);

                        if (this.status == 200) {
                            document.getElementById("logIn").style.display = 'none';
                            document.getElementById("loggedIn").style.display = 'block';
                            allContactsAredisplayed=false;
                            displayAddNewContact(false);

                            //safe current username
                            username=obj.userID;

                            // User specifics
                            requestAndCreateContactsAndMarker(obj.userID);

                            document.getElementById("loginData").innerHTML = "Hello, " + obj.userID + "!";
                        } else if (this.status == 401) {
                            document.getElementById("loginFail").innerHTML = "401 " + obj.failString;
                        } else {
                            console.log(obj.status);
                        }
                    };

                    httpRequest.send();
                }

                sendReq();
            } else {
                alert("Login data could not be sent");
            }
        });
        this.submit();
    });
});