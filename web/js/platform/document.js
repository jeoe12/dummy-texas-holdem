/**
 * Created by dummy-team
 * 2017-09-20
 */

$(document).ready(function () {
    $('#dialogs').load('dialogs.html');
    validateSignIn();
});

function createDummy() {
    var ticket = $('#ticket').val();
    var port = $('#port').val();

    if ("" === ticket || "" === port) {
        return;
    }

    var hostName = window.location.hostname + ':' + window.location.port;
    var dummyURL = 'http://' + hostName + '/dummy.html?ticket='+ticket+'&port='+port;
    window.open(dummyURL);

    $('#ticket').val('');
    $('#port').val('');
}

function hashName() {
    var playerName = $('#hash_name_in').val();
    var digest = md5(playerName);
    $('#hash_name_out').val(digest);
}
