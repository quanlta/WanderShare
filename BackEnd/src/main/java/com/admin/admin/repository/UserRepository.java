package com.admin.admin.repository;

import com.admin.admin.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users,String> {
        Optional<Users> findByEmail(String email);
        Users findByEmailAndPhone (String email,String phone);
        Users findByEmailAndOtpEmail(String email,String otp);
}
