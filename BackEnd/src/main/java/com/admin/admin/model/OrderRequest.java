package com.admin.admin.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    private String user_id;
    private String email;
    private String phone;
    private String payment_method;
    private List<DataOrderRequest> dataOrderRequests;
}
