class Indication():
    def __init__(self, eventName):
        self.eventName = eventName

    def convert_to_dict(self,obj):
        dict = {}
        dict.update(obj.__dict__)
        return dict
