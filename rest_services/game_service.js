/**
 * created by dummy-team
 * 2017-12-05
 */

var BoardResponse = require('../responses/board_response.js');
var BoolResponse = require('../responses/bool_response.js');
var PlayerResponse = require('../responses/player_response.js');

var boardLogic = require('../work_units/board_logic.js');
var playerLogic = require('../work_units/player_logic.js');

exports.listActiveBoards = function (req, res) {
    var gameName = req.body.gameName;
    var from = req.body.from || 0;
    var count = req.body.count || 12;
    var searchName = req.body.searchName;
    var phoneNumber = req.headers["phone-number"];
    var token = req.headers["token"];

    var boardResponse = new BoardResponse();
    boardLogic.listActiveBoardsWorkUnit(gameName, phoneNumber, token, from, count, searchName, function(listBoardsErr, boards) {
        boardResponse.status = listBoardsErr;
        boardResponse.entity = boards;
        res.send(boardResponse);
        res.end();
    });
};

exports.createBoard = function (req, res) {
    var gameName = req.body.gameName;
    var phoneNumber = req.body.phoneNumber || req.headers["phone-number"];
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

exports.isCreatorBoard = function (req, res) {
    var ticket = req.body.ticket;
    var phoneNumber = req.headers["phone-number"];
    var token = req.headers["token"];

    var boolResponse = new BoolResponse();
    boardLogic.isCreatorBoardWorkUnit(ticket, phoneNumber, token, function(isCreatorBoardErr, result) {
        boolResponse.status = isCreatorBoardErr;
        boolResponse.entity = result;
        res.send(boolResponse);
        res.end();
    });
};

exports.getPlayerByToken = function (req, res) {
    var phoneNumber = req.headers["phone-number"];
    var token = req.headers["token"] || req.body.token;

    var playerResponse = new PlayerResponse();

    playerLogic.getPlayerByTokenWorkUnit(phoneNumber, token, function(getPlayerErr, player) {
        playerResponse.status = getPlayerErr;
        playerResponse.entity = player;
        res.send(playerResponse);
        res.end();
    });
};
