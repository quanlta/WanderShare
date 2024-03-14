package com.admin.admin.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExchangeRequest {

    private Users senderUser;
    private Users receiverUser;
    private Timeshare senderTimeshare;
    private Timeshare receiverTimeshare;


}