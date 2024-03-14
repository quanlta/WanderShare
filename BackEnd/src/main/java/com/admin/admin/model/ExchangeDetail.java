package com.admin.admin.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Data
@NoArgsConstructor
@Table(name = "exchange_detail")
public class ExchangeDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @ManyToOne
    @JoinColumn(name = "exchange_id")
    private Exchange exchange;
    private LocalDateTime exchangedate;
    public ExchangeDetail(String id, LocalDateTime exchange_date,float v) {
        this.id = id;
        this.exchangedate = exchange_date;
    }
}
