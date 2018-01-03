from Indication import Indication


class RoundEndIndication(Indication):
    def __init__(self, data):
        super(RoundEndIndication, self).__init__("__round_end")
        self.data = data