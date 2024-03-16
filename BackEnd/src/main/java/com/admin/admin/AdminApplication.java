package com.admin.admin;

import com.admin.admin.model.Role;
import com.admin.admin.model.Users;
import com.admin.admin.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.HashSet;

@SpringBootApplication
@EnableWebSecurity
@EnableJpaRepositories
public class AdminApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdminApplication.class, args);
	}
	@Bean
	BCryptPasswordEncoder bCryptPasswordEncoder(){

		return new BCryptPasswordEncoder();
	}
	@Bean
	public WebMvcConfigurer configure() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry reg) {
				reg.addMapping("/**").allowedOrigins("*");
			}
		};
	}
//	@Bean
//	CommandLineRunner run(UserService user
//	Service){
//		return args -> {
//			userService.saveRole(new Role(null, "ROLE_USER"));
//			userService.saveRole(new Role(null, "ROLE_ADMIN"));
//			userService.saveUser(new Users("9989898989", "admin", "adminhehe@gmail.com","Thaitdv1415",new HashSet<>()));
//			userService.saveUser(new Users("2354514141", "admin123", "admin123@gmail.com","password",new HashSet<>()));
//			userService.addToUser("adminhehe@gmail.com","ROLE_ADMIN");
//			userService.addToUser("admin123@gmail.com","ROLE_USER");
//		};
//	}
}
