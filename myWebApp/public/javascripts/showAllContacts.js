function showAllContacts(){
	allContactsAredisplayed = true;
	deleteContactsFromClient();
	initMap();
	requestAndCreateContactsAndMarker("all");
}