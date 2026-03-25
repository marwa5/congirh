package com.example.gestionconges.controllers;

import com.example.gestionconges.entities.Employee;
import com.example.gestionconges.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000") // تم تحديد المنفذ 3000 لزيادة الأمان مع React
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    // جلب كل الموظفين من قاعدة البيانات
    // الرابط: http://localhost:8080/api/employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // إضافة موظف جديد من واجهة React
    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }
}