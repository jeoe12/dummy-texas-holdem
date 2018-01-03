from Message import Message

class ActionMessage(Message):
    def __init__(self, data):
        super(ActionMessage, self).__init__("__action")
        self.data = data