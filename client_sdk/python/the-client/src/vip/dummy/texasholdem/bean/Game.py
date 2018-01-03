

class Game():
    def __init__(self, smallBlind, bigBlind, board, raiseCount,
                 betCount, roundName, players):
        self.smallBlind = smallBlind
        self.bigBlind = bigBlind
        self.board = board
        self.raiseCount = raiseCount
        self.betCount = betCount
        self.roundName = roundName
        self.players = players
