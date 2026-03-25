package com.example.gestionconges;

import com.example.gestionconges.entities.Employee;
import com.example.gestionconges.repositories.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GestioncongesApplication {

    public static void main(String[] args) {
        SpringApplication.run(GestioncongesApplication.class, args);
    }

    @Bean
    CommandLineRunner start(EmployeeRepository employeeRepository) {
        return args -> {
            // إذا كان هذا الكود موجوداً، فسيضيف "Ben Ahmed" في كل مرة تشغل فيها السيرفر
            // يمكنك مسحه إذا كنت تريد الاعتماد فقط على ما تدخله يدوياً في PostgreSQL
        };
    }
    }
}