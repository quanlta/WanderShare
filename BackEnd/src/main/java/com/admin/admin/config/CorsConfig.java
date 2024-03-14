//package com.admin.admin.config;
//
//import jakarta.servlet.*;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.core.Ordered;
//import org.springframework.core.annotation.Order;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//
//import static org.springframework.http.HttpMethod.OPTIONS;
//
//@Component
//@Slf4j
//@Order(Ordered.HIGHEST_PRECEDENCE)
//public class CorsConfig implements Filter {
//    @Override
//    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
//        HttpServletResponse response = (HttpServletResponse) servletResponse;
//        HttpServletRequest request = (HttpServletRequest) servletRequest;
//
//        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
//        response.setHeader("Access-Control-Allow-Headers", "*");
//        response.setHeader("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, OPTIONS, DELETE");
//        response.setHeader("Access-Control-Max-Age", "3600");
//        response.setHeader("Content-Type", "application/json; charset=utf-8");
//        response.setHeader("Access-Control-Allow-Credentials", "true");
//        response.setHeader("X-FRAME-OPTIONS", "ALLOWALL");
//
//        if (!OPTIONS.equals(request.getMethod())) {
//            filterChain.doFilter(servletRequest, servletResponse);
//        }
//    }
//
//}
