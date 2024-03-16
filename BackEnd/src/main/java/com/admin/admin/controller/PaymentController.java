package com.admin.admin.controller;

import com.admin.admin.model.CreatePayMentMethodTransferRequest;
import com.admin.admin.model.Users;
import com.admin.admin.repository.UserRepository;
import com.admin.admin.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    PaymentService paymentService;
    @Autowired
    UserRepository userRepository;

    @PostMapping("/payment-vnpay")
    public String pay(@RequestBody CreatePayMentMethodTransferRequest payModel, HttpServletRequest request){
        try {
            return paymentService.payWithVNPAYOnline(payModel, request) ;
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
    @GetMapping("/payment-callback")
    public ResponseEntity<Boolean> paymentCallback(@RequestParam Map<String, String> queryParams, HttpServletResponse response) throws IOException {
        String vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
        String vnp_Amount = queryParams.get("vnp_Amount");
        String id = queryParams.get("vnp_OrderInfo");

        if ("00".equals(vnp_ResponseCode)) {
            Optional<Users> usersOptional = userRepository.findByEmail(id);
            if (usersOptional.isPresent()) {
                Users users = usersOptional.get();
                long amount = Long.parseLong(vnp_Amount);
                long balanceToAdd = amount / 10000000;
                if (amount == 10000000) {
                    users.setBalance(users.getBalance() + balanceToAdd);
                } else if (amount == 50000000) {
                    users.setBalance(users.getBalance() + 1 + balanceToAdd);
                } else if (amount == 100000000) {
                    users.setBalance(users.getBalance() + 2 + balanceToAdd);
                }
                userRepository.save(users);
                response.sendRedirect("http://localhost:5173/payment/success");
                return ResponseEntity.ok(true);
            }
        } else {
            response.sendRedirect("http://localhost:5173/payment/fail");
        }
        return ResponseEntity.ok(false);
    }
}
