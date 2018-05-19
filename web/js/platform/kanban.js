/**
 * Created by dummy-team
 * 2018-05-16
 */

var tables = [];

$(document).ready(function () {
    $('#dialogs').load('dialogs.html');
    validateSignIn();
    listTheKanban();
});

function listTheKanban() {
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
        // create table dom
        $('#kanban_list').html('');
        var tableHtml = '';
        console.log('table length = ' + tables.length);
        for (var i = 0; i < tables.length; i++) {
            tableHtml +=
                '<div class="panel panel-default">' +
                    '<div class="panel-heading"> <h4>第 ' + tables[i].tableNumber + ' 桌</h4> </div>' +
                    '<div class="panel-body" id="table_'+tables[i].tableNumber+'">' +
                    '</div>' +
                '</div>';
        }
        $('#kanban_list').html(tableHtml);
        // list contestants for each table
        for (var i = 0; i < tables.length; i++) {
            listContestants(tables[i].tableNumber);
        }

    } else {
        toastr.info("暂时没有数据");
        $('#kanban_empty').show();
        $('#kanban_list').hide();
    }
}

function listContestants(tableNumber) {
    $.ajax({
        url: '/api/players/get_kanban_contestants?table_number='+tableNumber,
        headers: {"phone-number": phoneNumber, "token": token},
        type: 'GET',
        dataType: 'json',
        timeout: 20000,
        success: function (response) {
            if (response.status.code === 0) {
                var kanbanContestants = response.entity;
                if (null === kanbanContestants ||
                    null === kanbanContestants.contestants || 0 === kanbanContestants.contestants.length) {
                    onContestantsListed(false, null);
                } else {
                    onContestantsListed(true, kanbanContestants);
                }
            } else {
                onContestantsListed(false, null);
            }
        },
        error: function () {
            onContestantsListed(false, null);
        }
    });
}

function onContestantsListed(success, kanbanContestants) {
    if (success) {
        var tableNumber = kanbanContestants.tableNumber;
        var contestants = kanbanContestants.contestants;
        var tableHtml = 
            '<table class="table table-striped table-bordered">' +
                '<thead>' +
                '<tr>' +
                    '<td>姓名</td>' +
                    '<td>AI</td>' +
                    '<td>学校</td>' +
                    '<td>活跃度</td>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';
        for (var i = 0; i < contestants.length; i++) {
            var contestant = contestants[i];
            tableHtml +=
                '<tr>' +
                '<td>' + contestant.studentName + '</td>' +
                '<td>' + contestant.name + '</td>' +
                '<td>' + contestant.university + '</td>' +
                '<td>' + contestant.activeStats + '</td>' +
                '</tr>';
        }
        tableHtml +=
                '</tbody>' +
                '</table>';
        $('#table_'+tableNumber).html(tableHtml);
    } else {
        console.log("list kanbanContestants failed");
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
