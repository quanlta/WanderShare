package com.admin.admin.service.impl;

import com.admin.admin.model.Timeshare;
import com.admin.admin.repository.TimeshareRepository;
import com.admin.admin.service.TimeshareService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TimeshareServiceImpl implements TimeshareService {
    private final TimeshareRepository timeshareRepository;
    @Override
    public boolean setIsPost(Long id) {
        try {
            Optional<Timeshare> timeshare = timeshareRepository.findById(id);
            if(!timeshare.isPresent()){
                return false;
            }
            timeshare.stream().forEach(timeshare1 -> {
                Boolean check = timeshare1.getIs_post();
                check = !check;
                timeshare1.setIs_post(check);
                timeshareRepository.save(timeshare1);
            });
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public ResponseEntity<?> updateTimeshare(Long timeshareID, Timeshare updatedTimeshare) {
        Timeshare existingTimeshare = timeshareRepository.findById(timeshareID)
                .orElseThrow(() -> new EntityNotFoundException("Timeshare not found with id: " + timeshareID));
        existingTimeshare.setName(updatedTimeshare.getName());
        existingTimeshare.setDescription(updatedTimeshare.getDescription());
        existingTimeshare.setAmount(updatedTimeshare.getAmount());
        existingTimeshare.setPrice(updatedTimeshare.getPrice());
        existingTimeshare.setTimeshare_image(updatedTimeshare.getTimeshare_image());
        existingTimeshare.setStartDate(updatedTimeshare.getStartDate());
        existingTimeshare.setEndDate(updatedTimeshare.getEndDate());
        existingTimeshare.setIs_post(updatedTimeshare.getIs_post());
        existingTimeshare.setIs_customer(updatedTimeshare.getIs_customer());
        return ResponseEntity.ok(timeshareRepository.save(existingTimeshare));
    }
}
