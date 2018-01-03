from Indication import Indication


class NewRoundIndication(Indication):
    def __init__(self, data):
        super(NewRoundIndication, self).__init__("__new_round")
        self.data = data


