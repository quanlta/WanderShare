package com.admin.admin.repository;

import com.admin.admin.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail,String> {
    List<OrderDetail> findByOrderdateBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<OrderDetail> findByUserid(String id);

    List<OrderDetail> findOrderDetailsByOrderdate(LocalDateTime dateTime);
}
