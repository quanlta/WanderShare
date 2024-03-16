package com.admin.admin.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@Setter
@Getter
@Data
@NoArgsConstructor
@Table(name = "users")
public class Users implements UserDetails {
    @Id
    private String user_id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private boolean is_excuted;
    private String otpEmail;
    private int status;
    private double balance;
    @ManyToMany
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    public Users(String phone, String username, String email, String password, Set<Role> roles){
        this.user_id = email;
        this.phone = phone;
        this.username = username;
        this.email = email;
        this.password = password;
        this.is_excuted = false;
        this.roles = roles;
        this.status = 1;
        this.balance = 0;
    }
    public Users(String phone, String username, String email, String password, Set<Role> roles,String otp){
        this.user_id = email;
        this.phone = phone;
        this.username = username;
        this.email = email;
        this.password = password;
        this.is_excuted = false;
        this.roles = roles;
        this.otpEmail = otp;
        this.status = 1;
        this.balance = 0;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        roles.stream().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getName())));
        return List.of(new SimpleGrantedAuthority(authorities.toString()));
    }
    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
    @Override
    public String getUsername(){
        return username;
    }
    @Override
    public String getPassword(){
        return password;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
