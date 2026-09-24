package com.salon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the Online Salon Booking System.
 * This Spring Boot application provides REST APIs for managing
 * salon services, appointments, staff, and customers.
 */
@SpringBootApplication
public class SalonBookingApplication {

    public static void main(String[] args) {
        SpringApplication.run(SalonBookingApplication.class, args);
    }
}
