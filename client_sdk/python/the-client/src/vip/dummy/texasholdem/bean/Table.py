class Table():
    def __init__(self, tableName, roundName, board, roundCount,
                 raiseCount, betCount, totalBet, smallBlind, bigBlind):
        self.tableName = tableName
        self.roundName = roundName
        self.board = board
        self.roundCount = roundCount
        self.raiseCount = raiseCount
        self.betCount = betCount
        self.totalBet = totalBet
        self.smallBlind = smallBlind
        self.bigBlind = bigBlind
