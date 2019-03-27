"use strict";

function showPassword() {
    if (document.getElementById('viewPassword').checked) {
        document.getElementById('wifiPassword').type="text";
    } else {
        document.getElementById('wifiPassword').type="password";
    }
}