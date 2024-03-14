package com.admin.admin.model;

import lombok.*;

@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private OrderDetail orderDetail;
    private float total;
}
