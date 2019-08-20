package com.telegroupltd.planning_vacation_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan
@EnableConfigurationProperties
public class PlanningVacationAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(PlanningVacationAppApplication.class, args);
    }

}
