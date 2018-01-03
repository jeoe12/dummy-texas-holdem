from Indication import Indication


class ShowActionIndication(Indication):
    def __init__(self, data):
        super(ShowActionIndication, self).__init__("__show_action")
        self.data = data