package com.admin.admin.controller;

import com.admin.admin.model.Exchange;
import com.admin.admin.model.ExchangeRequest;
import com.admin.admin.model.Timeshare;
import com.admin.admin.model.Users;
import com.admin.admin.service.ExchangeService;
import com.admin.admin.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/exchanges")
public class ExchangeController {

    @Autowired
    private final ExchangeService exchangeService;

    @Autowired
    private final MailService mailService;

    public ExchangeController(ExchangeService exchangeService, MailService mailService) {
        this.exchangeService = exchangeService;
        this.mailService = mailService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createExchange(@RequestBody ExchangeRequest exchangeRequest) {
        Users senderUser = exchangeRequest.getSenderUser();
        Users receiverUser = exchangeRequest.getReceiverUser();
        Timeshare senderTimeshare = exchangeRequest.getSenderTimeshare();
        Timeshare receiverTimeshare = exchangeRequest.getReceiverTimeshare();

        Exchange createdExchange = exchangeService.createExchange(senderUser, receiverUser, senderTimeshare, receiverTimeshare);
        mailService.sendExchangeNotification(exchangeRequest.getSenderUser(), createdExchange.getId().toString());
        mailService.sendExchangeNotification(exchangeRequest.getReceiverUser(), createdExchange.getId().toString());

        return ResponseEntity.ok("Exchange created with ID: " + createdExchange.getId());
    }

    @GetMapping("/sent")
    public ResponseEntity<List<Exchange>> getSentExchanges(@RequestParam String senderUserId) {
        Users senderUser = new Users();
        senderUser.setUser_id(senderUserId);

        List<Exchange> sentExchanges = exchangeService.getSentExchanges(senderUser);
        return ResponseEntity.ok(sentExchanges);
    }

    @GetMapping("/received")
    public ResponseEntity<List<Exchange>> getReceivedExchanges(@RequestParam String receiverUserId) {
        Users receiverUser = new Users();
        receiverUser.setUser_id(receiverUserId);

        List<Exchange> receivedExchanges = exchangeService.getReceivedExchanges(receiverUser);
        return ResponseEntity.ok(receivedExchanges);
    }

    @PostMapping("/accept/{exchangeId}")
    public ResponseEntity<String> acceptExchange(@PathVariable Long exchangeId) {
        boolean accepted = exchangeService.acceptExchange(exchangeId);

        if (accepted) {
            return ResponseEntity.ok("Exchange accepted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Exchange not found or unable to accept.");
        }
    }
}

