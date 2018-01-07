from Data import Data
class JoinData(Data):
    def __init__(self, phoneNumber, password, ticket,gameName):
        self.phoneNumber = phoneNumber
        self.password = password
        self.ticket = ticket
        self.gameName = gameName
