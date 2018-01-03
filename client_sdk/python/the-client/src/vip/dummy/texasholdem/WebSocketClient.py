import sys
import json
sys.path.append('./bean')
sys.path.append('./message')
sys.path.append('./message/data')
sys.path.append('./indication')
sys.path.append('./indication/data')
sys.path.append('./indication')
sys.path.append('./playerai')
from IndicationCallbacks import IndicationCallbacks
from ReloadMessage import ReloadMessage
from ReloadData import ReloadData
from ActionMessage import ActionMessage
from ActionData import ActionData
from JoinMessage import JoinMessage
from JoinData import JoinData
from PlayerAI import PlayerAI
from Indication import Indication

class WebSocketClient(IndicationCallbacks):
    NEW_PEER = "__new_peer"
    NEW_ROUND = "__new_round"
    START_RELOAD = "__start_reload"
    DEAL = "__deal"
    ACTION = "__action"
    BET = "__bet"
    SHOW_ACTION = "__show_action"
    ROUND_END = "__round_end"
    GAME_OVER = "__game_over"

    def __init__(self, credential, ticket):
        self.credential = credential
        self.ticket = ticket
        self.playerAI = PlayerAI(self)


    def onOpen(self,session):
        print ("Client WebSocket is opening...")
        self.session = session
        joinData = JoinData(self.credential.phoneNumber, self.credential.password, self.ticket)
        joinMessage = JoinMessage(joinData)
        joinString = json.loads(joinMessage)
        send(joinString)

    def onMessage(self,message):
        try:
            message = json.loads(message)
            eventName = message.eventName
            if eventName == NEW_PEER:
                newPeerIndication = NewPeerIndication(message.data)
                playerAI.onNewPeer(newPeerIndication)
            elif eventName == NEW_ROUND:
                newRoundIndication = NewRoundIndication(message.data)
                playerAI.onNewRound(newRoundIndication)

        except Exception, e:
            print e.message