/**
 * Created by dummy-team
 * 2018-04-16
 */

var tempFrom = 0;
var from = 0;
var count = 12;

$(document).ready(function () {
    $('#dialogs').load('dialogs.html');
    validateSignIn();
    listTheBoards();
});

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
    if (isEmpty(searchName)) {
        toastr.error('请输入游戏创建者名称');
        return;
    }
    searchBoards(searchName);
}

function searchBoards(searchName) {
    $('#search_name').val('');
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
    $('#search_name').val('');
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
            if (i % columnInRow === 0) {
                boardListContent += '<div class="row">';
            }
            var status = fullBoardList[i].status;
            var statusStr = '';
            var statusStyle = '';
            if (STATUS_READY === parseInt(status)) {
                statusStr = '准备中';
                statusStyle = 'game-ready';
            } else if (STATUS_PREPARING === parseInt(status)) {
                statusStr = '启动中';
                statusStyle = 'game-playing';
            } else if (STATUS_RUNNING === parseInt(status)) {
                statusStr = '进行中';
                statusStyle = 'game-playing';
            } else if (STATUS_FINISHED === parseInt(status)) {
                statusStr = '已结束';
                statusStyle = 'game-ready';
            } else if (STATUS_ENDED === parseInt(status)) {
                statusStr = '已关闭';
                statusStyle = 'game-ready';
            } else {
                statusStr = ' ';
                statusStyle = 'game-ready';
            }

            boardListContent += '<div class="game-div col-md-4 div-bg-img" onclick="onJoin(' + i + ');">\n' +
                '<div class="game-status ' + statusStyle + '">' + statusStr + '</div>\n' +
                '<div class="game-creator">' + fullBoardList[i].creatorName + '</div>\n' +
                '</div>';

            if (i % columnInRow === 2) {
                boardListContent += '</div>';
            }
        }
        if (i % columnInRow !== 0) {
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
    var playerCount = 0;
    if (undefined === currentBoard.currentPlayer || null === currentBoard.currentPlayer) {
        playerCount = 0;
    } else {
        for (var i = 0; i < currentBoard.currentPlayer.length; i++) {
            if(currentBoard.currentPlayer[i].isOnline) {
                playerCount++;
            }
        }
    }

    var playerInfo = playerCount + '人 - ';
    if (STATUS_READY === parseInt(currentBoard.status)) {
        playerInfo += '准备中';
    } else if (STATUS_PREPARING === parseInt(currentBoard.status)) {
        playerInfo += '启动中';
    } else if (STATUS_RUNNING === parseInt(currentBoard.status)) {
        playerInfo += '进行中';
    } else if (STATUS_FINISHED === parseInt(currentBoard.status)) {
        playerInfo += '已结束';
    } else if (STATUS_ENDED === parseInt(currentBoard.status)) {
        playerInfo += '已关闭';
    } else {
        playerInfo += ' ';
    }
    $('#info_players').html(playerInfo);
    $('#join_game_dialog').modal();
}

// for live
function joinLive(canJoinLive, player) {
    if (canJoinLive && player) {
        var hostName = window.location.hostname + ':' + window.location.port;
        var gameURL = 'http://' + hostName + '/game.html?ticket='+currentBoard.ticket+'&port='+currentBoard.port+'&bgm=1&sound=1';
        window.open(gameURL);
        $('#join_game_dialog').modal('hide');
    } else {
        toastr.warning('请先登录之后再观看游戏');
        $('#goto_game_dialog').modal('hide');
        $('#signin_dialog').modal();
    }
}

// for human player
function joinGame(canJoinGame, player) {
    if (canJoinGame && player) {
        window.open('./game.html?ticket=' + currentBoard.ticket + '&port=' + currentBoard.port + '&phoneNumber=' + phoneNumber + '&token=' + token +
            '&password=' + password + '&playerName=' + player.name + '&bgm=1&sound=1&isHuman=true',
            '_blank');
        $('#join_game_dialog').modal('hide');
    } else {
        toastr.warning('请先登录之后再观看游戏');
        $('#goto_game_dialog').modal('hide');
        $('#signin_dialog').modal();
    }
}
