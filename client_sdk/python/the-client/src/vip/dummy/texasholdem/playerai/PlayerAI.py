import sys
sys.path.append('../')
sys.path.append('../message')
sys.path.append('../message/data')
from IndicationCallbacks import IndicationCallbacks
from ReloadMessage import ReloadMessage
from ReloadData import ReloadData
from ActionMessage import ActionMessage
from ActionData import ActionData

class PlayerAI(IndicationCallbacks):
    def __init__(self, webSocketClient):
        self.webSocketClient = webSocketClient

    def nextStep(self):
        self.allIn()

    def Reload(self):
        reloadMessage = ReloadMessage(ReloadData())
        self.webSocketClient.send(reloadMessage.toJson())

    def Call(self):
        actionMessage = ActionMessage(ActionData("call", 0))
        self.webSocketClient.send(actionMessage.toJson())

    def Raise(self):
        actionMessage = ActionMessage(ActionData("raise", 0))
        self.webSocketClient.send(actionMessage.toJson())

    def Fold(self):
        actionMessage = ActionMessage(ActionData("fold", 0))
        self.webSocketClient.send(actionMessage.toJson())

    def Check(self):
        actionMessage = ActionMessage(ActionData("check", 0))
        self.webSocketClient.send(actionMessage.toJson())

    def Bet(self,amount):
        actionMessage = ActionMessage(ActionData("bet", amount))
        self.webSocketClient.send(actionMessage.toJson())

    def AllIn(self):
        actionMessage = ActionMessage(ActionData("allin", 0))
        self.webSocketClient.send(actionMessage.toJson())

    def onNewPeer(newPeerIndication):
        print("new peer")

    def onNewRound(newRoundIndication):
        print("<< on new round")

    def onStartReload(startReloadIndication):
        print("<< on reload indication")

    def onDeal(dealIndication):
        print("<< on deal")

    def onAction(actionIndication):
        print("<< on action")

    def onBet(betIndication):
        print("<< on bet")

    def onShowAction(showActionIndication):
        print("<< on show action")

    def onRoundEnd(roundEndIndication):
        print("<< on round end")

    def onGameOver(gameOverIndication):
        print("<< on game over")


if __name__=="__main__":
    test = None
    if test.strip() == '':
         print "test"