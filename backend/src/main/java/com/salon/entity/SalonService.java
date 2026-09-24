package com.salon.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Service entity representing salon services like Haircut, Manicure, etc.
 * Each service has a name, description, price, duration, and optional image.
 */
@Entity
@Table(name = "services")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalonService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "service_name", nullable = false, length = 100)
    private String serviceName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer duration; // Duration in minutes

    @Column(length = 255)
    private String image;
}
