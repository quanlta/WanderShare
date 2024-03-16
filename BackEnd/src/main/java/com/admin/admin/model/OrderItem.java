package com.admin.admin.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@Data
@NoArgsConstructor
@Table(name = "order_item")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderdetailid;
    private Long timeshare_item_id;
    private int quantity;
    private float price;

    public OrderItem(String order_detail_id, Long timeshare_item_id, int quantity, float price) {
        this.orderdetailid = order_detail_id;
        this.timeshare_item_id = timeshare_item_id;
        this.quantity = quantity;
        this.price = price;
    }
}
