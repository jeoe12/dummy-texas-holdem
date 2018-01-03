from Message import Message

class JoinMessage(Message):
    def __init__(self, data):
        super(JoinMessage, self).__init__("__join")
        self.data = data