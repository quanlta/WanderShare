package com.admin.admin.service.impl;

import com.admin.admin.model.*;
import com.admin.admin.repository.OrderDetailRepository;
import com.admin.admin.repository.OrderItemRepository;
import com.admin.admin.repository.TimeshareRepository;
import com.admin.admin.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private final OrderDetailRepository orderDetailRepository;
    private final OrderItemRepository orderItemRepository;
    private final TimeshareRepository timeshareRepository;
    @Override
    public int getTimeshareSold() {
        LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime endOfDate = LocalDateTime.now();
        int ans = 0;
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrderdateBetween(startOfMonth,endOfDate);
        for (OrderDetail orderDetail:orderDetails
        ) {
            List<OrderItem> orderItemList = orderItemRepository.findByOrderdetailid(orderDetail.getId());
            for (OrderItem item : orderItemList
            ){
                ans += item.getQuantity();
            }
        }
        return ans;
    }

    @Override
    public float getTotalBudget() {
        LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime endOfDate = LocalDateTime.now();
        float ans = 0;
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrderdateBetween(startOfMonth,endOfDate);
        for (OrderDetail orderDetail:orderDetails
        ) {
            List<OrderItem> orderItemList = orderItemRepository.findByOrderdetailid(orderDetail.getId());
            for (OrderItem item : orderItemList
            ){
                ans += (item.getPrice() * item.getQuantity());
            }
        }
        return ans;
    }

    @Override
    public ResponseEntity<?> getChartCategory() {
        LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime endOfDate = LocalDateTime.now();
        AtomicInteger wood = new AtomicInteger();
        AtomicInteger metal = new AtomicInteger();
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrderdateBetween(startOfMonth,endOfDate);
        for (OrderDetail orderDetail:orderDetails
        ) {
            List<OrderItem> orderItemList = orderItemRepository.findByOrderdetailid(orderDetail.getId());
            for (OrderItem item : orderItemList
            ){
                Optional<Timeshare> timeshare = timeshareRepository.findById(item.getTimeshare_item_id());
                timeshare.stream().forEach(timeshare1 -> {
                    if (timeshare1.getCategory_id() == 1){
                        wood.addAndGet(item.getQuantity());
                    }else {
                        metal.addAndGet(item.getQuantity());
                    }
                });
            }
        }
        CategoryChartReponse categoryChartReponse = new CategoryChartReponse(wood,metal);
        return ResponseEntity.ok(categoryChartReponse);
    }

    @Override
    public ResponseEntity<?> getSalesWeek(int year, int month) {
        List<SaleChartWeekResponse> responses = new ArrayList<>();
        LocalDateTime firstDayOfMonth = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime lastDayOfMonth = firstDayOfMonth.with(TemporalAdjusters.lastDayOfMonth());
        LocalDateTime startOfWeek = firstDayOfMonth.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        while (startOfWeek.isBefore(lastDayOfMonth) || startOfWeek.isEqual(lastDayOfMonth)) {
            Map<String, Float> map = new HashMap<>();
            map.put("Monday", (float) 0);
            map.put("Tuesday", (float) 0);
            map.put("Wednesday", (float) 0);
            map.put("Thursday", (float) 0);
            map.put("Friday", (float) 0);
            map.put("Saturday", (float) 0);
            map.put("Sunday", (float) 0);
            LocalDateTime endOfWeek = startOfWeek.with(TemporalAdjusters.next(DayOfWeek.SUNDAY));
            SaleChartWeekResponse weekResponse = new SaleChartWeekResponse();
            weekResponse.setStartOfDay(startOfWeek);
            weekResponse.setEndOfDay(endOfWeek);
            List<SaleChartResponse> saleChartResponses = new ArrayList<>();
            List<OrderDetail> orderDetailList = orderDetailRepository.findByOrderdateBetween(startOfWeek,endOfWeek.plusDays(1));
            for (OrderDetail detail:orderDetailList
            ) {
                String dayOfWeekString =  detail.getOrderdate().getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.getDefault());
                float value = map.get(dayOfWeekString);
                value = value + detail.getOrder_total();
                map.put(dayOfWeekString,value);
            }
            for (Map.Entry<String, Float> entry : map.entrySet()) {
                SaleChartResponse chartResponse = new SaleChartResponse();
                chartResponse.setDay(entry.getKey());
                chartResponse.setSaleOfDay(entry.getValue());
                saleChartResponses.add(chartResponse);
            }
            weekResponse.setResponses(saleChartResponses);
            responses.add(weekResponse);
            startOfWeek = startOfWeek.plusWeeks(1);
        }
        return ResponseEntity.ok(responses);
    }
}
