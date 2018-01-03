import json

class Message():
    def __init__(self, eventName):
        self.eventName = eventName

    def toJson(self):
        return json.dumps(self)