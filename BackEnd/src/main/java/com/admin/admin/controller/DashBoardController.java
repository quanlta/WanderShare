package com.admin.admin.controller;

import com.admin.admin.model.*;
import com.admin.admin.repository.OrderDetailRepository;
import com.admin.admin.repository.OrderItemRepository;
import com.admin.admin.repository.TimeshareRepository;
import com.admin.admin.service.impl.DashboardServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashBoardController {
    private final DashboardServiceImpl dashboardService;
    @GetMapping("/timesharesold")
    public int getTimeshareSold(){
        return dashboardService.getTimeshareSold();
    }

    @GetMapping("/budget")
    public float getTotalBudget(){
        return dashboardService.getTotalBudget();
    }

    @GetMapping("/getChartCategory")
    public ResponseEntity<?> getChartCategory(){
        return ResponseEntity.ok(dashboardService.getChartCategory());
    }

    @GetMapping("/week")
    public ResponseEntity<?> getSalesWeek(@RequestParam int year,
                                          @RequestParam int month){
        return ResponseEntity.ok(dashboardService.getSalesWeek(year,month));
    }
}
