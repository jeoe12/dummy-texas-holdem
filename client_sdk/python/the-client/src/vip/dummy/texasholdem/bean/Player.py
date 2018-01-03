
class Player():
    def __init__(self, playerName, chips, folded, allIn, isSurvive,
                 reloadCount,roundBet,bet, cards):
        self.playerName = playerName
        self.chips = chips
        self.folded = folded
        self.allIn = allIn
        self.isSurvive = isSurvive
        self.reloadCount = reloadCount
        self.roundBet = roundBet
        self.bet = bet
        self.cards = cards