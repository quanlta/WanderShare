package com.admin.admin.controller;

import com.admin.admin.model.*;

import com.admin.admin.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RestController
@RequestMapping("/api/v1/order")
@RequiredArgsConstructor
public class OrderController {
    @Autowired
    private final OrderService orderService;
    @PostMapping
    public ResponseEntity<?> getOrder(@RequestBody OrderRequest orderRequest){
        return ResponseEntity.ok(orderService.addOrder(orderRequest));
    }
    @GetMapping("/findByBetwenDay")
    public ResponseEntity<?> findOrderBetwenDay(@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
                                                @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate){
        return ResponseEntity.ok(orderService.getOrderByDate(startDate,endDate));
    }
    @PostMapping("/changeStatus")
    public boolean changeStatus(@RequestParam String id){
        return orderService.setStatus(id);
    }
    @GetMapping("/getOrderByUserID")
    public ResponseEntity<?> getOrderByID(@RequestParam String id){
        return orderService.getOrderByUserID(id);
    }
}
