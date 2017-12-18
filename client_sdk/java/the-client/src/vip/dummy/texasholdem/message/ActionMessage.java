package vip.dummy.texasholdem.message;

import vip.dummy.texasholdem.message.data.ActionCommand;

public class ActionMessage extends Message {

    private ActionCommand data;

    public ActionMessage(String eventName, ActionCommand data) {
        super(eventName);
        this.data = data;
    }

    public ActionCommand getData() {
        return data;
    }

    public void setData(ActionCommand data) {
        this.data = data;
    }
}
