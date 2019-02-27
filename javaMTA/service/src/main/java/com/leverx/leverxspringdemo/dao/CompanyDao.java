package com.leverx.leverxspringdemo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leverx.leverxspringdemo.dao.intfce.ICompanyDao;
import com.leverx.leverxspringdemo.domain.Company;

@Repository
public class CompanyDao implements ICompanyDao {

	private static final Logger logger = LoggerFactory.getLogger(CompanyDao.class);

	@Autowired
	private DataSource dataSource;

	@Override
	public Optional<Company> getById(Long id) {
		Optional<Company> entity = null;
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"SELECT TOP 1 \"compid\", \"name\" FROM \"javaDPA::Company\" WHERE \"compid\" = ?")) {
			stmnt.setLong(1, id);
			ResultSet result = stmnt.executeQuery();
			if (result.next()) {
				Company company = new Company();
				company.setId(id);
				company.setName(result.getString("name"));
				
				entity = Optional.of(company);
			} else {
				entity = Optional.empty();
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get entity by Id: " + e.getMessage());
		}
		return entity;
	}

	@Override
	public List<Company> getAll() {
		List<Company> companyList = new ArrayList<Company>();
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn
						.prepareStatement("SELECT \"compid\", \"name\" FROM \"javaDPA::Company\"")) {
			ResultSet result = stmnt.executeQuery();
			while (result.next()) {
				Company company = new Company();
				company.setId(result.getLong("compid"));
				company.setName(result.getString("name"));
				companyList.add(company);
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get list of entities: " + e.getMessage());
		}
		return companyList;
	}

	@Override
	public void save(Company entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"INSERT INTO \"javaDPA::Company\"(\"name\") VALUES (?)")) {
			stmnt.setString(2, entity.getName());
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to add entity: " + e.getMessage());
		}
	}

	@Override
	public void delete(Long id) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("DELETE FROM \"javaDPA::Company\" WHERE \"compid\" = ?")) {
			stmnt.setLong(1, id);
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to delete entity: " + e.getMessage());
		}
	}

	@Override
	public void update(Company entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"UPDATE \"javaDPA::Company\" SET  \"name\" = ? WHERE \"compid\" = ?")) {
			stmnt.setString(2, entity.getName());
			stmnt.setLong(3, entity.getId());
			stmnt.executeUpdate();
		} catch (SQLException e) {
			logger.error("Error while trying to update entity: " + e.getMessage());
		}
	}

}
