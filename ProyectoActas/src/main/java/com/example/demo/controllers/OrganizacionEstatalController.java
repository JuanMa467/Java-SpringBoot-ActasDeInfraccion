package com.example.demo.controllers;

import com.example.demo.entities.OrganizacionEstatal;
import com.example.demo.services.OrganizacionEstatalServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/Organizaciones")
public class OrganizacionEstatalController extends BaseControllerImpl<OrganizacionEstatal, OrganizacionEstatalServiceImpl> {

}
