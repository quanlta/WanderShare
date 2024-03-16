package com.admin.admin.controller;


import com.admin.admin.model.Timeshare;
import com.admin.admin.model.Users;
import com.admin.admin.repository.TimeshareCusRepo;
import com.admin.admin.repository.TimeshareRepository;
import com.admin.admin.repository.UserCusRepo;
import com.admin.admin.repository.UserRepository;
import com.admin.admin.service.TimeshareService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/timeshare")
@RequiredArgsConstructor
public class TimeshareController {
    private final TimeshareRepository timeshareRepository;
    private final TimeshareCusRepo timeshareCusRepo;
    private final TimeshareService timeshareService;
    private final UserRepository userRepository;
    private final UserCusRepo userCusRepo;
    @Value("${secret.key")
    private String secretkey;
    @GetMapping
    public ResponseEntity<?> getAllTimeshare(){
        List<Timeshare> timeshares = timeshareRepository.findAll();
        return ResponseEntity.ok(timeshares);
    }
    @GetMapping("/count")
    public ResponseEntity<?> countTimeshare(){

        return ResponseEntity.ok(timeshareRepository.count());
    }
    @PostMapping("/delete")
    public ResponseEntity<?> deleteTimeshare(@RequestParam Long id){
        try {
            timeshareRepository.deleteById(id);
            return ResponseEntity.ok("200");
        }catch (Exception e){
            return ResponseEntity.ok(e.getMessage());

        }

    }
    @PostMapping("/add")
    public ResponseEntity<?> addTimeshare(@RequestParam String token, @RequestParam double balance, @RequestBody Timeshare timeshare) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretkey.getBytes())
                    .parseClaimsJws(token)
                    .getBody();
            String id = claims.getSubject();
            Optional<Users> usersOptional = userRepository.findByEmail(id);
            if (usersOptional.isPresent()) {
                Users users = usersOptional.get();
                if (balance < 1) {
                    return ResponseEntity.badRequest().body("Balance must be greater than or equal to 1");
                }
                timeshare.setIs_post(true);
                timeshare.setIs_customer(false);
                timeshareRepository.save(timeshare);
                users.setBalance(users.getBalance() - 1);
                return ResponseEntity.ok("Add sucess");
            }
        } catch (Exception e) {
            return ResponseEntity.ok(e.getMessage());
        }
        return null;
    }
    @GetMapping("/seacrhByName")
    public ResponseEntity<?> getTimeshareByName(@RequestParam String q){
        List<Timeshare> timeshares = timeshareRepository.findTop5ByNameContainingIgnoreCase(q);
        return ResponseEntity.ok(timeshares);
    }
    @GetMapping("/getAllOrderByPriceAsc")
    public ResponseEntity<?> getAllOrderByPrice(){
        List<Timeshare> timeshares = timeshareRepository.findByOrderByPriceAsc();
        return ResponseEntity.ok(timeshares);
    }
    @GetMapping("/getAllOrderByPriceDesc")
    public ResponseEntity<?> getAllOrderByPriceDesc(){
        List<Timeshare> timeshares = timeshareRepository.findByOrderByPriceDesc();
        return ResponseEntity.ok(timeshares);
    }
    @GetMapping("/getAllOrderByNameAsc")
    public ResponseEntity<?> getAllOrderByNameAsc(){
        List<Timeshare> timeshares = timeshareCusRepo.findByOrderByNameAsc();
        return ResponseEntity.ok(timeshares);
    }
    @GetMapping("/getAllOrderByNameDesc")
    public ResponseEntity<?> getAllOrderByNameDesc(){
        List<Timeshare> timeshares = timeshareCusRepo.findByOrderByNameDesc();
        return ResponseEntity.ok(timeshares);
    }
    @PostMapping("/changeCheck")
    public boolean changePost(Long id){
        return timeshareService.setIsPost(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateTimeshare(@RequestParam Long id,
                                           @RequestBody Timeshare timeshare){
        return ResponseEntity.ok(timeshareService.updateTimeshare(id,timeshare));
    }
}
