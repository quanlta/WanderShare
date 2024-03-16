package com.admin.admin.model;

import lombok.Data;

@Data
public class CreatePayMentMethodTransferRequest {
    public String vnp_Amount ;
    public String vnp_OrderInfo ;
    public String vnp_OrderType ;
    public String vnp_TxnRef;
//    private List<DataOrderRequest> dataOrderRequests;
}
