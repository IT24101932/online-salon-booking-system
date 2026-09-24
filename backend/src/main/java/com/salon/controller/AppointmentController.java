package com.salon.controller;

import com.salon.dto.AppointmentDTO;
import com.salon.entity.Appointment;
import com.salon.entity.SalonService;
import com.salon.entity.Staff;
import com.salon.entity.User;
import com.salon.repository.AppointmentRepository;
import com.salon.repository.ServiceRepository;
import com.salon.repository.StaffRepository;
import com.salon.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final ServiceRepository serviceRepository;
    private final StaffRepository staffRepository;
    private final UserRepository userRepository;

    public AppointmentController(AppointmentRepository appointmentRepository,
                                 ServiceRepository serviceRepository,
                                 StaffRepository staffRepository,
                                 UserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.serviceRepository = serviceRepository;
        this.staffRepository = staffRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (currentUser.getRole() == User.Role.ADMIN) {
            return appointmentRepository.findAllByOrderByCreatedAtDesc();
        }
        return appointmentRepository.findByUserIdOrderByBookingDateDesc(currentUser.getId());
    }

    @GetMapping("/admin")
    public ResponseEntity<List<Appointment>> getAdminAppointments() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (currentUser.getRole() != User.Role.ADMIN) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(appointmentRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/my")
    public List<Appointment> getMyAppointments() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appointmentRepository.findByUserIdOrderByBookingDateDesc(currentUser.getId());
    }

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@Valid @RequestBody AppointmentDTO dto) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<SalonService> serviceOptional = serviceRepository.findById(dto.getServiceId());
        if (serviceOptional.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Staff staff = null;
        if (dto.getStaffId() != null) {
            Optional<Staff> staffOptional = staffRepository.findById(dto.getStaffId());
            if (staffOptional.isPresent()) {
                staff = staffOptional.get();
            }
        }

        Appointment appointment = Appointment.builder()
                .user(currentUser)
                .service(serviceOptional.get())
                .staff(staff)
                .bookingDate(LocalDate.parse(dto.getBookingDate()))
                .bookingTime(LocalTime.parse(dto.getBookingTime()))
                .status(Appointment.AppointmentStatus.PENDING)
                .build();

        return ResponseEntity.ok(appointmentRepository.save(appointment));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Appointment> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(id);
        if (appointmentOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Appointment appointment = appointmentOptional.get();
        appointment.setStatus(Appointment.AppointmentStatus.valueOf(status.toUpperCase()));
        return ResponseEntity.ok(appointmentRepository.save(appointment));
    }
}
