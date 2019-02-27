package com.leverx.leverxspringdemo.controller;

import com.google.gson.JsonElement;
import com.leverx.leverxspringdemo.domain.Destination;
import com.sap.cloud.sdk.cloudplatform.CloudPlatform;
import com.sap.cloud.sdk.cloudplatform.security.RolesAllowed;
import com.sap.cloud.sdk.cloudplatform.security.AuthTokenFacade;
import com.sap.cloud.sdk.cloudplatform.security.user.ScpCfUser;
import com.sap.cloud.sdk.cloudplatform.security.user.UserAccessor;
import com.sap.cloud.sdk.s4hana.connectivity.exception.AccessDeniedException;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.apache.commons.codec.binary.Base64;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.leverx.leverxspringdemo.service.CloudService;

import java.util.Map;
import java.util.List;

@Controller
public class HomeController {

    @Autowired
    private CloudService cloudService;

    @Autowired
    private CloudPlatform platform;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String getHomes(Model model) {
        Map<String, JsonElement> names = cloudService.getSpaceName();
        JsonElement jE = names.get("space_name");
        String appName = platform.getApplicationName();
        model.addAttribute("appName", appName);
        model.addAttribute("spaceName", jE);
        List<Destination> destinations = cloudService.getDestinations();
        model.addAttribute("destinations", destinations);
        return "index";
    }

}