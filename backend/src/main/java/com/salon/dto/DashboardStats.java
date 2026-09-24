package com.salon.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * DTO for admin dashboard statistics.
 * Aggregates key metrics for the admin overview panel.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {

    private long totalCustomers;
    private long totalServices;
    private long totalStaff;
    private long totalAppointments;
    private long pendingAppointments;
    private long confirmedAppointments;
    private long cancelledAppointments;
    private long completedAppointments;
    private List<AppointmentDTO> recentAppointments;
}
