class Message(object):
    def __init__(self, eventName):
        self.eventName = eventName

    def toJson(self):
        dict = {}
        dict.update(self.__dict__)
        return dict