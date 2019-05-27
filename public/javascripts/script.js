"use strict";

function showPassword(checkId, formId) {
    if (document.getElementById(checkId).checked) {
        document.getElementById(formId).type="text";
    } else {
        document.getElementById(formId).type="password";
    }
}

function search() {
	let searchForm = document.getElementById("search");
	searchForm.action = "/cafes/" + document.getElementsByName("cafeName")[0].value;
}