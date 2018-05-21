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
        for (var i = 0; i < tables.length; i++) {
            tableHtml +=
                '<div class="panel panel-primary">' +
                    '<div class="panel-heading"><a style="text-decoration: none; cursor:hand; color: #FFFFFF" href="#" onclick="gotoMatch('+i+')"><h4><b>第 ' + tables[i].tableNumber + ' 桌<b></h4></a></div>' +
                    '<div class="panel-body" id="table_'+tables[i].tableNumber+'">' +
                    '</div>' +
                    '<div class="panel-footer">Ticket: '+tables[i].ticket+'&nbsp;&nbsp;Port: 8081</div>' +
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

function gotoMatch(tableIndex) {
    var table = tables[tableIndex];
    var hostName = 'localhost:8081';
    var gameURL = 'http://' + hostName + '/game.html?ticket='+table.ticket+
        '&port='+table.port+'&table='+table.tableNumber;
    window.open(gameURL);
}