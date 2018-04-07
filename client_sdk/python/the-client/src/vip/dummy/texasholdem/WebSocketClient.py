# -*- coding: utf-8 -*-
import sys
import json
from argparse import Namespace

sys.path.append('./bean')
sys.path.append('./message')
sys.path.append('./message/data')
sys.path.append('./indication')
sys.path.append('./indication/data')
sys.path.append('./playerai')
from Credential import Credential
from PlayerAI import PlayerAI
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

NEW_PEER = "__new_peer"
NEW_ROUND = "__new_round"
START_RELOAD = "__start_reload"
DEAL = "__deal"
ACTION = "__action"
BET = "__bet"
SHOW_ACTION = "__show_action"
ROUND_END = "__round_end"
GAME_OVER = "__game_over"


class WebSocketClient(IndicationCallbacks):
    def __init__(self, credential):
        self.credential = credential
        self.ticket = credential.ticket
        self.gameName = credential.gameName
        self.playerAI = PlayerAI(self)

    def convert_to_dict(self, obj):
        dict = {}
        dict.update(obj.__dict__)
        return dict

    def onOpen(self, session):
        print ("Client WebSocket is opening...")
        self.session = session
        joinData = JoinData(self.credential.phoneNumber, self.credential.password, self.ticket,self.gameName)
        joinMessage = JoinMessage(self.convert_to_dict(joinData))
        joinString = self.convert_to_dict(joinMessage)
        self.send(joinString)

    def onMessage(self, message):
        try:
            message = json.loads(message, object_hook=lambda d: Namespace(**d))  # 转成对象才能用属性访问
            eventName = message.eventName
            data = message.data
            if eventName == NEW_PEER:
                newPeerIndication = NewPeerIndication(data)
                self.playerAI.onNewPeer(newPeerIndication)
            elif eventName == NEW_ROUND:
                newRoundData = NewRoundData(data.table, data.players)
                newRoundIndication = NewRoundIndication(newRoundData)
                self.playerAI.onNewRound(newRoundIndication)
            elif eventName == START_RELOAD:
                startReloadData = StartReloadData(data.tableNumber, data.players)
                startReloadIndication = StartReloadIndication(startReloadData)
                self.playerAI.onNewRound(startReloadIndication)
            elif eventName == DEAL:
                dealData = DealData(data.table, data.players)
                dealIndication = DealIndication(dealData)
                self.playerAI.onNewRound(dealIndication)
            elif eventName == ACTION:
                actionData = ActionData(data.tableNumber, data.self, data.game)
                actionIndication = ActionIndication(actionData)
                self.playerAI.onNewRound(actionIndication)
            elif eventName == BET:
                betData = BetData(data.tableNumber, data.self, data.game)
                betIndication = BetIndication(betData)
                self.playerAI.onNewRound(betIndication)
            elif eventName == SHOW_ACTION:
                showActionData = ShowActionData(data.action, data.table, data.players)
                showActionIndication = ShowActionIndication(showActionData)
                self.playerAI.onNewRound(showActionIndication)
            elif eventName == ROUND_END:
                roundEndData = RoundEndData(data.table, data.players)
                roundEndIndication = RoundEndIndication(roundEndData)
                self.playerAI.onNewRound(roundEndIndication)
            elif eventName == GAME_OVER:
                gameOverData = GameOverData(data.table, data.players, data.winners)
                gameOverIndication = GameOverIndication(gameOverData)
                self.playerAI.onNewRound(gameOverIndication)

        except Exception, e:
            print e.message

    def send(self, message):
        self.session.send(json.dumps(message))
