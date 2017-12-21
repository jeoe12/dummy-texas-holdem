package vip.dummy.texasholdem.playerai;

import vip.dummy.texasholdem.IndicationCallbacks;
import vip.dummy.texasholdem.indication.*;
import vip.dummy.texasholdem.message.ActionMessage;

public class PlayerAI implements IndicationCallbacks {

    private static PlayerAI playerAI;

    public static PlayerAI getInstance() {
        if (null == playerAI) {
            playerAI = new PlayerAI();
        }
        return playerAI;
    }

    public ActionMessage nextStep(String serverMessage) {
        return null;
    }

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

    }

    @Override
    public void onBet(BetIndication betIndication) {

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
