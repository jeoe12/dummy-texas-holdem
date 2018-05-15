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
    listTheKanban();
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
    listTheKanban();
}

function nextPage() {
    tempFrom = from + 12;
    listTheKanban();
}

function onSearch() {
    var searchName = $('#search_name').val();
    if (isEmpty(searchName)) {
        toastr.error('请输入参赛者名称');
        return;
    }
    searchKnaban(searchName);
}

function searchKnaban(searchName) {
    $('#search_name').val('');
}

function listTheKanban() {
    $('#search_name').val('');
}

function onKanbanListed() {
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

}

// for live
function joinLive(canJoinLive, player) {
    if (canJoinLive && player) {
        var hostName = window.location.hostname + ':' + window.location.port;
        var gameURL = 'http://' + hostName + '/game.html?ticket='+currentBoard.ticket+'&port='+currentBoard.port+'&bgm=1&sound=1';
        window.open(gameURL);
        $('#join_game_dialog').modal('hide');
    } else {
        toastr.warning('请先登录之后再观看比赛');
        $('#goto_game_dialog').modal('hide');
        $('#signin_dialog').modal();
    }
}
