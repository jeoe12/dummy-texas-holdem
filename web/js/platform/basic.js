/**
 * Created by dummy-team
 * 2017-10-12
 */
var phoneNumber;
var token;

// global board information
var fullBoardList = [];
var currentBoardIndex = 0;
var currentBoard = null;

function setBoard() {
    $('#goto_game_dialog').modal();
}

function createBoard() {
    $.ajax({
        url: '/api/board/create_board',
        headers: {"phone-number": phoneNumber, "token": token},
        type: 'POST',
        dataType: 'json',
        data: {
            gameName: "texas_holdem",
            phoneNumber: phoneNumber
        },
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                var board = response.entity;
                onBoardCreated(board);
            } else if (response.status.code === 1) {
                console.log('create board failed : ' + JSON.stringify(response.entity));
                if (response.entity.ticket) {
                    gotoGame(response.entity.ticket);
                }
            }
        },
        error: function () {
            console.log('create board failed');
        }
    });
}

function onBoardCreated(board) {
    gotoGame(board.ticket);
}

function gotoGame(boardTicket) {
    var ticket = boardTicket;
    var defaultChips = $('#game_default_chips').val();
    var defaultSb = $('#game_default_sb').val();
    var defaultRoundInterval = $('#game_round_interval').val();
    var defaultCommandInterval = $('#game_command_interval').val();
    var defaultCommandTimeout = $('#game_command_timeout').val();
    var defaultLostTimeout = $('#game_lost_timeout').val();
    var reloadChance = $('#game_reload_chance').val();
    var bgm = $('#game_bgm').is(':checked') ? 1 : 0;
    var sound = $('#game_sound').is(':checked') ? 1 : 0;
    var autoRestart = $('#auto_restart').is(':checked') ? 1 : 0;

    window.open('./game.html?phoneNumber='+phoneNumber+'&token='+token+'&ticket='+ticket+
        '&bgm='+bgm+'&sound='+sound+'&auto='+autoRestart+'&defaultChips='+defaultChips+
        '&defaultSb='+defaultSb+'&roundInterval='+defaultRoundInterval+'&commandInterval='+defaultCommandInterval+
        '&reloadChance='+reloadChance+'&commandTimeout='+defaultCommandTimeout+'&lostTimeout='+defaultLostTimeout,
        '_blank');
    $('#goto_game_dialog').modal('hide');

}

function popUpHintDialog(hint) {
    $("#text_hint").empty();
    $("#text_hint").append(hint);
    $("#hint_dialog").modal();
}