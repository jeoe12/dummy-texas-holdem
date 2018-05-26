/**
 * Created by dummy-team
 * 2018-05-16
 */

var tables = [];
var adminPassword = '';

$(document).ready(function () {
    adminPassword = getParameter('password');
    $('#dialogs').load('dialogs.html');
    validateSignIn();
});