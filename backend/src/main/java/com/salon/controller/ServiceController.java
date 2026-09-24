package com.salon.controller;

import com.salon.dto.ServiceDTO;
import com.salon.entity.SalonService;
import com.salon.repository.ServiceRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceRepository serviceRepository;

    public ServiceController(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @GetMapping
    public List<SalonService> getAllServices(@RequestParam(required = false) String keyword) {
        if (keyword != null && !keyword.isBlank()) {
            return serviceRepository.searchByName(keyword);
        }
        return serviceRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalonService> getServiceById(@PathVariable Long id) {
        Optional<SalonService> service = serviceRepository.findById(id);
        return service.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SalonService> createService(@Valid @RequestBody ServiceDTO dto) {
        SalonService service = SalonService.builder()
                .serviceName(dto.getServiceName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .duration(dto.getDuration())
                .image(dto.getImage())
                .build();
        return ResponseEntity.ok(serviceRepository.save(service));
    }
}
