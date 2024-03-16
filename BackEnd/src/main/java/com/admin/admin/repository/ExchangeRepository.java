package com.admin.admin.repository;

import com.admin.admin.model.Exchange;
import com.admin.admin.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExchangeRepository extends JpaRepository<Exchange, Long> {
    List<Exchange> findBySenderUser(Users senderUser);
    List<Exchange> findByReceiverUser(Users receiverUser);
}
