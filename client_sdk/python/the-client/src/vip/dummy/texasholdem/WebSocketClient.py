import sys
import json

sys.path.append('./bean')
sys.path.append('./message')
sys.path.append('./message/data')
sys.path.append('./indication')
sys.path.append('./indication/data')
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
from ActionData import ActionData
from BetData import BetData
from DealData import DealData
from GameOverData import GameOverData
from NewRoundData import NewRoundData
from RoundEndData import RoundEndData
from ShowActionData import ShowActionData
from StartReloadData import StartReloadData
from ActionIndication import ActionIndication
from BetIndication import BetIndication
from DealIndication import DealIndication
from GameOverIndication import GameOverIndication
from NewPeerIndication import NewPeerIndication
from NewRoundIndication import NewRoundIndication
from RoundEndIndication import RoundEndIndication
from ShowActionIndication import ShowActionIndication
from StartReloadIndication import StartReloadIndication


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

    def onOpen(self, session):
        print ("Client WebSocket is opening...")
        self.session = session
        joinData = JoinData(self.credential.phoneNumber, self.credential.password, self.ticket)
        joinMessage = JoinMessage(joinData)
        joinString = json.loads(joinMessage)
        send(joinString)

    def onMessage(self, message):
        try:
            message = json.loads(message)
            eventName = message.eventName
            data = message.data
            if eventName == NEW_PEER:
                newPeerIndication = NewPeerIndication(data)
                playerAI.onNewPeer(newPeerIndication)
            elif eventName == NEW_ROUND:
                newRoundData = NewRoundData(data.table, data.players)
                newRoundIndication = NewRoundIndication(newRoundData)
                playerAI.onNewRound(newRoundIndication)
            elif eventName == START_RELOAD:
                startReloadData = StartReloadData(data.tableNumber, data.players)
                startReloadIndication = StartReloadIndication(startReloadData)
                playerAI.onNewRound(startReloadIndication)
            elif eventName == DEAL:
                dealData = DealData(data.table, data.players)
                dealIndication = DealIndication(dealData)
                playerAI.onNewRound(dealIndication)
            elif eventName == ACTION:
                actionData = ActionData(data.tableNumber, data.self, data.game)
                actionIndication = ActionIndication(actionData)
                playerAI.onNewRound(actionIndication)
            elif eventName == BET:
                betData = BetData(data.tableNumber, data.self, data.game)
                betIndication = BetIndication(betData)
                playerAI.onNewRound(betIndication)
            elif eventName == SHOW_ACTION:
                showActionData = ShowActionData(data.action, data.table, data.players)
                showActionIndication = ShowActionIndication(showActionData)
                playerAI.onNewRound(showActionIndication)
            elif eventName == ROUND_END:
                roundEndData = RoundEndData(data.table, data.players)
                roundEndIndication = RoundEndIndication(roundEndData)
                playerAI.onNewRound(roundEndIndication)
            elif eventName == GAME_OVER:
                gameOverData = GameOverData(data.table, data.players, data.winners)
                gameOverIndication = GameOverIndication(gameOverData)
                playerAI.onNewRound(gameOverIndication)

        except Exception, e:
            print e.message

    def send(self, message):
        self.session.send(message)
