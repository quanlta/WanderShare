package com.admin.admin.repository;

import com.admin.admin.model.Timeshare;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TimeshareRepository extends JpaRepository<Timeshare,Long> {
    List<Timeshare> findTop5ByNameContainingIgnoreCase(String name);
    List<Timeshare> findByOrderByPriceAsc();
    List<Timeshare> findByOrderByPriceDesc();

}
