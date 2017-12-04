/**
 * created by dummy-team
 * 2017-12-04
 */

var BoardResponse = require('../responses/board_response.js');

var boardLogic = require('../work_units/board_logic.js');

exports.listBoards = function (req, res) {
    var conditions = req.body;

    console.log("list boards conditions = " + JSON.stringify(conditions));
    var boardResponse = new BoardResponse();
    boardLogic.listBoardsWorkUnit(conditions, function(listBoardsErr, boards) {
        boardResponse.status = listBoardsErr;
        boardResponse.entity = boards;
        res.send(boardResponse);
        res.end();
    });
};