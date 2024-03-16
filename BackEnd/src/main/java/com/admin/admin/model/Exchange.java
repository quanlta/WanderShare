package com.admin.admin.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@Data
@NoArgsConstructor
@Table(name = "exchange")
public class Exchange {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_timeshare_id")
    private Timeshare senderTimeshare;

    @ManyToOne
    @JoinColumn(name = "receiver_timeshare_id")
    private Timeshare receiverTimeshare;

    @ManyToOne
    @JoinColumn(name = "sender_user_id")
    private Users senderUser;

    @ManyToOne
    @JoinColumn(name = "receiver_user_id")
    private Users receiverUser;

    private boolean isAccepted;
    @Column(name = "exchange_date")
    private LocalDateTime exchangeDate;

    @OneToMany(mappedBy = "exchange")
    private Set<ExchangeDetail> exchangeDetails = new HashSet<>();
}
