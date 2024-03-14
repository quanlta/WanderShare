package com.admin.admin.service;

import com.admin.admin.model.Exchange;
import com.admin.admin.model.Timeshare;
import com.admin.admin.model.Users;

import java.util.List;

public interface ExchangeService {
    Exchange createExchange(Users senderUser, Users receiverUser, Timeshare senderTimeshare, Timeshare receiverTimeshare);

    List<Exchange> getSentExchanges(Users senderUser);

    List<Exchange> getReceivedExchanges(Users receiverUser);

    boolean acceptExchange(Long exchangeId);
}
