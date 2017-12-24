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
                var boardList = response.entity;
                onTheBoardsListed(boardList);
            } else {
                console.log('list boards failed');
            }
        },
        error: function () {
            console.log('list boards failed');
        }
    });
}

function onTheBoardsListed(boardList) {
    var columnInRow = 3;
    if (null !== boardList) {
        document.getElementById('board_list').innerHTML = '';
        var boardListContent = '';
        for (var i = 0; i < boardList.length; i++) {
            if (i % 3 === 0) {
                boardListContent += '<div class="row">';
            }
            var status = boardList[i].status;
            var statusStr = '';
            var statusStyle = '';
            if (STATUS_READY === parseInt(status)) {
                statusStr = '准备中';
                statusStyle = 'game-ready';
            } else if (STATUS_PLAYING === parseInt(status)) {
                statusStr = '进行中';
                statusStyle = 'game-playing';
            }

            boardListContent += '<div class="col-md-4 div-bg-img" onclick="joinLive(\'' + boardList[i].ticket + '\');">\n' +
                '<div class="game-status ' + statusStyle + '">' + statusStr + '</div>\n' +
                '<div class="game-creator">' + boardList[i].creatorName + '</div>\n' +
                '</div>';
        }
        boardListContent += "</div>";
        $('#board_list').append(boardListContent);
    }
}

function joinLive(ticket) {
    // TODO： to remember these settings in board
    var bgm = 1;
    var sound = 1;
    var autoRestart = 0;

    window.open('./game.html?ticket='+ticket+'&bgm='+bgm+'&sound='+sound+'&auto='+autoRestart,
        '_blank');
    $('#goto_game_dialog').modal('hide');
}
