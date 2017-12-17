/**
 * Created by Elsie
 * 2017-11-26
 */

var app = require('../dummy-the.js');
var gameService = require('../rest_services/game_service.js');


app.post("/api/board/list_boards", gameService.listBoards);
app.post("/api/board/create_board", gameService.createBoard);
app.post("/api/board/update_board", gameService.updateBoard);
app.post("/api/board/is_creator_board", gameService.isCreatorBoard);
