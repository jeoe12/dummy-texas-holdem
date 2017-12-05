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
        url: '/board/list_boards',
        headers: {"phone-number": "18652006398", "token": "2f690654cd163a7c7cb9ec2f42f01318"},
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
