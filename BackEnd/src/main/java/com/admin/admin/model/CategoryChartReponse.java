package com.admin.admin.model;

import lombok.*;

import java.util.concurrent.atomic.AtomicInteger;

@Getter
@Setter
@Data
@NoArgsConstructor
public class CategoryChartReponse {
    private AtomicInteger wood;
    private AtomicInteger metal;

    public CategoryChartReponse(AtomicInteger wood, AtomicInteger metal) {
        this.wood = wood;
        this.metal = metal;
    }
}
