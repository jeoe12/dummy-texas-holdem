/**
 * Created by dummy-team
 * 2017-12-04
 */

require('../poem/configuration/constants');
var logger = require('../poem/logging/logger4js').helper;
var ErrorCode = require('../constants/error_code.js');
var errorCode = new ErrorCode();
var RequestSender = require('../poem/http/request.js');
var Map = require('../poem/mem/map.js');

var LIST_BOARDS_SERVICE = '/board/list_boards';

exports.listBoardsWorkUnit = function (conditions, callback) {
    // send HTTP request to engine server to list boards
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            LIST_BOARDS_SERVICE,
            queryParams);

    requestSender.sendPostRequest(conditions, function (listBoardsErr, boardsResponse) {
        logger.info("listBoards call responded : " + JSON.stringify(listBoardsErr) + ", " + JSON.stringify(boardsResponse));
        if (errorCode.SUCCESS.code === listBoardsErr &&
            JSON.parse(boardsResponse).status.code === errorCode.SUCCESS.code) {
            logger.info("list boards successfully");
            var boards = JSON.parse(boardsResponse).entity;
            logger.info("response of boards = " + JSON.stringify(boards));
            callback(errorCode.SUCCESS, boards);
        } else {
            logger.error("list boards failed");
            callback(errorCode.FAILED, null);
        }
    });
};
