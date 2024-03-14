package com.admin.admin.controller;

import com.admin.admin.auth.AuthenticationRequest;
import com.admin.admin.auth.ForgotPasswordRequest;
import com.admin.admin.auth.RegisterRequest;
import com.admin.admin.service.AuthenticationService;
import com.nimbusds.oauth2.sdk.GeneralException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.text.ParseException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest)throws GeneralException, ParseException {
        return ResponseEntity.ok(authenticationService.authenticate(authenticationRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<?> login(@RequestBody RegisterRequest registerRequest)throws GeneralException, ParseException {
        return ResponseEntity.ok(authenticationService.register(registerRequest));
    }
    @PostMapping("/forgot-password")
    public String forgotpassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest)throws GeneralException, ParseException {
        return authenticationService.forgotpassword(forgotPasswordRequest.getEmail(), forgotPasswordRequest.getPhone());
    }
    @GetMapping("/valicate-email")
    public RedirectView  valicatEmail(@RequestParam String email,
                               @RequestParam String otp){
        String status = authenticationService.valicateEmail(email,otp);
        if(status.endsWith("Valicate sucess")){
            return new RedirectView("http://localhost:3000/login");
        }
        return new RedirectView("http://localhost:3000/register");
    }
}
