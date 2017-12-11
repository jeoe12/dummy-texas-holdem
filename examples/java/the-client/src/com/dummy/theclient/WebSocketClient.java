package com.dummy.theclient;

import java.io.IOException;

import javax.websocket.ClientEndpoint;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;

import com.dummy.theclient.message.JoinMessage;
import com.dummy.theclient.message.data.JoinData;
import com.dummy.theclient.param.SampleConfigurator;
import com.dummy.theclient.param.SampleDecoder;
import com.dummy.theclient.param.SampleEncoder;
import com.dummy.theclient.playerai.PlayerAI;
import com.google.gson.Gson;

@ClientEndpoint(
		configurator = SampleConfigurator.class,
		decoders={SampleDecoder.class},
		encoders={SampleEncoder.class},
		subprotocols={})

public class WebSocketClient {

	private Session session;

	@OnOpen
	public void onOpen(Session session) {
		System.out.println("Client WebSocket is opening...");
		this.session = session;

		// send join message here with your name
		JoinData joinData = new JoinData("test2");
		JoinMessage joinMessage = new JoinMessage("__join", joinData);
		String joinString = new Gson().toJson(joinMessage);
		send(joinString);
	}

	@OnMessage
	public void onMessage(String message) {
		System.out.println("received message: " + message);
		// your player AI
        PlayerAI.getInstance().nextStep(message);
    }

	@OnClose
	public void onClose() {
        System.out.println("Web socket closed");
    }

    @OnError
    public void onError(Session session, Throwable t) {
        t.printStackTrace();
    }


	public void send(Object message) {
		this.session.getAsyncRemote().sendObject(message);
	}
	
	public void close() throws IOException {
		if (this.session.isOpen()) {
			this.session.close();
		}
	}
}
