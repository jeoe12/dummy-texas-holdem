from Indication import Indication


class NewPeerIndication(Indication):
    def __init__(self, data):
        super(NewPeerIndication, self).__init__("__new_peer")
        self.data = data