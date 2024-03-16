package com.admin.admin.model;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class SaleChartWeekResponse {
    private LocalDateTime startOfDay;
    private LocalDateTime endOfDay;
    private List<SaleChartResponse> responses;
}
