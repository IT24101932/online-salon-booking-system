package com.salon.repository;

import com.salon.entity.SalonService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository for SalonService entity operations.
 * Supports search functionality for finding services by name.
 */
@Repository
public interface ServiceRepository extends JpaRepository<SalonService, Long> {

    @Query("SELECT s FROM SalonService s WHERE LOWER(s.serviceName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<SalonService> searchByName(@Param("keyword") String keyword);
}
