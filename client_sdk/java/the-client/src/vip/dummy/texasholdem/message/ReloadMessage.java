package vip.dummy.texasholdem.message;

import vip.dummy.texasholdem.message.data.ReloadCommand;

public class ReloadMessage extends Message {

    private ReloadCommand data;

    public ReloadMessage(ReloadCommand data) {
        super("__reload");
        this.data = data;
    }

    public ReloadMessage(String eventName) {
        super(eventName);
    }

    public ReloadCommand getData() {
        return data;
    }

    public void setData(ReloadCommand data) {
        this.data = data;
    }
}
