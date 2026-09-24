package com.salon.config;

import com.salon.entity.SalonService;
import com.salon.entity.Staff;
import com.salon.repository.ServiceRepository;
import com.salon.repository.StaffRepository;
import com.salon.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.salon.entity.User;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedData(ServiceRepository serviceRepository,
                               StaffRepository staffRepository,
                               UserRepository userRepository,
                               PasswordEncoder passwordEncoder) {
        return args -> {
            if (serviceRepository.count() == 0) {
                serviceRepository.save(SalonService.builder()
                        .serviceName("Haircut")
                        .description("Professional haircut and styling")
                        .price(25.0)
                        .duration(45)
                        .image("https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f")
                        .build());

                serviceRepository.save(SalonService.builder()
                        .serviceName("Manicure")
                        .description("Elegant nail care and polish")
                        .price(20.0)
                        .duration(30)
                        .image("https://images.unsplash.com/photo-1512496015851-a90fb38ba796")
                        .build());
            }

            if (staffRepository.count() == 0) {
                staffRepository.save(Staff.builder()
                        .fullName("Nimali Perera")
                        .specialization("Hair Styling")
                        .phone("0771234567")
                        .email("nimali@example.com")
                        .availability(true)
                        .build());

                staffRepository.save(Staff.builder()
                        .fullName("Sajini Fernando")
                        .specialization("Nails")
                        .phone("0777654321")
                        .email("sajini@example.com")
                        .availability(true)
                        .build());
            }

            if (userRepository.findByEmail("admin@example.com").isEmpty()) {
                userRepository.save(User.builder()
                        .fullName("Admin User")
                        .email("admin@example.com")
                        .password(passwordEncoder.encode("admin123"))
                        .phone("0710000000")
                        .role(User.Role.ADMIN)
                        .build());
            }
        };
    }
}
