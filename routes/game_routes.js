/**
 * Created by Elsie
 * 2017-11-26
 */

var app = require('../dummy-the.js');
var gameService = require('../rest_services/game_service.js');


app.post("/board/list_boards", gameService.listBoards);
// app.post("/board/create_board", gameService.createBoard);
// app.post("/board/update_board", gameService.updateBoard);
