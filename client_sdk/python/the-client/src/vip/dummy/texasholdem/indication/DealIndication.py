from Indication import Indication


class DealIndication(Indication):
    def __init__(self, data):
        super(DealIndication, self).__init__("__deal")
        self.data = data