"use strict";

function showPassword(checkId, formId) {
    if (document.getElementById(checkId).checked) {
        document.getElementById(formId).type="text";
    } else {
        document.getElementById(formId).type="password";
    }
}

function load() {
	var parent = document.getElementById('container1');
	var child = document.getElementById('container2');
	child.style.padding = child.offsetWidth - child.clientWidth + "px";
}