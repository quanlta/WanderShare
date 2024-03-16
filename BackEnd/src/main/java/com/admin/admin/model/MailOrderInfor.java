package com.admin.admin.model;

import lombok.*;

import java.util.List;

@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MailOrderInfor {
    private List<OrderMailTimeshareRespone> timeshareList;
    private String name;
    private String phone;
    private float total;
    private String email;
}
