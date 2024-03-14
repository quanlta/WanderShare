package com.admin.admin.service.impl;

import com.admin.admin.model.Role;
import com.admin.admin.model.Users;
import com.admin.admin.repository.RoleRepository;
import com.admin.admin.repository.UserRepository;
import com.admin.admin.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {
   @Autowired
   private UserRepository userRepository;
   @Autowired
   private RoleRepository roleRepository;

   private final PasswordEncoder passwordEncoder;

    @Override
    public Users saveUser(Users user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(new HashSet<>());
        return userRepository.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public void addToUser(String username, String rolename) {
        if(!userRepository.findByEmail(username).isPresent()){
            throw new IllegalArgumentException("User with email "+ username + " doesn't exists");
        }
        Role role = roleRepository.findByName(rolename);
        if(role == null){
            throw new IllegalArgumentException("Role with name "+ rolename + " doesn't exists");
        }
        Users user = userRepository.findByEmail(username).get();
        user.getRoles().add(role);
    }

    @Override
    public void updatePassword(Users users,String password) {
        users.setPassword(passwordEncoder.encode(password));
        userRepository.save(users);
    }


}
