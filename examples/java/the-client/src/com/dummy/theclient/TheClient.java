package com.dummy.theclient;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import javax.websocket.ContainerProvider;
import javax.websocket.DeploymentException;
import javax.websocket.WebSocketContainer;

/**
 * Created by the-engine team
 * 2017-09-12
 *
 * Texas Hold'em AI client Java example
 */
public class TheClient {

    public static void main(String[] args) throws DeploymentException, IOException, URISyntaxException, InterruptedException {
        WebSocketContainer container = ContainerProvider.getWebSocketContainer();
        WebSocketClient client = new WebSocketClient();
        container.connectToServer(client,
                new URI("ws://localhost:8080"));

        while(true) {
            try {

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}