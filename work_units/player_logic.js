/**
 * Created by dummy-team
 * 2017-12-29
 */

require('../poem/configuration/constants');
var logger = require('../poem/logging/logger4js').helper;
var ErrorCode = require('../constants/error_code.js');
var errorCode = new ErrorCode();
var RequestSender = require('../poem/http/request.js');
var Map = require('../poem/mem/map.js');

var GET_PLAYER_BY_TOKEN_SERVICE = '/players/get_player_by_token';

exports.getPlayerByTokenWorkUnit = function (phoneNumber, token, callback) {
    // send HTTP request to engine server to get player
    var queryParams = new Map();
    var requestSender =
        new RequestSender(APP_SERVER_ADDRESS,
            APP_SERVER_PORT,
            GET_PLAYER_BY_TOKEN_SERVICE,
            queryParams);
    var headers = {
        'Content-Type': 'application/json',
        'phone-number': phoneNumber,
        'token': token
    };

    var getPlayerParameters = {
        token: token
    };

    requestSender.sendPostRequest(getPlayerParameters, headers, function (getPlayerErr, playerResponse) {
        if (errorCode.SUCCESS.code === getPlayerErr &&
            JSON.parse(playerResponse).status.code === errorCode.SUCCESS.code) {
            logger.info("get player successfully");
            var player = JSON.parse(playerResponse).entity;
            logger.info("response of player = " + JSON.stringify(player));
            callback(errorCode.SUCCESS, player);
        } else {
            logger.error("get player failed");
            callback(errorCode.FAILED, null);
        }
    });
};