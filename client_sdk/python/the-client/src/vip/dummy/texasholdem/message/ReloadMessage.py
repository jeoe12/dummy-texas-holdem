from Message import Message

class ReloadMessage(Message):
    def __init__(self, data):
        super(ReloadMessage, self).__init__("__reload")
        self.data = data