function deleteContactsFromClient(){
    const myNode = document.getElementById("displayedContacts");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}