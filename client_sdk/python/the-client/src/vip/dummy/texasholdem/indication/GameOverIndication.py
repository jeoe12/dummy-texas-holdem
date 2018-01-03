from Indication import Indication


class GameOverIndication(Indication):
    def __init__(self, data):
        super(GameOverIndication, self).__init__("__game_over")
        self.data = data