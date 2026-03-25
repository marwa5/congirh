package com.example.gestionconges; // أو com.example.gestionconges.config حسب مكان الملف

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // إيقاف حماية CSRF للسماح لـ React بالإرسال (POST)
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // السماح لكل الطلبات مؤقتاً
        return http.build();
    }
}