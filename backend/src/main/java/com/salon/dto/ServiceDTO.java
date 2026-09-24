package com.salon.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * DTO for creating and updating salon services.
 */
@Data
public class ServiceDTO {

    private Long id;

    @NotBlank(message = "Service name is required")
    private String serviceName;

    private String description;

    @NotNull(message = "Price is required")
    private Double price;

    @NotNull(message = "Duration is required")
    private Integer duration;

    private String image;
}
