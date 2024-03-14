package com.admin.admin.model;


import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Data
@NoArgsConstructor
public class UsersRequest {
    private String user_id;
    private String username;
    private String email;
    private String phone;
    private boolean is_excuted;
    private int status;
    private double balance;
}
