package com.admin.admin.service;

import com.admin.admin.model.Timeshare;
import org.springframework.http.ResponseEntity;

public interface TimeshareService {
    boolean setIsCheck(Long id);

    ResponseEntity<?> updateTimeshare(Long timeshareID, Timeshare timeshare);
}
