

class Action():
    def __init__(self,action,playerName,amount,chips):
        self.action = action
        self.playerName = playerName
        self.amount = amount
        self.chips = chips


if __name__ == '__main__':
    test = Action("call","yang","10","20")
    print(test.action)
    print(test.amount)
