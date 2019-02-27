package com.leverx.leverxspringdemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.leverxspringdemo.dao.CompanyDao;
import com.leverx.leverxspringdemo.domain.Company;

@Service
public class CompanyService {
	
	@Autowired
	private CompanyDao companyDao;
	
	public List<Company> getCompanyAll() {
		return companyDao.getAll();
	}
	
	public Company getCompany(Long id) {
		Optional<Company> companyOptional = this.companyDao.getById(id);
		Company company = null;
		if (companyOptional.isPresent()) {
			company = companyOptional.get();
		}
		return company;
	}
	
	public void createCompany(Company company) {
		this.companyDao.save(company);
	}
	
	public void updateCompany(Company company) {
		this.companyDao.update(company);
	}
	
	public void deleteCompany(Long id) {
		this.companyDao.delete(id);
	}
	
}
