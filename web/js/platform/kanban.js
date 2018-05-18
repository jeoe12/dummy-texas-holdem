/**
 * Created by dummy-team
 * 2018-04-16
 */

var tempFrom = 0;
var from = 0;
var count = 12;
var tables;

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
    $.ajax({
        url: '/api/board/list_match_tables',
        headers: {"phone-number": phoneNumber, "token": token},
        type: 'GET',
        dataType: 'json',
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                tables = response.entity;
                if (null === tables || 0 === tables.length) {
                    onKanbanListed(false);
                } else {
                    onKanbanListed(true);
                }
            } else {
                onKanbanListed(false);
            }
        },
        error: function () {
            onKanbanListed(false);
        }
    });
}

function onKanbanListed(success) {
    if (success) {
        $('#kanban_empty').hide();
        $('#kanban_list').show();
        // list contestants for each table
        for (var i = 0; i < tables.length; i++) {
            listContestants(table[i].tableNumber);
        }

    } else {
        toastr.info("暂时没有数据");
        $('#kanban_empty').show();
        $('#kanban_list').hide();
    }
}

function listContestants(tableNumber) {
    $.ajax({
        url: '/api/players/get_contestants?table_number='+tableNumber,
        headers: {"phone-number": phoneNumber, "token": token},
        type: 'GET',
        dataType: 'json',
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                tables = response.entity;
                if (null === tables || 0 === tables.length) {
                    onKanbanListed(false);
                } else {
                    onKanbanListed(true);
                }
            } else {
                onKanbanListed(false);
            }
        },
        error: function () {
            onKanbanListed(false);
        }
    });
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
