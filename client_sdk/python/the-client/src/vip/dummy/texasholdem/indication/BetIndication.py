from Indication import Indication


class BetIndication(Indication):
    def __init__(self, data):
        super(BetIndication, self).__init__("__bet")
        self.data = data
