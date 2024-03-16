package com.admin.admin.service;

import com.admin.admin.model.Role;
import com.admin.admin.model.Users;

public interface UserService {
    Users saveUser(Users user);
    Role saveRole(Role role);

    void addToUser(String username, String rolename);

    void updatePassword(Users users, String password);


}
