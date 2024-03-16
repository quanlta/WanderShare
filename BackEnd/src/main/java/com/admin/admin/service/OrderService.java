package com.admin.admin.service;

import com.admin.admin.model.OrderRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


public interface OrderService {
    ResponseEntity<?> addOrder(OrderRequest orderRequest);
    ResponseEntity<?> getOrderByDate(LocalDateTime startDate, LocalDateTime endDate);
    boolean setStatus(String id);
    ResponseEntity<?> getOrderByUserID(String id);
}
