from Indication import Indication


class StartReloadIndication(Indication):
    def __init__(self, data):
        super(StartReloadIndication, self).__init__("__start_reload")
        self.data = data