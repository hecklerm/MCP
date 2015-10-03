package org.thehecklers;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by markheckler on 9/30/15.
 */
@RestController
@ConfigurationProperties(prefix="remote")
public class Location {
    private String cameraHost;
    private String cameraPort;
    private String sensorId;

    public String getCameraHost() {
        return cameraHost;
    }

    public void setCameraHost(String cameraHost) {
        this.cameraHost = cameraHost;
    }

    public String getPort() {
        return cameraPort;
    }

    public void setCameraPort(String cameraPort) {
        this.cameraPort = cameraPort;
    }

    public String getSensorId() {
        return sensorId;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }

    @RequestMapping("/remote")
    public String getRemoteParams() {
        String baseEnvLinkURL;

        HttpServletRequest currentRequest =
                ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        // lazy about determining protocol but can be done too
        baseEnvLinkURL = "ws://" + currentRequest.getLocalName() + ":" + currentRequest.getLocalPort();

        return baseEnvLinkURL + "*" + cameraHost + ":" + cameraPort
                + "*" + sensorId;
    }
}
