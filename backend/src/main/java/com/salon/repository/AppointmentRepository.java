package com.salon.repository;

import com.salon.entity.Appointment;
import com.salon.entity.Appointment.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

/**
 * Repository for Appointment entity operations.
 * Supports filtering by user, date, status, and staff.
 */
@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByUserIdOrderByBookingDateDesc(Long userId);

    List<Appointment> findByBookingDate(LocalDate bookingDate);

    List<Appointment> findByStatus(AppointmentStatus status);

    List<Appointment> findByStaffIdAndBookingDate(Long staffId, LocalDate bookingDate);

    List<Appointment> findAllByOrderByCreatedAtDesc();

    long countByStatus(AppointmentStatus status);
}
