package com.admin.admin.service.impl;

import com.admin.admin.model.*;
import com.admin.admin.repository.ExchangeDetailRepository;
import com.admin.admin.repository.ExchangeRepository;
import com.admin.admin.service.ExchangeService;
import com.admin.admin.service.MailService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ExchangeServiceImpl implements ExchangeService {

    @Autowired
    private final ExchangeRepository exchangeRepository;

    @Autowired
    private final ExchangeDetailRepository exchangeDetailRepository;

    @Autowired
    private final MailService mailService;
    @Override
    public Exchange createExchange(Users senderUser, Users receiverUser, Timeshare senderTimeshare, Timeshare receiverTimeshare) {
        MailOrderInfor orderInfor = new MailOrderInfor();
        String idExchange = RandomStringUtils.randomNumeric(6); // Sửa lại để có 6 chữ số
        Exchange exchange = new Exchange();
        exchange.setId(Long.valueOf(idExchange));
        exchange.setSenderUser(senderUser);
        exchange.setReceiverUser(receiverUser);
        exchange.setSenderTimeshare(senderTimeshare);
        exchange.setReceiverTimeshare(receiverTimeshare);
        exchange.setAccepted(false);
        exchange.setExchangeDate(LocalDateTime.now());

        // Save the exchange entity
        Exchange savedExchange = exchangeRepository.save(exchange);

        // Create exchange details with a random 6-digit id
        ExchangeDetail exchangeDetail = new ExchangeDetail();
        exchangeDetail.setExchange(savedExchange);

        // Save the exchange detail
        exchangeDetailRepository.save(exchangeDetail);
        mailService.sendExchangeNotification(senderUser, savedExchange.getId().toString());
        mailService.sendExchangeNotification(receiverUser, savedExchange.getId().toString());
        return savedExchange;
    }

    @Override
    public List<Exchange> getSentExchanges(Users senderUser) {
        return exchangeRepository.findBySenderUser(senderUser);
    }

    @Override
    public List<Exchange> getReceivedExchanges(Users receiverUser) {
        return exchangeRepository.findByReceiverUser(receiverUser);
    }

    @Override
    public boolean acceptExchange(Long exchangeId) {
        Optional<Exchange> optionalExchange = exchangeRepository.findById(exchangeId);
        if (optionalExchange.isPresent()) {
            Exchange exchange = optionalExchange.get();
            exchange.setAccepted(true);
            exchangeRepository.save(exchange);
            return true;
        }
        return false;
    }
}
