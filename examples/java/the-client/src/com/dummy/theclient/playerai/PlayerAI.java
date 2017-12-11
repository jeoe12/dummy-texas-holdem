package com.dummy.theclient.playerai;

import com.dummy.theclient.message.ActionMessage;

public class PlayerAI {

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
}
