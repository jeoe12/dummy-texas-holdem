package vip.dummy.texasholdem.message;

import vip.dummy.texasholdem.message.data.JoinCommand;

public class JoinMessage extends Message {

    private JoinCommand data;

    public JoinMessage(JoinCommand joinCommand) {
        super("__join");
        this.data = joinCommand;
    }

    public JoinCommand getData() {
        return data;
    }

    public void setData(JoinCommand data) {
        this.data = data;
    }
}
