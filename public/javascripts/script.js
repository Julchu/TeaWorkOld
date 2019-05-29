"use strict";

function showPassword(checkId, passwordId) {
    if (document.getElementById(checkId).checked) {
        document.getElementById(passwordId).type="text";
    } else {
        document.getElementById(passwordId).type="password";
    }
}

function search() {
	let searchForm = document.getElementById("search");
	searchForm.action = "/cafes/" + document.getElementsByName("cafeName")[0].value;
}