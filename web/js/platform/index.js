/**
 * Created by dummy-team
 * 2017-10-12
 */

var STATUS_READY = 0;
var STATUS_PLAYING = 1;
var STATUS_OVER = 2;

$(document).ready(function () {
    // get phoneNumber and token
    phoneNumber = getParameter('phoneNumber') || localStorage.getItem('phoneNumber');
    token = getParameter('token') || localStorage.getItem('token');
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('token', token);

    // get board list
    listTheBoards();
});

function listTheBoards() {
    $.ajax({
        url: '/api/board/list_active_boards',
        headers: {"phone-number": phoneNumber, "token": token},
        type: 'POST',
        dataType: 'json',
        data: {
            status: 0,
            gameName: "texas_holdem"
        },
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                fullBoardList = response.entity;
                onTheBoardsListed();
            } else {
                console.log('list boards failed');
            }
        },
        error: function () {
            console.log('list boards failed');
        }
    });
}

function onTheBoardsListed() {
    var columnInRow = 3;
    if (null !== fullBoardList) {
        document.getElementById('board_list').innerHTML = '';
        var boardListContent = '';
        var i = 0;
        for (i = 0; i < fullBoardList.length; i++) {
            if (i % 3 === 0) {
                boardListContent += '<div class="row">';
            }
            var status = fullBoardList[i].status;
            var statusStr = '';
            var statusStyle = '';
            if (STATUS_READY === parseInt(status)) {
                statusStr = '准备中';
                statusStyle = 'game-ready';
            } else if (STATUS_PLAYING === parseInt(status)) {
                statusStr = '进行中';
                statusStyle = 'game-playing';
            }

            boardListContent += '<div class="game-div col-md-4 div-bg-img" onclick="onJoin(' + i + ');">\n' +
                '<div class="game-status ' + statusStyle + '">' + statusStr + '</div>\n' +
                '<div class="game-creator">' + fullBoardList[i].creatorName + '</div>\n' +
                '</div>';

            if (i % 3 === 2) {
                boardListContent += '</div>';
            }
        }
        if (i % 3 !== 0) {
            boardListContent += "</div>";
        }

        $('#board_list').append(boardListContent);
    }
}

function onJoin(boardIndex) {
    currentBoardIndex = boardIndex;
    currentBoard = fullBoardList[currentBoardIndex];
    $('#info_creator_name').html('创建者: ' + currentBoard.creatorName);
    $('#info_create_time').html(currentBoard.createTime);
    var playerInfo = currentBoard.currentPlayer.length + '人 - ';
    if (STATUS_READY === parseInt(currentBoard.status)) {
        playerInfo += '准备中';
    } else if (STATUS_PLAYING === parseInt(currentBoard.status)) {
        playerInfo += '进行中';
    }
    $('#info_players').html(playerInfo);
    $('#join_game_dialog').modal();
}

function joinLive() {
    // TODO： to remember these settings in board
    var bgm = 1;
    var sound = 1;
    var autoRestart = 0;

    window.open('./game.html?ticket='+currentBoard.ticket+'&bgm='+bgm+'&sound='+sound+'&auto='+autoRestart,
        '_blank');
    $('#join_game_dialog').modal('hide');
}
