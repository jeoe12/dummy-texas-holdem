/**
 * Created by dummy-team
 * 2018-05-16
 */

var tables = [];
var adminPassword = '';

$(document).ready(function () {
    adminPassword = getParameter('password');
    $('#dialogs').load('dialogs.html');
    validateSignIn();
    listTheKanban();
});

function fetchPasscode() {
    phoneNumber = localStorage.getItem('phoneNumber');
    token = localStorage.getItem('token');

    if (null === phoneNumber || null === token) {
        toastr.error('您并没有登录，请返回主页并登录重试');
        return;
    }
    $.ajax({
        url: '/api/players/fetch_passcode',
        headers: {'phone-number': phoneNumber, 'token': token},
        type: 'POST',
        data: JSON.stringify({phoneNumber: phoneNumber}),
        contentType: 'application/json; charset=utf-8',
        timeout: 20000,
        success: function(response) {
            if (response.status.code === 0) {
                toastr.success('已确认参赛并已发送参赛用密码');
            } else if (response.status.code === -3) {
                toastr.error('您并没有登录，请返回主页并登录重试');
            } else if (response.status.code === -9) {
                toastr.error('已超过获取密码次数限制3次，如果遗失密码，请联系主办方工作人员');
            } else if (response.status.code === -10) {
                toastr.error('对不起，由于您在热身赛中并不活跃，所以并未能入选正式比赛');
            } else {
                toastr.error('消息发送失败，请确认已经登录，并重试');
            }
        },
        error: function() {
            toastr.error('消息发送失败，请确认已经登录，并重试');
        }
    });
}

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
        url: '/api/players/get_kanban_contestants?table_number='+tableNumber+'&password='+adminPassword,
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
            '<td>学校</td>';
        if (adminPassword) {
            tableHtml +=
                '<td>活跃度</td>' +
                '<td>手机号码</td>' +
                '<td>passcode</td>' +
                '<td>是否确认</td>';
        }
        tableHtml +=
            '</tr>' +
            '</thead>' +
            '<tbody>';
        for (var i = 0; i < contestants.length; i++) {
            var contestant = contestants[i];
            // TODO: add buttons for sms fetch and ack
            tableHtml +=
                '<tr>' +
                '<td>' + contestant.studentName + '</td>' +
                '<td>' + contestant.name + '</td>' +
                '<td>' + contestant.university + '</td>';
            if (adminPassword) {
                var isConfirmed = (contestant.passcodeFetched) ? 'yes' : 'no';
                tableHtml +=
                    '<td>' + contestant.activeStats + '</td>' +
                    '<td>' + contestant.phoneNumber + '</td>' +
                    '<td>' + contestant.passwordPlain + '</td>' +
                    '<td>' + isConfirmed + '</td>';
            }
            tableHtml += '</tr>';
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
    var hostName = '47.97.21.103:' + table.port;
    var gameURL = 'http://' + hostName + '/game.html?ticket='+table.ticket+
        '&port='+table.port+'&table='+table.tableNumber;
    window.open(gameURL);
}