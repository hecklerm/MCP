package org.thehecklers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.web.SpringBootServletInitializer;

@SpringBootApplication
public class MCPApplication extends SpringBootServletInitializer implements CommandLineRunner {

    @Autowired
    private ReadingRepository repo;

    public static void main(String[] args) {
        SpringApplication.run(MCPApplication.class, args);
    }

    @Override
    public void run(String... strings) throws Exception {
//        repo.save(new Reading(0, 1, 22.2, 28.0, 13.52, 0.071, 180, 4.44, 0.0, 10000, 32));
//        repo.save(new Reading(0, 1, 22.3, 29.1, 13.48, 0.065, 270, 4.32, 0.0, 10012, 52));
//
//        for (Reading reading: repo.findAll()) {
//            System.out.println(reading.toString());
//        }
    }
}
