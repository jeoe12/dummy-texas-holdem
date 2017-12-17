/**
 * Created by dummy-team
 * 2017-10-12
 */
var phoneNumber;
var token;

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
            gameName: "texas_holdem"
        },
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                var board = response.entity;
                onBoardCreated(board);
            } else {
                console.log('create board failed');
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

function setPlayer() {
    $('#goto_play_dialog').modal();
}

function gotoPlay() {
    var playerName = $('#play_player_name').val();
    // ticket of the board
    var ticket = $('#play_ticket').val();
    if (null === playerName || null === ticket) {
        return;
    }
    joinGame(ticket, playerName);
}

function joinGame(ticket, playerName) {
    window.open('./game.html?ticket=' + ticket + '&name=' + playerName, '_blank');
    $('#play_player_name').val('');
    $('#goto_play_dialog').modal('hide');
}
