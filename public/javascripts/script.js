"use strict";

function showPassword(checkId, formId) {
    if (document.getElementById(checkId).checked) {
        document.getElementById(formId).type="text";
    } else {
        document.getElementById(formId).type="password";
    }
}