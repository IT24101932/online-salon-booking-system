package com.salon.repository;

import com.salon.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository for Staff entity operations.
 * Supports filtering by availability status.
 */
@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {

    List<Staff> findByAvailabilityTrue();
}
