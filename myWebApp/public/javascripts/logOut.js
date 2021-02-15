function handleLogout () {
    username = "";
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace('/adviz');
};
