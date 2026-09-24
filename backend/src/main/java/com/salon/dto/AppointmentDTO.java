package com.salon.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * DTO for creating and managing appointments.
 * The user ID is derived from the JWT token, not sent by the client.
 */
@Data
public class AppointmentDTO {

    private Long id;

    @NotNull(message = "Service ID is required")
    private Long serviceId;

    private Long staffId; // Optional - customer can choose preferred staff

    @NotNull(message = "Booking date is required")
    private String bookingDate; // Format: YYYY-MM-DD

    @NotNull(message = "Booking time is required")
    private String bookingTime; // Format: HH:mm

    private String status;

    // Response fields (populated when returning data)
    private String serviceName;
    private Double servicePrice;
    private String staffName;
    private String userName;
    private String userEmail;
    private String createdAt;
}
