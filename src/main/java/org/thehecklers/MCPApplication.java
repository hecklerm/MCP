package org.thehecklers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MCPApplication {
    public static void main(String[] args) {
        SpringApplication.run(MCPApplication.class, args);
    }
}
