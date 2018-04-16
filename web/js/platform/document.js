/**
 * Created by dummy-team
 * 2017-09-20
 */

$(document).ready(function () {
    $('#dialogs').load('dialogs.html');
    validateSignIn();
});

function createDummy() {
    var phoneNumber = $('#player_name').val();
    var password = $('#password').val();
    var ticket = $('#ticket').val();
    var port = $('#port').val();

    if (null === phoneNumber || "" === password || "" === ticket || "" === port) {
        return;
    }

    password = md5(password);
    var hostName = window.location.hostname + ':' + window.location.port;
    var dummyURL = 'http://' + hostName + '/dummy.html?phoneNumber='+phoneNumber+'&password='+password+
        '&ticket='+ticket+'&port='+port;
    window.open(dummyURL);

    $('#player_name').val('');
    $('#password').val('');
    $('#ticket').val('');
    $('#port').val('');
}

function hashName() {
    var playerName = $('#hash_name_in').val();
    var digest = md5(playerName);
    $('#hash_name_out').val(digest);
}
