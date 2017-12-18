package vip.dummy.texasholdem.message.data;

public class JoinCommand {
    private String phoneNumber;
    private String password;
    private String ticket;
    private String token;

    public JoinCommand(String phoneNumber, String password, String ticket, String token) {
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.ticket = ticket;
        this.token = token;
    }

    public JoinCommand() {

    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTicket() {
        return ticket;
    }

    public void setTicket(String ticket) {
        this.ticket = ticket;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
