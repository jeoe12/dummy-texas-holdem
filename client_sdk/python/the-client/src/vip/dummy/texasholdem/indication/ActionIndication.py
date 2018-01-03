from Indication import Indication


class ActionIndication(Indication):
    def __init__(self, data):
        super(ActionIndication, self).__init__("__action")
        self.data = data
