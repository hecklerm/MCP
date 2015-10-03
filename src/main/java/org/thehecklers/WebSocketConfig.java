package org.thehecklers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

/**
 * Created by markheckler on 9/25/15.
 */
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    @Autowired
    protected DataHandler dataHandler;
    @Autowired
    protected ControlHandler controlHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(dataHandler, "/data").setAllowedOrigins("*");
        registry.addHandler(controlHandler, "/control").setAllowedOrigins("*");
    }
}
