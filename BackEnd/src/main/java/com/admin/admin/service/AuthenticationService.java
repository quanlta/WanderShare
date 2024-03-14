package com.admin.admin.service;

import com.admin.admin.auth.AuthenticationRequest;
import com.admin.admin.auth.AuthenticationResponse;
import com.admin.admin.auth.RegisterRequest;
import com.admin.admin.model.Role;
import com.admin.admin.model.Users;
import com.admin.admin.repository.RoleCustomRepo;
import com.admin.admin.repository.UserRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RoleCustomRepo roleCustomRepo;
    private final UserService userService;
    @Autowired
    private JavaMailSender mailSender;

    public ResponseEntity<?> register(RegisterRequest registerRequest){
        try {
            if(userRepository.existsById(registerRequest.getEmail().toString())){
                throw new IllegalArgumentException("User with "+ registerRequest.getEmail()+" is exist");
            }
            String otpEmail = RandomStringUtils.random(6,false,true);
            System.out.println(otpEmail);
            userService.saveUser(new Users(registerRequest.getPhone(),registerRequest.getUsername(),registerRequest.getEmail(),registerRequest.getPassword(),new HashSet<>(),otpEmail));
            userService.addToUser( registerRequest.getEmail(),"USER");
            Users user = userRepository.findByEmail(registerRequest.getEmail()).orElseThrow();
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);
            helper.setTo(registerRequest.getEmail());
            helper.setSubject("Validate Account BirdShop");
            helper.setText("""
                        <div>
                          <a href="http://localhost:8080/api/v1/auth/valicate-email?email=%s&otp=%s" target="_blank">click link to verify</a>
                        </div>
                        """.formatted(registerRequest.getEmail(), otpEmail), true);
            mailSender.send(message);
            return ResponseEntity.ok(user);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    public ResponseEntity<?> authenticate(AuthenticationRequest authenticationRequest){
        try {
            Users users = userRepository.findByEmail(authenticationRequest.getEmail()).orElseThrow(() -> new NoSuchElementException("User not found"));
            if(!users.is_excuted()){
                throw new NoSuchElementException("User is not valivate email");
            }
            if (users.getStatus() == 0){
                throw new NoSuchElementException("Account is block");
            }
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
            List<Role> role = null;
            if(users!=null){
                role = roleCustomRepo.getRole(users);
            }
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            Set<Role> set = new HashSet<>();
            role.stream().forEach(c -> {
                set.add(new Role(c.getName()));
                authorities.add(new SimpleGrantedAuthority(c.getName()));
            });
            users.setRoles(set);
            set.stream().forEach(i -> authorities.add(new SimpleGrantedAuthority(i.getName())));
            var jwtAccessToken = jwtService.gentateToken(users, authorities);
            var jwtRefreshToken = jwtService.gentateRefreshToken(users,authorities);
            return ResponseEntity.ok(AuthenticationResponse.builder().access_token(jwtAccessToken).refesh_token(jwtRefreshToken).email(users.getEmail()).username(users.getUsername()).build());

        }catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (BadCredentialsException e){
            return ResponseEntity.badRequest().body("Invalid Credential");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ");
        }
    }

    public String forgotpassword(String email,String phone){
        try {
            Users users = userRepository.findByEmailAndPhone(email,phone);
            if (users == null){
                throw new IllegalArgumentException("User with email "+email +" and phone "+phone+" is not exsist");
            }
            String password = RandomStringUtils.random(12,true,true);
            SimpleMailMessage message= new SimpleMailMessage();
            message.setFrom("thaibs36@gmail.com");
            message.setTo(email);
            message.setSubject("Reset Password BirdShop");
            message.setText("New password: "+password+"\n"+"Please change password after login sucess");
            mailSender.send(message);
            userService.updatePassword(users,password);
            return "Please check inbox email";
        }catch (Exception e){
            return e.getMessage();
        }

    }

    public String valicateEmail(String email,String otp){
        try{
            Users users = userRepository.findByEmailAndOtpEmail(email,otp);
            if (users == null){
                throw new IllegalArgumentException("Failed valicate");
            }
            users.setOtpEmail(null);
            users.set_excuted(true);
            userRepository.save(users);
        }catch (Exception e){
            return e.getMessage();
        }
        return "Valicate sucess";
    }
}
