//user obj is in result var of call back function --> how to use: getCurrentUser(function(userObj){
// 		do something with userObj here
// 	});

function getCurrentUser(cb) {
    var user;
    var req = new XMLHttpRequest();
    var url = `http://localhost:3000/adviz/user`
    req.open('GET', url, false);
    req.onreadystatechange = function() {
        if (this.readyState === 4) {
            user = cb(JSON.parse(this.response));
        }
        else{
            cb(null);
        }
    }
    req.send();
    return user;
}