package com.admin.admin.service;

import com.admin.admin.model.CreatePayMentMethodTransferRequest;
import jakarta.servlet.http.HttpServletRequest;

import java.io.UnsupportedEncodingException;

public interface PaymentService {

    String payWithVNPAYOnline(CreatePayMentMethodTransferRequest payModel, HttpServletRequest request) throws UnsupportedEncodingException;



}
