package com.leverx.leverxspringdemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.leverxspringdemo.domain.Company;
import com.leverx.leverxspringdemo.service.CompanyService;

@RestController
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping(value = "/company")
    public List<Company> getAllCompany() {
        return companyService.getCompanyAll();
    }

    @GetMapping(value = "/company/{id}")
    public Company getCompany(@PathVariable Long id) {
        return companyService.getCompany(id);
    }

    @PostMapping(value = "/company")
    public void createCompany(@RequestBody Company company) {
        companyService.createCompany(company);
    }

    @DeleteMapping(value = "/company/{id}")
    public void deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
    }

    @PutMapping(value = "/company")
    public void updateCompany(@RequestBody Company company) {
        companyService.updateCompany(company);
    }

}
