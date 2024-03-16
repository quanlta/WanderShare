package com.admin.admin.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class SaleChartResponse {
    private String day;
    private float saleOfDay;
}
