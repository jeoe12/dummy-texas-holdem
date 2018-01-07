class Data(object):
    def toJson(self):
        dict = {}
        dict.update(self.__dict__)
        return dict