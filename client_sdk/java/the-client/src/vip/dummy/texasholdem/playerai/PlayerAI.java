package vip.dummy.texasholdem.playerai;

import vip.dummy.texasholdem.IndicationCallbacks;
import vip.dummy.texasholdem.WebSocketClient;
import vip.dummy.texasholdem.indication.*;
import vip.dummy.texasholdem.message.ActionMessage;
import vip.dummy.texasholdem.message.ReloadMessage;
import vip.dummy.texasholdem.message.data.ActionData;
import vip.dummy.texasholdem.message.data.ReloadData;

public class PlayerAI implements IndicationCallbacks {

    private static PlayerAI playerAI;

    private WebSocketClient webSocketClient;

    public PlayerAI(WebSocketClient webSocketClient) {
        this.webSocketClient = webSocketClient;
    }

    /**
     * This is the critical method would be implemented by player AI
     * @return
     */
    public void nextStep() {
        allIn();
    }

    /**
     *  TexasHoldem actions
     */
    public void reload() {
        ReloadMessage reloadMessage = new ReloadMessage(new ReloadData());
        webSocketClient.send(reloadMessage);
    }

    public void call() {
        ActionMessage actionMessage = new ActionMessage(new ActionData("call", 0));
        webSocketClient.send(actionMessage);
    }

    public void raise() {
        ActionMessage actionMessage = new ActionMessage(new ActionData("raise", 0));
        webSocketClient.send(actionMessage);
    }

    public void fold() {
        ActionMessage actionMessage = new ActionMessage(new ActionData("fold", 0));
        webSocketClient.send(actionMessage);
    }

    public void check() {
        ActionMessage actionMessage = new ActionMessage(new ActionData("check", 0));
        webSocketClient.send(actionMessage);
    }

    public void bet(int amount) {
        ActionMessage actionMessage = new ActionMessage(new ActionData("bet", amount));
        webSocketClient.send(actionMessage);
    }

    public void allIn() {
        ActionMessage actionMessage = new ActionMessage(new ActionData("allin", 0));
        webSocketClient.send(actionMessage);
    }

    /**
     * TexasHoldem indications
     */
    @Override
    public void onNewPeer(NewPeerIndication newPeerIndication) {

    }

    @Override
    public void onNewRound(NewRoundIndication newRoundIndication) {

    }

    @Override
    public void onStartReload(StartReloadIndication startReloadIndication) {

    }

    @Override
    public void onDeal(DealIndication dealIndication) {

    }

    @Override
    public void onAction(ActionIndication actionIndication) {
        nextStep();
    }

    @Override
    public void onBet(BetIndication betIndication) {
        nextStep();
    }

    @Override
    public void onShowAction(ShowActionIndication showActionIndication) {

    }

    @Override
    public void onRoundEnd(RoundEndIndication roundEndIndication) {

    }

    @Override
    public void onGameOver(GameOverIndication gameOverIndication) {

    }
}
