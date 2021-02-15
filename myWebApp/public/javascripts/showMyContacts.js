function showMyContacts(){
	allContactsAredisplayed = false;
	deleteContactsFromClient();
	initMap();
	requestAndCreateContactsAndMarker(username);
}