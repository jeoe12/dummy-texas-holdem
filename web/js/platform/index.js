/**
 * Created by dummy-team
 * 2017-10-12
 */

var STATUS_READY = 0;
var STATUS_PLAYING = 1;
var STATUS_OVER = 2;

var tempFrom = 0;
var from = 0;
var count = 12;

$(document).ready(function () {
    // get phoneNumber and token
    phoneNumber = getParameter('phoneNumber') || localStorage.getItem('phoneNumber');
    token = getParameter('token') || localStorage.getItem('token');
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('token', token);

    tempFrom = from;
    // get board list
    listTheBoards();
});

function signOut() {
    $.ajax({
        url: '/api/players/sign_out',
        headers: {"phone-number": phoneNumber, "token": token},
        type: 'POST',
        dataType: 'json',
        data: {
            phoneNumber: phoneNumber,
            token: token
        },
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                onSignOut(true);
            } else {
                onSignOut(false);
            }
        },
        error: function () {
            onSignOut(false);
        }
    });
}

function prevPage() {
    if (0 === from) {
        toastr.info('已经是第一页');
    }
    tempFrom = from = from - 12;
    if (from < 0) {
        from = 0;
        tempFrom = 0;
    }
    listTheBoards();
}

function nextPage() {
    tempFrom = from + 12;
    listTheBoards();
}

function onSearch() {
    var searchName = $('#search_name').val();
    if (null == searchName || '' == searchName || searchName.length === 0) {
        toastr.error('请输入游戏创建者名称');
        return;
    }
    searchBoards(searchName);
}

function onTheBoardsSearched() {

}

function searchBoards(searchName) {
    $.ajax({
        url: '/api/board/list_active_boards',
        headers: {"phone-number": phoneNumber, "token": token},
        type: 'POST',
        dataType: 'json',
        data: {
            status: 0,
            gameName: "texas_holdem",
            searchName: searchName
        },
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                fullBoardList = response.entity;
                if (null === fullBoardList || 0 === fullBoardList.length) {
                    toastr.info("已经没有更多了");
                }
                onTheBoardsListed();
            } else {
                console.log('search boards failed');
                toastr.info("已经没有更多了");
                onTheBoardsListed();
            }
        },
        error: function () {
            console.log('search boards failed');
            toastr.info("已经没有更多了");
            onTheBoardsListed();
        }
    });
}

function listTheBoards() {
    $.ajax({
        url: '/api/board/list_active_boards',
        headers: {"phone-number": phoneNumber, "token": token},
        type: 'POST',
        dataType: 'json',
        data: {
            status: 0,
            gameName: "texas_holdem",
            from: tempFrom,
            count: count
        },
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                fullBoardList = response.entity;
                if (null === fullBoardList || 0 === fullBoardList.length) {
                    toastr.info("已经没有更多了");
                } else {
                    from = tempFrom;
                }
                onTheBoardsListed();
            } else {
                console.log('list boards failed');
                onTheBoardsListed();
            }
        },
        error: function () {
            console.log('list boards failed');
            onTheBoardsListed();
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

function onSignOut(success) {
    if (success) {
        toastr.success('注销成功');
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('token');
        console.log('back to index ' + window.location.host);
        window.location = window.location.host;
    } else {
        toastr.error('注销失败');
    }
}

// for live
function joinLive() {
    // TODO： to remember these settings in board
    var bgm = 1;
    var sound = 1;

    window.open('./game.html?ticket='+currentBoard.ticket+'&port='+currentBoard.port+'&bgm=1&sound=1',
        '_blank');
    $('#join_game_dialog').modal('hide');
}

// for human player
function joinGame() {
    // get player information at client side
    $.ajax({
        url: '/api/players/get_player_by_token',
        headers: {"phone-number": phoneNumber, "token": token},
        type: 'POST',
        dataType: 'json',
        data: {
            token: token
        },
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                var player = response.entity;
                window.open('./game.html?ticket='+currentBoard.ticket+'&port='+currentBoard.port+'&phoneNumber='+phoneNumber+'&token='+token+
                    '&password='+player.password+'&playerName='+player.name+'&bgm=1&sound=1&isHuman=true',
                    '_blank');
                $('#join_game_dialog').modal('hide');
            } else {
                console.log('player is not valid');
            }
        },
        error: function () {
            console.log('player is not valid');
        }
    });
}