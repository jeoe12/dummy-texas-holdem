/**
 * Created by dummy-team
 * 2017-09-20
 */

$(document).ready(function () {
    phoneNumber = getParameter('phoneNumber') || localStorage.getItem('phoneNumber');
    token = getParameter('token') || localStorage.getItem('token');
    console.log("phoneNumber = " + phoneNumber + ", token = " + token);
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('token', token);
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
    window.open('./dummy.html?phoneNumber='+phoneNumber+'&password='+password+'&ticket='+ticket+'&port='+port, '_blank');

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