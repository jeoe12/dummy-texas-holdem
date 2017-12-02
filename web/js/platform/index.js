/**
 * Created by dummy-team
 * 2017-10-12
 */

$(document).ready(function () {
    // get board list
    listTheBoards();
});

function listTheBoards() {
    $.ajax({
        url: '/api/board/list_boards',
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
            } else if (response.status.code === 1) {
                console.log('list boards failed');
            }
            onTheBoardsListed(boardList);
        },
        error: function () {
            console.log('list boards failed');
        }
    });
}

function onTheBoardsListed(boardList) {
    if (null !== boardList) {
        document.getElementById('board_list').innerHTML = '';
        var boardListContent = '';
        for (var i = 0; i < boardList.length; i++) {
            boardListContent += '<div><a href="#" onclick="joinLive(\'' + boardList[i].ticket + '\');">' +
                boardList[i].ticket + '</a></div>'
        }
        $('#board_list').append(boardListContent);
    }
}

function joinLive(ticket) {
    console.log(ticket);
}
