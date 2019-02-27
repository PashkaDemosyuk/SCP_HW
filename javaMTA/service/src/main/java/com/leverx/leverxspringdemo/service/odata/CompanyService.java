import com.leverx.leverxspringdemo.domain.Company;
import com.sap.cloud.sdk.odatav2.connectivity.ODataException;
import com.sap.cloud.sdk.odatav2.connectivity.ODataQueryBuilder;
import com.sap.cloud.sdk.odatav2.connectivity.ODataQueryResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CompanyService {
    public List<Company> getCompaniesOdata(String destinationName) throws ODataException {
        ODataQueryResult result = ODataQueryBuilder.withEntity("/","Companies").
                select("compid","name").build().execute(destinationName);
        List<Map<String,Object>> listMap =  result.asListOfMaps();
        return  getCompanyList(listMap);
    }


    public List<Company>  getCompanyList (List<Map<String,Object>> listMap) {
        List <Company> companiesList = new ArrayList<>();
        listMap.forEach(item->{
            Company Company = new Company();
            Company.setId(Integer.parseInt(item.get("compid").toString()));
            Company.setName(item.get("name").toString());
            companiesList.add(Company);
        });
        return companiesList;
    }
}