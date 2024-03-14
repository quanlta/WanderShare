package com.admin.admin.service;


import com.admin.admin.model.MailOrderInfor;
import com.admin.admin.model.Users;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import java.util.ArrayList;
import java.util.List;

@Service
public class MailService {
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private TemplateEngine templateEngine;
    public void sendemail(MailOrderInfor mailOrderInfor) throws MessagingException {
        List<Users> users = new ArrayList<>();
        Context context = new Context();
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        context.setVariable("username",mailOrderInfor.getName());
        context.setVariable("users",mailOrderInfor.getTimeshareList());
        context.setVariable("totalAmount",mailOrderInfor.getTotal());
        context.setVariable("phone",mailOrderInfor.getPhone());
        String emailContent = templateEngine.process("form", context);
        helper.setTo(mailOrderInfor.getEmail());
        helper.setSubject("Information Checkout Order");
        helper.setText(emailContent, true);
        mailSender.send(message);
    }
    public void sendExchangeNotification(Users user, String exchangeId) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Exchange Notification");
        message.setText("Dear " + user.getUsername() + ",\n\n" +
                "An exchange with ID " + exchangeId + " has been created.\n" +
                "Thank you for using our service!\n\n" +
                "Best regards,\nWanderShare");

        mailSender.send(message);
    }
}
