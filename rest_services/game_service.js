/**
 * created by dummy-team
 * 2017-12-05
 */

var BoardResponse = require('../responses/board_response.js');

var boardLogic = require('../work_units/board_logic.js');

exports.listBoards = function (req, res) {
    var conditions = req.body;
    var phoneNumber = req.headers["phone-number"];
    var token = req.headers["token"];

    var boardResponse = new BoardResponse();
    boardLogic.listBoardsWorkUnit(conditions, phoneNumber, token, function(listBoardsErr, boards) {
        boardResponse.status = listBoardsErr;
        boardResponse.entity = boards;
        res.send(boardResponse);
        res.end();
    });
};

exports.createBoard = function (req, res) {
    var gameName = req.body.gameName;
    var phoneNumber = req.headers["phone-number"];
    var token = req.headers["token"];

    console.log("createBoardService entry");
    var boardResponse = new BoardResponse();
    boardLogic.createBoardWorkUnit(gameName, phoneNumber, token, function(createBoardsErr, board) {
        boardResponse.status = createBoardsErr;
        boardResponse.entity = board;
        res.send(boardResponse);
        res.end();
    });
};

exports.updateBoard = function (req, res) {
    var newBoard = req.body;
    var ticket = newBoard.ticket;
    var gameName = newBoard.gameName;
    var phoneNumber = req.headers["phone-number"];
    var token = req.headers["token"];

    var boardResponse = new BoardResponse();
    boardLogic.updateBoardsWorkUnit(ticket, gameName, newBoard, phoneNumber, token, function(createBoardsErr, board) {
        boardResponse.status = createBoardsErr;
        boardResponse.entity = board;
        res.send(boardResponse);
        res.end();
    });
};
