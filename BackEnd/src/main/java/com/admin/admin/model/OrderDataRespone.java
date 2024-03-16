package com.admin.admin.model;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Setter
@Getter
public class OrderDataRespone {
    private OrderDetail orderDetail;
    private List<OrderItem> orderItemList;
}
