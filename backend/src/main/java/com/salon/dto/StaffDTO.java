package com.salon.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * DTO for creating and updating staff members.
 */
@Data
public class StaffDTO {

    private Long id;

    @NotBlank(message = "Full name is required")
    private String fullName;

    private String specialization;
    private String phone;
    private String email;
    private Boolean availability = true;
}
