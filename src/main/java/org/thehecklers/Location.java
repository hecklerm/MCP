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

        if ("localhost".equals(currentRequest.getLocalName())) {
            // Standard WebSocket connection
            baseEnvLinkURL = "ws://" + currentRequest.getLocalName() + ":" + currentRequest.getLocalPort();
        } else {
            // For CF; port superfluous due to default 443 for wss
            baseEnvLinkURL = "wss://" + currentRequest.getServerName();
        }

        return baseEnvLinkURL + "*" + cameraHost + ":" + cameraPort + "*" + sensorId;
    }

//    @RequestMapping("/remoteTest")
//    public String getRemoteParamsTest() {
//        String baseEnvLinkURL;
//
//        HttpServletRequest currentRequest =
//                ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
//
//        return "Remote user: " + currentRequest.getRemoteUser() +
//                "\nServlet path: " + currentRequest.getServletPath() +
//                "\nServlet ctxt: " + currentRequest.getServletContext() +
//                "\nLocal name: " + currentRequest.getLocalName() +
//                "\nLocal port: " + currentRequest.getLocalPort() +
//                "\nAuth type: " + currentRequest.getAuthType() +
//                "\nContext path: " + currentRequest.getContextPath() +
//                "\nPath info: " + currentRequest.getPathInfo() +
//                "\nPath xlatd: " + currentRequest.getPathTranslated() +
//                "\nReq URI: " + currentRequest.getRequestURI() +
//                "\nLocal addr: " + currentRequest.getLocalAddr() +
//                "\nRemote addr: " + currentRequest.getRemoteAddr() +
//                "\nRemote host: " + currentRequest.getRemoteHost() +
//                "\nRemote port: " + currentRequest.getRemotePort() +
//                "\nRemote user: " + currentRequest.getRemoteUser() +
//                "\nServer name: " + currentRequest.getServerName() +
//                "\nServer port: " + currentRequest.getServerPort() +
//                "\nServlet ctxt: " + currentRequest.getServletContext();
//    }
}
