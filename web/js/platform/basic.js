/**
 * Created by dummy-team
 * 2017-10-12
 */

var playerID = localStorage.getItem("phoneNumber");

function setGame() {
    $('#goto_game_dialog').modal();
}

function createGame() {
    $.ajax({
        url: '/api/board/create_board',
        type: 'POST',
        dataType: 'json',
        data: {
            creator: playerID,
            gameName: "texas_holdem"
        },
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                var board = response.entity;
            } else if (response.status.code === 1) {
                console.log('create board failed');
            }
            onBoardCreated(board);
        },
        error: function () {
            console.log('create board failed');
        }
    });
}

function onBoardCreated(board) {
    console.log("onBoardCreated : " + JSON.stringify(board));
    gotoGame(board.ticket);
}

function gotoGame(boardTicket) {
    var tableNumber = boardTicket;
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

    window.open('./game.html?tableNumber='+tableNumber+'&bgm='+bgm+'&sound='+sound+'&auto='+autoRestart+'&defaultChips='+defaultChips+
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
    var tableNumber = $('#play_ticket').val();
    if (null === playerName || null === tableNumber) {
        return;
    }
    joinGame(tableNumber, playerName);
}

function joinGame(tableNumber, playerName) {
    window.open('./game.html?table=' + tableNumber + '&name=' + playerName, '_blank');
    $('#play_player_name').val('');
    $('#goto_play_dialog').modal('hide');
}
