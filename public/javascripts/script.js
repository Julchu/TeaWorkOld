"use strict";

function showPassword() {
    if (document.getElementById('viewPassword').checked) {
        document.getElementById('WifiPassword').type="text";
    } else {
        document.getElementById('WifiPassword').type="password";
    }
}

// HTML side: script(src="../public/javascripts/script.js")