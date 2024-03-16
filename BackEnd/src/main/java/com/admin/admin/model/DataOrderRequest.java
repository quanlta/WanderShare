package com.admin.admin.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
@AllArgsConstructor
public class DataOrderRequest {
    private Long id;
    private int value;
}
