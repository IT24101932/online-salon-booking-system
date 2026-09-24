package com.salon.controller;

import com.salon.dto.StaffDTO;
import com.salon.entity.Staff;
import com.salon.repository.StaffRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    private final StaffRepository staffRepository;

    public StaffController(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    @GetMapping
    public List<Staff> getAllStaff() {
        return staffRepository.findByAvailabilityTrue();
    }

    @PostMapping
    public ResponseEntity<Staff> createStaff(@Valid @RequestBody StaffDTO dto) {
        Staff staff = Staff.builder()
                .fullName(dto.getFullName())
                .specialization(dto.getSpecialization())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .availability(dto.getAvailability() != null ? dto.getAvailability() : true)
                .build();
        return ResponseEntity.ok(staffRepository.save(staff));
    }
}
